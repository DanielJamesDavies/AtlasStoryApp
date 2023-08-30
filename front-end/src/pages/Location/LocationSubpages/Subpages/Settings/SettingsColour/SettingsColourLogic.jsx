// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { LocationContext } from "../../../../LocationContext";
import { APIContext } from "../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const SettingsColourLogic = () => {
	const { isAuthorizedToEdit, story, location, setLocation } = useContext(LocationContext);
	const { APIRequest } = useContext(APIContext);

	function changeColour(colour) {
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.colour = colour;
			return newLocation;
		});
	}

	const [errors, setErrors] = useState([]);

	async function revertColour() {
		setErrors([]);
		const response = await APIRequest("/location/get-value/" + location._id, "POST", {
			story_id: story._id,
			path: ["data", "colour"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.colour = response.data.value;
			return newLocation;
		});

		return true;
	}

	async function saveColour() {
		setErrors([]);
		if (!location?._id) return;
		const response = await APIRequest("/location/" + location._id, "PATCH", {
			story_id: story._id,
			path: ["data", "colour"],
			newValue: location.data.colour,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	return { isAuthorizedToEdit, location, changeColour, revertColour, saveColour, errors };
};
