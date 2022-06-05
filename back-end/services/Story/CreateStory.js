const mongoose = require("mongoose");
const Joi = require("joi");
const jwt_decode = require("jwt-decode");

const Story = require("../../models/Story");
const User = require("../../models/User");
const Image = require("../../models/Image");

module.exports = async (req, res) => {
	let validateStoryResult = validateStory(req.body);
	if (validateStoryResult?.errors) return res.status(200).send({ errors: validateStoryResult.errors });

	// Check if URL is used
	const urlUsed = await Story.findOne({ url: req.body.url }).exec();

	// If username or email is used, return error
	if (urlUsed) {
		return res
			.status(200)
			.send({ errors: [{ attribute: "url", message: "This URL is being used by another story. Please enter a different URL" }] });
	}

	try {
		var { user_id } = jwt_decode(req?.cookies?.AtlasStoryAppToken);
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Authentication Error" }] });
	}

	// New Story
	const story = new Story({
		_id: new mongoose.Types.ObjectId(),
		url: req.body.url,
		owner: user_id,
		data: {
			title: req.body.title,
			isPrivate: req.body.isPrivate,
			members: [{ user_id: user_id, type: "owner" }],
			groups: [],
			primaryCharacters: [],
			characterTypes: [],
		},
	});

	let owner = await User.findById(user_id)
		.exec()
		.catch(() => {
			res.status(200).send({ errors: [{ message: "Owner Not Found" }] });
		});
	if (!owner) return res.status(200).send({ errors: [{ message: "Owner Not Found" }] });

	if (!owner.data.stories.includes(story._id)) owner.data.stories.push(story._id);

	try {
		await story.save();
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Story Could Not Be Created" }] });
	}

	try {
		await owner.save();
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Owner Could Not Be Saved" }] });
	}

	return res.status(200).send({ message: "Success", data: { storyURL: story.url } });
};

function validateStory(story) {
	const storySchema = Joi.object({
		url: Joi.string().min(1).max(64).required(),
		title: Joi.string().min(1).max(64).required(),
		isPrivate: Joi.boolean().required(),
	});

	const storyValidationError = storySchema.validate({ url: story.url, title: story.title, isPrivate: story.isPrivate }, { abortEarly: false })
		?.error?.details;

	if (storyValidationError) {
		let storyKeysData = [
			{ key: "url", name: "URL", indefiniteArticle: "a" },
			{ key: "title", name: "Title", indefiniteArticle: "a" },
			{ key: "Private Account", name: "Email", indefiniteArticle: "an" },
		];

		return {
			errors: storyValidationError.map((error) => {
				let keyData = storyKeysData.find((e) => e.key === error.path[0]);
				let message = "";

				switch (error.type) {
					case "string.empty":
						message = "Please Enter " + keyData.indefiniteArticle + " " + keyData.name;
						break;
					case "string.min":
						message =
							"Please Enter " +
							keyData.indefiniteArticle +
							" " +
							keyData.name +
							" That Is Above " +
							error.context.limit +
							" Characters";
						break;
					case "string.max":
						message =
							"Please Enter " +
							keyData.indefiniteArticle +
							" " +
							keyData.name +
							" That Is Below " +
							error.context.limit +
							" Characters";
						break;
					default:
						message = "An Unknown Error Has Occured. Please Try Again";
						break;
				}

				return { attribute: error.path[0], message };
			}),
		};
	}
	return {};
}
