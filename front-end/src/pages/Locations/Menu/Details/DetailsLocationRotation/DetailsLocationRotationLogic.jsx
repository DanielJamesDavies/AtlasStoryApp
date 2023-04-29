// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { LocationsContext } from "../../../LocationsContext";
import { APIContext } from "../../../../../context/APIContext";

// Services

// Styles

// Assets

export const DetailsLocationRotationLogic = () => {
	const { isAuthorizedToEdit, story, locations, setLocations, selectedLocationId } = useContext(LocationsContext);
	const { APIRequest } = useContext(APIContext);

	function changeRotation(e, newValue) {
		e.stopPropagation();
		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		newLocations[locationIndex].rotation = newValue;
		setLocations(newLocations);
	}

	async function revertRotation(e) {
		e.stopPropagation();
		if (!story?._id) return false;

		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));

		const story_response = await APIRequest("/location/get-value/" + newSelectedLocationId, "POST", {
			story_id: story._id,
			path: ["rotation"],
		});
		if (!story_response || story_response?.errors || story_response?.data?.value === undefined) return false;

		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		newLocations[locationIndex].rotation = story_response?.data?.value;
		setLocations(newLocations);

		return true;
	}

	async function saveRotation(e) {
		e.stopPropagation();
		if (!story?._id) return false;

		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));

		const response = await APIRequest("/location/" + newSelectedLocationId, "PATCH", {
			story_id: story._id,
			newValue: locations[locationIndex]?.rotation,
			path: ["rotation"],
		});
		if (!response || response?.errors) return false;
		return true;
	}

	return { isAuthorizedToEdit, locations, selectedLocationId, changeRotation, revertRotation, saveRotation };
};
