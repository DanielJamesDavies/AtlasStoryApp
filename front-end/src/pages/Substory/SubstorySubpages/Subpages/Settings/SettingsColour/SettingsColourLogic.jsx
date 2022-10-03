// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { SubstoryContext } from "../../../../SubstoryContext";
import { APIContext } from "../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const SettingsColourLogic = () => {
	const { isAuthorizedToEdit, story, substory, setSubstory } = useContext(SubstoryContext);
	const { APIRequest } = useContext(APIContext);

	function changeColour(colour) {
		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			newSubstory.data.colour = colour;
			return newSubstory;
		});
	}

	const [errors, setErrors] = useState([]);

	async function revertColour() {
		setErrors([]);
		const response = await APIRequest("/substory/get-value/" + substory._id, "POST", {
			story_id: story._id,
			path: ["data", "colour"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			newSubstory.data.colour = response.data.value;
			return newSubstory;
		});

		return true;
	}

	async function saveColour() {
		setErrors([]);
		if (!substory?._id) return;
		const response = await APIRequest("/substory/" + substory._id, "PATCH", {
			story_id: story._id,
			path: ["data", "colour"],
			newValue: substory.data.colour,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	return { isAuthorizedToEdit, substory, changeColour, revertColour, saveColour, errors };
};
