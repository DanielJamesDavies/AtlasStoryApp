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

export const DetailsLocationPathsLogic = () => {
	const { isAuthorizedToEdit, story, locations, setLocations, selectedLocationId } = useContext(LocationsContext);
	const { APIRequest } = useContext(APIContext);

	function changePathValue(newValue, index, key) {
		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		newLocations[locationIndex].paths[index][key] = newValue;
		setLocations(newLocations);
	}

	function changePathFrom(newValue, index) {
		changePathValue(newValue, index, "from");
	}

	function changePathTo(newValue, index) {
		changePathValue(newValue, index, "to");
	}

	function changePathType(newValue, index) {
		changePathValue(newValue, index, "type");
	}

	function togglePathIsMajor(e, index) {
		e.stopPropagation();
		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		newLocations[locationIndex].paths[index].isMajor = !newLocations[locationIndex].paths[index].isMajor;
		setLocations(newLocations);
	}

	function addPath() {
		const newPath = { from: "Unselected", to: "Unselected", type: "Unselected", isMajor: false };
		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		newLocations[locationIndex].paths.push(newPath);
		setLocations(newLocations);
	}

	async function revertPaths(e) {
		e.stopPropagation();
		if (!story?._id) return false;

		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));

		const story_response = await APIRequest("/location/get-value/" + newSelectedLocationId, "POST", {
			story_id: story._id,
			path: ["paths"],
		});
		if (!story_response || story_response?.errors || story_response?.data?.value === undefined) return false;

		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		newLocations[locationIndex].paths = story_response?.data?.value;
		setLocations(newLocations);

		return true;
	}

	async function savePaths(e) {
		e.stopPropagation();
		if (!story?._id) return false;

		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));

		const response = await APIRequest("/location/" + newSelectedLocationId, "PATCH", {
			story_id: story._id,
			newValue: locations[locationIndex]?.paths,
			path: ["paths"],
		});
		if (!response || response?.errors) return false;
		return true;
	}

	return {
		isAuthorizedToEdit,
		story,
		locations,
		selectedLocationId,
		changePathFrom,
		changePathTo,
		changePathType,
		togglePathIsMajor,
		addPath,
		revertPaths,
		savePaths,
	};
};
