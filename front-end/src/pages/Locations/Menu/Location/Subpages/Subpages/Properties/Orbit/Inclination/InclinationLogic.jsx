// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { LocationContext } from "../../../../../LocationContext";
import { APIContext } from "../../../../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const LocationInclinationLogic = () => {
	const { isAuthorizedToEdit, location_id, story, location, changeLocation } = useContext(LocationContext);
	const { APIRequest } = useContext(APIContext);

	function changeInclination(e) {
		e.stopPropagation();
		let newLocation = JSON.parse(JSON.stringify(location));
		newLocation.inclination = isNaN(parseFloat(e.target.value)) ? "" : parseFloat(e.target.value);
		if (e.target.value.substring(e.target.value.length - 2, e.target.value.length - 1) === ".") newLocation.inclination += ".";
		changeLocation(newLocation);
	}

	async function revertInclination(e) {
		e.stopPropagation();
		if (!story?._id) return false;

		const newLocationId = JSON.parse(JSON.stringify(location_id));
		const response = await APIRequest("/location/get-value/" + newLocationId, "POST", {
			story_id: story._id,
			path: ["inclination"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		let newLocation = JSON.parse(JSON.stringify(location));
		newLocation.inclination = response?.data?.value;
		changeLocation(newLocation);
		return true;
	}

	async function saveInclination(e) {
		e.stopPropagation();
		if (!story?._id) return false;
		const newLocationId = JSON.parse(JSON.stringify(location_id));
		const response = await APIRequest("/location/" + newLocationId, "PATCH", {
			story_id: story._id,
			newValue: isNaN(parseFloat(location?.inclination)) ? 0 : location?.inclination,
			path: ["inclination"],
		});
		if (!response || response?.errors) return false;
		return true;
	}

	return { isAuthorizedToEdit, location, changeInclination, revertInclination, saveInclination };
};
