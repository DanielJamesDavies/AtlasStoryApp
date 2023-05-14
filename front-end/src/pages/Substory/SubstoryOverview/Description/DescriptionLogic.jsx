// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { SubstoryContext } from "../../SubstoryContext";
import { APIContext } from "../../../../context/APIContext";

// Services

// Styles

// Assets

export const SubstoryOverviewDescriptionLogic = () => {
	const { isAuthorizedToEdit, story, substory, setSubstory } = useContext(SubstoryContext);
	const { APIRequest } = useContext(APIContext);

	function changeDescription(e) {
		let newSubstory = JSON.parse(JSON.stringify(substory));
		newSubstory.data.description = e.target.value.split("\n");
		setSubstory(newSubstory);
	}

	async function revertDescription() {
		const response = await APIRequest("/substory/get-value/" + substory._id, "POST", {
			story_id: story._id,
			path: ["data", "description"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		let newSubstory = JSON.parse(JSON.stringify(substory));
		newSubstory.data.description = response.data.value;
		setSubstory(newSubstory);

		return true;
	}

	async function saveDescription() {
		const response = await APIRequest("/substory/" + substory._id, "PATCH", {
			story_id: story._id,
			path: ["data", "description"],
			newValue: substory.data.description,
		});
		if (!response || response?.errors) return false;
		return true;
	}

	return { isAuthorizedToEdit, substory, changeDescription, revertDescription, saveDescription };
};
