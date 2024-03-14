// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { APIContext } from "../../../../context/APIContext";

// Services

// Styles

// Assets

export const FollowingStoriesLogic = () => {
	const { APIRequest, userFollowingStories, setUserFollowingStories } = useContext(APIContext);
	const [followingStories, setFollowingStories] = useState(false);

	useEffect(() => {
		async function getFollowingStories() {
			const response = await APIRequest("/story-follow/user-following/me", "GET");
			if (!response || response?.errors || !response?.data?.stories) return false;
			setFollowingStories(response.data.stories);
			setUserFollowingStories((oldValue) => {
				if (oldValue === false) {
					return response.data.stories?.map((e) => e?._id);
				}
				return oldValue.concat(response.data.stories?.map((e) => e?._id).filter((e) => !oldValue.includes(e)));
			});
		}
		getFollowingStories();
	}, [setFollowingStories, setUserFollowingStories, APIRequest]);

	const [isReorderingFollowingStories, setIsReorderingFollowingStories] = useState(false);

	function toggleIsReorderingFollowingStories() {
		setIsReorderingFollowingStories((oldValue) => !oldValue);
	}

	async function changeFollowingStoriesOrder(res) {
		if (res.from === undefined || res.to === undefined) return;

		let newUserFollowingStories = JSON.parse(JSON.stringify(userFollowingStories));

		newUserFollowingStories = newUserFollowingStories.concat(
			followingStories?.map((e) => e?._id).filter((e) => !newUserFollowingStories.includes(e))
		);

		const tempStory = newUserFollowingStories.splice(res.from, 1)[0];
		newUserFollowingStories.splice(res.to, 0, tempStory);
		setUserFollowingStories(newUserFollowingStories);

		await APIRequest("/user", "PATCH", {
			path: ["data", "followingStories"],
			newValue: newUserFollowingStories,
		});
	}

	return {
		userFollowingStories,
		followingStories,
		isReorderingFollowingStories,
		toggleIsReorderingFollowingStories,
		changeFollowingStoriesOrder,
	};
};
