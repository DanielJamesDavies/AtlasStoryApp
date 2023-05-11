// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { LocationContext } from "../../../../LocationContext";
import { APIContext } from "../../../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const LocationRotationLogic = () => {
	const { isAuthorizedToEdit, location_id, story, location, changeLocation } = useContext(LocationContext);
	const { APIRequest } = useContext(APIContext);

	function changeRotation(e, newValue) {
		e.stopPropagation();
		let newLocation = JSON.parse(JSON.stringify(location));
		newLocation.rotation = newValue;
		changeLocation(newLocation);
	}

	async function revertRotation(e) {
		e.stopPropagation();
		if (!story?._id) return false;

		const newLocationId = JSON.parse(JSON.stringify(location_id));
		const story_response = await APIRequest("/location/get-value/" + newLocationId, "POST", {
			story_id: story._id,
			path: ["rotation"],
		});
		if (!story_response || story_response?.errors || story_response?.data?.value === undefined) return false;

		let newLocation = JSON.parse(JSON.stringify(location));
		newLocation.rotation = story_response?.data?.value;
		changeLocation(newLocation);

		return true;
	}

	async function saveRotation(e) {
		e.stopPropagation();
		if (!story?._id) return false;

		const newLocationId = JSON.parse(JSON.stringify(location_id));
		const response = await APIRequest("/location/" + newLocationId, "PATCH", {
			story_id: story._id,
			newValue: location?.rotation,
			path: ["rotation"],
		});
		if (!response || response?.errors) return false;
		return true;
	}

	return { isAuthorizedToEdit, location, changeRotation, revertRotation, saveRotation };
};
