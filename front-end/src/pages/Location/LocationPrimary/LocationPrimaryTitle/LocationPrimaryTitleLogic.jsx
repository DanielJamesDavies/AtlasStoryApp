// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { LocationContext } from "../../LocationContext";
import { APIContext } from "../../../../context/APIContext";

// Services

// Styles

// Assets

export const LocationPrimaryTitleLogic = () => {
	const { isAuthorizedToEdit, story, location, setLocation } = useContext(LocationContext);
	const { APIRequest } = useContext(APIContext);

	function changeTitle(e) {
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.name = e.target.value;
			return newLocation;
		});
	}

	async function revertTitle() {
		const response = await APIRequest("/location/get-value/" + location._id, "POST", {
			story_id: story._id,
			path: ["data", "name"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.name = response.data.value;
			return newLocation;
		});

		return true;
	}

	const [errors, setErrors] = useState([]);

	async function saveTitle() {
		setErrors([]);
		if (!location?._id) return;
		const response = await APIRequest("/location/" + location._id, "PATCH", {
			story_id: story._id,
			path: ["data", "name"],
			newValue: location.data.name,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	return { isAuthorizedToEdit, story, location, changeTitle, revertTitle, saveTitle, errors };
};
