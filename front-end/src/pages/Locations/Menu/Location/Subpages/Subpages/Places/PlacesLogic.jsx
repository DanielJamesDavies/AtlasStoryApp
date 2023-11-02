// Packages
import { useContext, useEffect, useState } from "react";

// Components

// Logic

// Context
import { APIContext } from "../../../../../../../context/APIContext";
import { LocationsContext } from "../../../../../LocationsContext";
import { LocationContext } from "../../../LocationContext";

// Services
import { HierarchyFunctions } from "../../../../../HierarchyFunctions";

// Styles

// Assets

export const PlacesLogic = () => {
	const { isAuthorizedToEdit, story, locations, setLocations, selectedLocationId } = useContext(LocationsContext);
	const { location, setLocation } = useContext(LocationContext);
	const { APIRequest } = useContext(APIContext);
	const { getItemFromIdInHierarchy } = HierarchyFunctions();

	const [locationChildren, setLocationChildren] = useState([]);

	useEffect(() => {
		function flattenHierarchyItems(heirarchyItem) {
			let items = [heirarchyItem?._id];
			if (heirarchyItem?.children) {
				items = items.concat(
					heirarchyItem?.children?.map((e) => {
						return flattenHierarchyItems(e);
					})
				);
			}
			return items.flat();
		}

		function getLocationChildren() {
			const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
			const heirarchyItem = getItemFromIdInHierarchy(newSelectedLocationId, story?.data?.locationsHierarchy);

			const newLocationChildren = flattenHierarchyItems(heirarchyItem)
				.filter((e) => e !== newSelectedLocationId)
				.map((id) => {
					const location = locations?.find((e) => e?._id === id);
					return { _id: id, type: location?.type, data: { name: location?.data?.name } };
				})
				?.filter((e) => e?.type === "surfaceLocation");

			setLocationChildren(newLocationChildren);
		}
		getLocationChildren();
	}, [setLocationChildren, story, getItemFromIdInHierarchy, locations, selectedLocationId]);

	async function addPlacesItem() {
		const new_id_response = await APIRequest("/new-id/", "GET");
		if (!new_id_response || new_id_response?.errors || !new_id_response?.data?._id) return false;

		const new_place = { _id: new_id_response.data._id, name: "", colour: "#0044ff", position: [], symbol: "star" };

		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.places.push(new_place);
			return newLocation;
		});

		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		newLocations[locationIndex].data.places.push(new_place);
		setLocations(newLocations);
	}

	const [isReorderingPlacesItems, setIsReorderingPlacesItems] = useState(false);
	function toggleIsReorderingPlacesItems() {
		setIsReorderingPlacesItems((oldIsReorderingPlacesItems) => !oldIsReorderingPlacesItems);
	}

	function reorderPlacesItems(res) {
		if (res?.from === undefined || res?.to === undefined) return false;

		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		if (locationIndex === -1) return false;
		const tempPlacesItem = newLocations[locationIndex].data.places.splice(res.from, 1)[0];
		newLocations[locationIndex].data.places.splice(res.to, 0, tempPlacesItem);
		setLocations(newLocations);

		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			const tempPlacesItem = newLocation.data.places.splice(res.from, 1)[0];
			newLocation.data.places.splice(res.to, 0, tempPlacesItem);
			return newLocation;
		});
	}

	const [errors, setErrors] = useState([]);

	async function revertPlacesItems() {
		setErrors([]);
		const response = await APIRequest("/location/get-value/" + location._id, "POST", {
			story_id: story._id,
			path: ["data", "places"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.places = response.data.value;
			return newLocation;
		});

		return true;
	}

	async function savePlacesItems() {
		setErrors([]);
		if (!location?._id) return;

		const locationsLocation = locations?.find((e) => e?._id === location?._id);
		if (!locationsLocation) return false;

		const response = await APIRequest("/location/" + location._id, "PATCH", {
			story_id: story._id,
			path: ["data", "places"],
			newValue: locationsLocation.data.places,
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
		locationChildren,
		addPlacesItem,
		isReorderingPlacesItems,
		toggleIsReorderingPlacesItems,
		reorderPlacesItems,
		revertPlacesItems,
		savePlacesItems,
		errors,
	};
};
