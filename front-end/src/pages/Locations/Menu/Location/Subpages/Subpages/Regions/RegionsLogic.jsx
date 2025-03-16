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

export const RegionsLogic = () => {
	const {
		isAuthorizedToEdit,
		story,
		locations,
		setLocations,
		selectedLocationId,
		isDrawingSurfaceMapComponents,
		setIsDrawingSurfaceMapComponents,
		isDeletingSurfaceMapComponents,
		setIsDeletingSurfaceMapComponents,
		mapVersionID,
		locationMapComponentsImages,
		setLocationMapComponentsImages,
		setIsSelectingSurfaceMapComponents,
		setRegionSelectingSurfaceMapComponentsFor,
	} = useContext(LocationsContext);
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

	async function addRegionsItem() {
		const new_id_response = await APIRequest("/new-id/", "GET");
		if (!new_id_response || new_id_response?.errors || !new_id_response?.data?._id) return false;

		const new_region = { _id: new_id_response.data._id, name: "", colour: "#0044ff", components: [] };

		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			const mapVersionIndex = newLocation.data.mapVersions?.findIndex((e) => e?._id === mapVersionID);
			if (mapVersionIndex === -1) return newLocation;
			newLocation.data.mapVersions[mapVersionIndex].regions.push(new_region);
			return newLocation;
		});

		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		const mapVersionIndex = newLocations[locationIndex].data.mapVersions?.findIndex((e) => e?._id === mapVersionID);
		newLocations[locationIndex].data.mapVersions[mapVersionIndex].regions.push(new_region);
		setLocations(newLocations);
	}

	const [isReorderingRegionsItems, setIsReorderingRegionsItems] = useState(false);
	function toggleIsReorderingRegionsItems() {
		setIsReorderingRegionsItems((oldIsReorderingRegionsItems) => !oldIsReorderingRegionsItems);
	}

	function reorderRegionsItems(res) {
		if (res?.from === undefined || res?.to === undefined) return false;

		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		if (locationIndex === -1) return false;
		const mapVersionIndex = newLocations[locationIndex].data.mapVersions.findIndex(
			(e) => JSON.stringify(e?._id) === JSON.stringify(mapVersionID)
		);
		if (mapVersionIndex === -1) return false;
		const tempRegionsItem = newLocations[locationIndex].data.mapVersions[mapVersionIndex].regions.splice(res.from, 1)[0];
		newLocations[locationIndex].data.mapVersions[mapVersionIndex].regions.splice(res.to, 0, tempRegionsItem);
		setLocations(newLocations);

		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			const mapVersionIndex = newLocation.data.mapVersions?.findIndex((e) => e?._id === mapVersionID);
			if (mapVersionIndex === -1) return newLocation;
			const tempRegionsItem = newLocation.data.mapVersions[mapVersionIndex].regions.splice(res.from, 1)[0];
			newLocation.data.mapVersions[mapVersionIndex].regions.splice(res.to, 0, tempRegionsItem);
			return newLocation;
		});
	}

	const [errors, setErrors] = useState([]);

	async function revertRegionsItems() {
		setErrors([]);
		const response = await APIRequest("/location/get-value/" + location._id, "POST", {
			story_id: story._id,
			path: ["data", "mapVersions", mapVersionID, "regions"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			const mapVersionIndex = newLocation.data.mapVersions?.findIndex((e) => e?._id === mapVersionID);
			if (mapVersionIndex === -1) return newLocation;
			newLocation.data.mapVersions[mapVersionIndex].regions = response.data.value;
			return newLocation;
		});

		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		if (locationIndex === -1) return false;
		const mapVersionIndex = newLocations[locationIndex].data.mapVersions.findIndex(
			(e) => JSON.stringify(e?._id) === JSON.stringify(mapVersionID)
		);
		if (mapVersionIndex === -1) return false;
		newLocations[locationIndex].data.mapVersions[mapVersionIndex].regions = response.data.value;
		setLocations(newLocations);

		return true;
	}

	async function saveRegionsItems() {
		setErrors([]);
		if (!location?._id) return;

		const locationsLocation = locations?.find((e) => e?._id === location?._id);
		if (!locationsLocation) return false;

		const mapVersionIndex = locationsLocation.data.mapVersions?.findIndex((e) => e?._id === mapVersionID);
		if (mapVersionIndex === -1) return false;

		const locationMapComponentsImage = locationMapComponentsImages?.find((e) => e?.location_map_version_id === mapVersionID);
		if (!locationMapComponentsImage) return false;

		const regions_response = await APIRequest("/location/" + location._id, "PATCH", {
			story_id: story._id,
			path: ["data", "mapVersions", mapVersionID, "regions"],
			newValue: location.data.mapVersions[mapVersionIndex].regions,
		});
		if (!regions_response || regions_response?.errors) {
			if (regions_response?.errors) setErrors(regions_response.errors);
			return false;
		}

		const components_response = await APIRequest("/image/" + locationMapComponentsImage?._id, "PATCH", {
			newValue: locationMapComponentsImage?.image,
			story_id: story?._id,
			unit_id: location?._id,
			location_id: location?._id,
			location_map_version_id: mapVersionID,
		});
		if (!components_response || components_response?.errors) {
			if (components_response?.errors) setErrors(components_response.errors);
			return false;
		}

		return true;
	}

	function toggleIsDrawingSurfaceMapComponents() {
		setIsDrawingSurfaceMapComponents((oldValue) => !oldValue);

		setIsSelectingSurfaceMapComponents(false);
		setRegionSelectingSurfaceMapComponentsFor(false);
		setIsDeletingSurfaceMapComponents(false);
	}

	function toggleIsDeletingSurfaceMapComponents() {
		setIsDeletingSurfaceMapComponents((oldValue) => !oldValue);

		setIsSelectingSurfaceMapComponents(false);
		setRegionSelectingSurfaceMapComponentsFor(false);
		setIsDrawingSurfaceMapComponents(false);
	}

	function deleteAllSurfaceMapComponents() {
		setIsDeletingSurfaceMapComponents(false);

		setIsSelectingSurfaceMapComponents(false);
		setRegionSelectingSurfaceMapComponentsFor(false);
		setIsDrawingSurfaceMapComponents(false);

		const locationMapComponentsImage = locationMapComponentsImages?.find((e) => e?.location_map_version_id === mapVersionID)?.image;
		if (!locationMapComponentsImage) return false;
		const newLocationMapComponentsImage = locationMapComponentsImage.split("<path")[0] + "</svg>";

		setLocationMapComponentsImages((oldValue) => {
			let newValue = JSON.parse(JSON.stringify(oldValue));
			const index = newValue?.findIndex((e) => e?.location_map_version_id === mapVersionID);
			if (index === -1) return newValue;
			newValue[index].image = newLocationMapComponentsImage;
			return newValue;
		});
	}

	return {
		isAuthorizedToEdit,
		location,
		locationChildren,
		addRegionsItem,
		isReorderingRegionsItems,
		toggleIsReorderingRegionsItems,
		reorderRegionsItems,
		revertRegionsItems,
		saveRegionsItems,
		errors,
		isDrawingSurfaceMapComponents,
		toggleIsDrawingSurfaceMapComponents,
		isDeletingSurfaceMapComponents,
		toggleIsDeletingSurfaceMapComponents,
		deleteAllSurfaceMapComponents,
		mapVersionID,
	};
};
