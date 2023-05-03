// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { SubstoriesContext } from "../../SubstoriesContext";
import { APIContext } from "../../../../context/APIContext";

// Services

// Styles

// Assets

export const SubstoriesListSubstoryPostersLogic = () => {
	const { story, setStory, substoriesPosterBackgrounds, isReorderingSubstories } = useContext(SubstoriesContext);
	const { APIRequest } = useContext(APIContext);

	// Reorder Substories
	async function changeSubstoriesOrder(res) {
		let newStory = JSON.parse(JSON.stringify(story));

		if (res.from === undefined || res.to === undefined) return;

		const tempSubstory = newStory.data.substories.splice(res.from, 1)[0];
		newStory.data.substories.splice(res.to, 0, tempSubstory);

		setStory(newStory);

		await APIRequest("/story/" + newStory._id, "PATCH", {
			story_id: newStory._id,
			path: ["data", "substories"],
			newValue: newStory.data.substories,
		});
	}

	return { story, substoriesPosterBackgrounds, isReorderingSubstories, changeSubstoriesOrder };
};
