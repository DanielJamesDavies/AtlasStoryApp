// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { SubstoryContext } from "../../../../SubstoryContext";
import { APIContext } from "../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const SubstoryProfileDescriptionLogic = () => {
	const { isAuthorizedToEdit, story, substory, substoryVersion, changeSubstoryVersion } = useContext(SubstoryContext);
	const { APIRequest } = useContext(APIContext);

	function changeDescription(e) {
		let newSubstoryVersion = JSON.parse(JSON.stringify(substoryVersion));
		newSubstoryVersion.description = e.target.value.split("\n");
		changeSubstoryVersion(newSubstoryVersion);
	}

	async function revertDescription() {
		const response = await APIRequest("/substory/get-value/" + substory._id, "POST", {
			story_id: story._id,
			path: ["data", "versions", substoryVersion._id, "description"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		let newSubstoryVersion = JSON.parse(JSON.stringify(substoryVersion));
		newSubstoryVersion.description = response.data.value;
		changeSubstoryVersion(newSubstoryVersion);

		return true;
	}

	async function saveDescription() {
		const response = await APIRequest("/substory/" + substory._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions", substoryVersion._id, "description"],
			newValue: substoryVersion.description,
		});
		if (!response || response?.errors) return false;
		return true;
	}

	return { isAuthorizedToEdit, substoryVersion, changeDescription, revertDescription, saveDescription };
};
