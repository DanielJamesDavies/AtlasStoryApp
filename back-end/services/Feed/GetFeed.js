const jwt_decode = require("jwt-decode");

const FollowRelationship = require("../../models/FollowRelationship");
const User = require("../../models/User");
const Story = require("../../models/Story");

const getFeedItemContent = require("./GetFeedItemContent");
const getFeedItemAuthor = require("./GetFeedItemAuthor");

module.exports = async (req, res) => {
	let user_id = false;
	try {
		user_id = jwt_decode(req?.cookies?.AtlasStoryAppToken)?.user_id;
	} catch (error) {}
	if (user_id === false) return res.status(200).send({ errors: [{ message: "Authentication Error" }] });

	const followRelationships = await FollowRelationship.find({ followerId: user_id });

	const allFollowing = (
		await Promise.all(
			followRelationships.map(async (followRelationship) => {
				if (!followRelationship?.followingId || !followRelationship?.followingType) return false;
				let data = {};
				switch (followRelationship.followingType) {
					case "user":
						data = await User.findOne({ _id: followRelationship?.followingId });
					case "story":
						data = await Story.findOne({ _id: followRelationship?.followingId });
					default:
						break;
				}
				return { followingType: followRelationship.followingType, data };
			})
		)
	).filter((e) => e !== false);

	let feedItemsSeperated = [];

	allFollowing.map((followingContent) => {
		switch (followingContent?.followingType) {
			case "user":
				if (!followingContent?.data?.data?.changeLog) return false;
				followingContent?.data?.data?.changeLog.map((change) => {
					feedItemsSeperated.push({ _id: followingContent?.data?._id, change });
					return true;
				});
				break;
			case "story":
				if (!followingContent?.data?.data?.changeLog) return false;
				followingContent?.data?.data?.changeLog.map((change) => {
					feedItemsSeperated.push({ _id: followingContent?.data?._id, change });
					return true;
				});
				break;
		}
		return true;
	});

	let feedItems = [];

	await Promise.all(
		feedItemsSeperated.map(async (feedItem) => {
			if (feedItems.length > 32) return false;
			if (
				req?.query?.latest_date &&
				(feedItem.change.date_changed === new Date(req?.query?.latest_date) ||
					feedItem.change.date_changed - new Date(req?.query?.latest_date) > 0)
			)
				return false;

			if (
				feedItems.length === 0 ||
				JSON.stringify(feedItems[0].content._id) !== JSON.stringify(feedItem.change.content_id) ||
				(JSON.stringify(feedItems[0].content._id) === JSON.stringify(feedItem.change.content_id) &&
					Math.abs(feedItems[0].first_change_date_changed - feedItem.change.date_changed) > 1000 * 60 * 60 * 3)
			) {
				const content = await getFeedItemContent(feedItem.change.content_id, feedItem.change.content_type);
				const author = await getFeedItemAuthor(feedItem?.change?.author_id);
				feedItems.splice(0, 0, {
					_id: feedItem._id,
					content,
					author,
					first_change_date_changed: feedItem.change.date_changed,
					changes: [feedItem.change],
				});
			} else if (feedItems.length !== 0 && JSON.stringify(feedItems[0].content._id) === JSON.stringify(feedItem.change.content_id)) {
				feedItems[0].changes.push(feedItem.change);
			}
		})
	);

	feedItems.sort((a, b) => b.first_change_date_changed - a.first_change_date_changed);

	return res.status(200).send({ message: "Success", data: { feedItems } });
};
