// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { LocationsContext } from "../../../../LocationsContext";
import { APIContext } from "../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const LocationNameLogic = () => {
	const { isAuthorizedToEdit, story, locations, setLocations, selectedLocationId } = useContext(LocationsContext);
	const { APIRequest } = useContext(APIContext);

	function changeName(e) {
		e.stopPropagation();
		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		newLocations[locationIndex].data.name = e.target.value;
		setLocations(newLocations);
	}

	async function revertName(e) {
		e.stopPropagation();
		if (!story?._id) return false;

		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));

		const story_response = await APIRequest("/location/get-value/" + newSelectedLocationId, "POST", {
			story_id: story._id,
			path: ["data", "name"],
		});
		if (!story_response || story_response?.errors || story_response?.data?.value === undefined) return false;

		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		newLocations[locationIndex].data.name = story_response?.data?.value;
		setLocations(newLocations);

		return true;
	}

	async function saveName(e) {
		e.stopPropagation();
		if (!story?._id) return false;

		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));

		const response = await APIRequest("/location/" + newSelectedLocationId, "PATCH", {
			story_id: story._id,
			newValue: locations[locationIndex]?.data?.name,
			path: ["data", "name"],
		});
		if (!response || response?.errors) return false;
		return true;
	}

	return { isAuthorizedToEdit, locations, selectedLocationId, changeName, revertName, saveName };
};
