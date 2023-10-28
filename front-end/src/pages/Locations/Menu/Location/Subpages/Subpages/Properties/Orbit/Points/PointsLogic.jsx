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

export const LocationPointsLogic = () => {
	const { isAuthorizedToEdit, location_id, story, location, changeLocation } = useContext(LocationContext);
	const { APIRequest } = useContext(APIContext);

	function changePoints(e, index) {
		e.stopPropagation();
		let newLocation = JSON.parse(JSON.stringify(location));
		newLocation.points[index] = e.target.value.trim().length === 0 ? "" : parseFloat(e.target.value);
		changeLocation(newLocation);
	}

	async function revertPoints(e) {
		e.stopPropagation();
		if (!story?._id) return false;

		const newLocationId = JSON.parse(JSON.stringify(location_id));
		const response = await APIRequest("/location/get-value/" + newLocationId, "POST", {
			story_id: story._id,
			path: ["points"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		let newLocation = JSON.parse(JSON.stringify(location));
		newLocation.points = response?.data?.value;
		changeLocation(newLocation);
		return true;
	}

	async function savePoints(e) {
		e.stopPropagation();
		if (!story?._id) return false;

		const newLocationId = JSON.parse(JSON.stringify(location_id));
		let newLocation = JSON.parse(JSON.stringify(location));
		newLocation.points = newLocation.points.map((point) => (isNaN(parseFloat(point)) ? 0 : parseFloat(point)));
		changeLocation(newLocation);

		const response = await APIRequest("/location/" + newLocationId, "PATCH", {
			story_id: story._id,
			newValue: newLocation.points,
			path: ["points"],
		});
		if (!response || response?.errors) return false;

		return true;
	}

	return { isAuthorizedToEdit, location, changePoints, revertPoints, savePoints };
};
