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

export const LocationPathsLogic = () => {
	const { isAuthorizedToEdit, location_id, story, locations, location, changeLocation } = useContext(LocationContext);
	const { APIRequest } = useContext(APIContext);

	function changePathValue(newValue, index, key) {
		let newLocation = JSON.parse(JSON.stringify(location));
		newLocation.paths[index][key] = newValue;
		changeLocation(newLocation);
	}

	function changePathFrom(newValue, index) {
		changePathValue(newValue, index, "from");
	}

	function changePathTo(newValue, index) {
		changePathValue(newValue, index, "to");
	}

	function togglePathIsMajor(e, index) {
		e.stopPropagation();
		let newLocation = JSON.parse(JSON.stringify(location));
		newLocation.paths[index].isMajor = !newLocation.paths[index].isMajor;
		changeLocation(newLocation);
	}

	function changePathColour(newValue, index) {
		changePathValue(newValue, index, "colour");
	}

	function addPath() {
		const newPath = { from: "Unselected", to: "Unselected", type: "Unselected", isMajor: false };
		let newLocation = JSON.parse(JSON.stringify(location));
		newLocation.paths.push(newPath);
		changeLocation(newLocation);
	}

	async function revertPaths(e) {
		e.stopPropagation();
		if (!story?._id) return false;

		const newLocationId = JSON.parse(JSON.stringify(location_id));
		const story_response = await APIRequest("/location/get-value/" + newLocationId, "POST", {
			story_id: story._id,
			path: ["paths"],
		});
		if (!story_response || story_response?.errors || story_response?.data?.value === undefined) return false;

		let newLocation = JSON.parse(JSON.stringify(location));
		newLocation.paths = story_response?.data?.value;
		changeLocation(newLocation);

		return true;
	}

	async function savePaths(e) {
		e.stopPropagation();
		if (!story?._id) return false;

		const newLocationId = JSON.parse(JSON.stringify(location_id));
		const response = await APIRequest("/location/" + newLocationId, "PATCH", {
			story_id: story._id,
			newValue: location?.paths,
			path: ["paths"],
		});
		if (!response || response?.errors) return false;
		return true;
	}

	return {
		isAuthorizedToEdit,
		location_id,
		story,
		locations,
		location,
		changePathFrom,
		changePathTo,
		togglePathIsMajor,
		changePathColour,
		addPath,
		revertPaths,
		savePaths,
	};
};
