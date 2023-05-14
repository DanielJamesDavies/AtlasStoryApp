// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { GroupContext } from "../../../../GroupContext";
import { APIContext } from "../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const SettingsColourLogic = () => {
	const { isAuthorizedToEdit, story, group, setGroup } = useContext(GroupContext);
	const { APIRequest } = useContext(APIContext);

	function changeColour(colour) {
		setGroup((oldGroup) => {
			let newGroup = JSON.parse(JSON.stringify(oldGroup));
			newGroup.data.colour = colour;
			return newGroup;
		});
	}

	const [errors, setErrors] = useState([]);

	async function revertColour() {
		setErrors([]);
		const response = await APIRequest("/group/get-value/" + group._id, "POST", {
			story_id: story._id,
			path: ["data", "colour"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setGroup((oldGroup) => {
			let newGroup = JSON.parse(JSON.stringify(oldGroup));
			newGroup.data.colour = response.data.value;
			return newGroup;
		});

		return true;
	}

	async function saveColour() {
		setErrors([]);
		if (!group?._id) return;
		const response = await APIRequest("/group/" + group._id, "PATCH", {
			story_id: story._id,
			path: ["data", "colour"],
			newValue: group.data.colour,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	return { isAuthorizedToEdit, group, changeColour, revertColour, saveColour, errors };
};
