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

export const LocationDayLengthLogic = () => {
	const { isAuthorizedToEdit, location_id, story, location, changeLocation } = useContext(LocationContext);
	const { APIRequest } = useContext(APIContext);

	function changeDayLength(e) {
		e.stopPropagation();
		let newLocation = JSON.parse(JSON.stringify(location));
		newLocation.dayLength = isNaN(parseFloat(e.target.value)) ? "" : parseFloat(e.target.value);
		if (e.target.value.substring(e.target.value.length - 1) === ".") newLocation.dayLength += ".";
		changeLocation(newLocation);
	}

	async function revertDayLength(e) {
		e.stopPropagation();
		if (!story?._id) return false;

		const newLocationId = JSON.parse(JSON.stringify(location_id));
		const response = await APIRequest("/location/get-value/" + newLocationId, "POST", {
			story_id: story._id,
			path: ["dayLength"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		let newLocation = JSON.parse(JSON.stringify(location));
		newLocation.dayLength = response?.data?.value;
		changeLocation(newLocation);
		return true;
	}

	async function saveDayLength(e) {
		e.stopPropagation();
		if (!story?._id) return false;
		const newLocationId = JSON.parse(JSON.stringify(location_id));
		const response = await APIRequest("/location/" + newLocationId, "PATCH", {
			story_id: story._id,
			newValue: isNaN(parseFloat(location?.dayLength)) ? 0 : location?.dayLength,
			path: ["dayLength"],
		});
		if (!response || response?.errors) return false;
		return true;
	}

	return { isAuthorizedToEdit, location, changeDayLength, revertDayLength, saveDayLength };
};
