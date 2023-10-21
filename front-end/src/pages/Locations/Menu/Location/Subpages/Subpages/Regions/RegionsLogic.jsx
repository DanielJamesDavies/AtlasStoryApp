// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { APIContext } from "../../../../../../../context/APIContext";
import { LocationsContext } from "../../../../../LocationsContext";
import { LocationContext } from "../../../LocationContext";

// Services

// Styles

// Assets

export const RegionsLogic = () => {
	const { isAuthorizedToEdit, story, locations, setLocations, selectedLocationId } = useContext(LocationsContext);
	const { location, setLocation } = useContext(LocationContext);
	const { APIRequest } = useContext(APIContext);

	async function addRegionsItem() {
		const new_id_response = await APIRequest("/new-id/", "GET");
		if (!new_id_response || new_id_response?.errors || !new_id_response?.data?._id) return false;

		const new_region = { _id: new_id_response.data._id, name: "", colour: "#0044ff", components: [] };

		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.regions.push(new_region);
			return newLocation;
		});

		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		newLocations[locationIndex].data.regions.push(new_region);
		setLocations(newLocations);
	}

	const [isReorderingRegionsItems, setIsReorderingRegionsItems] = useState(false);
	function toggleIsReorderingRegionsItems() {
		setIsReorderingRegionsItems((oldIsReorderingRegionsItems) => !oldIsReorderingRegionsItems);
	}

	function reorderRegionsItems(res) {
		if (res?.from === undefined || res?.to === undefined) return false;
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			const tempRegionsItem = newLocation.data.regions.splice(res.from, 1)[0];
			newLocation.data.regions.splice(res.to, 0, tempRegionsItem);
			return newLocation;
		});
		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		const tempRegionsItem = newLocations[locationIndex].data.regions.splice(res.from, 1)[0];
		newLocations[locationIndex].data.regions.splice(res.to, 0, tempRegionsItem);
		setLocations(newLocations);
	}

	const [errors, setErrors] = useState([]);

	async function revertRegionsItems() {
		setErrors([]);
		const response = await APIRequest("/location/get-value/" + location._id, "POST", {
			story_id: story._id,
			path: ["data", "regions"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.regions = response.data.value;
			return newLocation;
		});

		return true;
	}

	async function saveRegionsItems() {
		setErrors([]);
		if (!location?._id) return;
		const response = await APIRequest("/location/" + location._id, "PATCH", {
			story_id: story._id,
			path: ["data", "regions"],
			newValue: location.data.regions,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	return {
		isAuthorizedToEdit,
		location,
		addRegionsItem,
		isReorderingRegionsItems,
		toggleIsReorderingRegionsItems,
		reorderRegionsItems,
		revertRegionsItems,
		saveRegionsItems,
		errors,
	};
};
