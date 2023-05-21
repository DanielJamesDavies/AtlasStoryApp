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

export const LocationTiltLogic = () => {
	const { isAuthorizedToEdit, location_id, story, location, changeLocation } = useContext(LocationContext);
	const { APIRequest } = useContext(APIContext);

	function changeTilt(e) {
		e.stopPropagation();
		let newLocation = JSON.parse(JSON.stringify(location));
		newLocation.tilt = isNaN(parseFloat(e.target.value)) ? "" : parseFloat(e.target.value);
		if (e.target.value.substring(e.target.value.length - 2, e.target.value.length - 1) === ".") newLocation.tilt += ".";
		changeLocation(newLocation);
	}

	async function revertTilt(e) {
		e.stopPropagation();
		if (!story?._id) return false;

		const newLocationId = JSON.parse(JSON.stringify(location_id));
		const response = await APIRequest("/location/get-value/" + newLocationId, "POST", {
			story_id: story._id,
			path: ["tilt"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		let newLocation = JSON.parse(JSON.stringify(location));
		newLocation.tilt = response?.data?.value;
		changeLocation(newLocation);
		return true;
	}

	async function saveTilt(e) {
		e.stopPropagation();
		if (!story?._id) return false;
		const newLocationId = JSON.parse(JSON.stringify(location_id));
		const response = await APIRequest("/location/" + newLocationId, "PATCH", {
			story_id: story._id,
			newValue: isNaN(parseFloat(location?.tilt)) ? 0 : location?.tilt,
			path: ["tilt"],
		});
		if (!response || response?.errors) return false;
		return true;
	}

	return { isAuthorizedToEdit, location, changeTilt, revertTilt, saveTilt };
};
