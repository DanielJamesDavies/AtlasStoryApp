// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { LocationsContext } from "../../../../../../LocationsContext";
import { LocationContext } from "../../../../LocationContext";

// Services

// Styles

// Assets

export const RegionsItemLogic = ({ regionsItem, index, locationChildren, mapVersion }) => {
	const {
		locations,
		setLocations,
		selectedLocationId,
		isSelectingSurfaceMapComponents,
		setIsSelectingSurfaceMapComponents,
		selectedSurfaceMapComponents,
		setSelectedSurfaceMapComponents,
		regionSelectingSurfaceMapComponentsFor,
		setRegionSelectingSurfaceMapComponentsFor,
		updateSurfaceMapComponentsList,
		setRegionItemHoveringOver,
	} = useContext(LocationsContext);
	const { setLocation } = useContext(LocationContext);

	function changeRegionsItemName(e) {
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			const mapVersionIndex = newLocation.data.mapVersions?.findIndex((e) => e?._id === mapVersion);
			if (mapVersionIndex === -1) return newLocation;
			newLocation.data.mapVersions[mapVersionIndex].regions[index].name = e.target.value;
			return newLocation;
		});
		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		const mapVersionIndex = newLocations[locationIndex].data.mapVersions?.findIndex((e) => e?._id === mapVersion);
		newLocations[locationIndex].data.mapVersions[mapVersionIndex].regions[index].name = e.target.value;
		setLocations(newLocations);
	}

	function changeRegionsItemColour(new_colour) {
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			const mapVersionIndex = newLocation.data.mapVersions?.findIndex((e) => e?._id === mapVersion);
			if (mapVersionIndex === -1) return newLocation;
			newLocation.data.mapVersions[mapVersionIndex].regions[index].colour = new_colour;
			return newLocation;
		});
		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		const mapVersionIndex = newLocations[locationIndex].data.mapVersions?.findIndex((e) => e?._id === mapVersion);
		newLocations[locationIndex].data.mapVersions[mapVersionIndex].regions[index].colour = new_colour;
		setLocations(newLocations);
	}

	function removeRegionsItem() {
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			const mapVersionIndex = newLocation.data.mapVersions?.findIndex((e) => e?._id === mapVersion);
			if (mapVersionIndex === -1) return newLocation;
			newLocation.data.mapVersions[mapVersionIndex].regions.splice(index, 1);
			return newLocation;
		});
		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		const mapVersionIndex = newLocations[locationIndex].data.mapVersions?.findIndex((e) => e?._id === mapVersion);
		newLocations[locationIndex].data.mapVersions[mapVersionIndex].regions.splice(index, 1);
		setLocations(newLocations);
	}

	function startSelectingMapComponents() {
		setIsSelectingSurfaceMapComponents(true);
		setSelectedSurfaceMapComponents(regionsItem?.components);
		setRegionSelectingSurfaceMapComponentsFor(regionsItem?._id);
	}

	function endSelectingMapComponents() {
		setIsSelectingSurfaceMapComponents(false);
		setRegionSelectingSurfaceMapComponentsFor(false);
		let newSelectedSurfaceMapComponents = JSON.parse(JSON.stringify(selectedSurfaceMapComponents));
		setSelectedSurfaceMapComponents([]);

		let newLocation = false;
		setLocation((oldLocation) => {
			newLocation = JSON.parse(JSON.stringify(oldLocation));
			const mapVersionIndex = newLocation.data.mapVersions?.findIndex((e) => e?._id === mapVersion);
			if (mapVersionIndex === -1) return newLocation;
			newLocation.data.mapVersions[mapVersionIndex].regions[index].components = newSelectedSurfaceMapComponents;
			return newLocation;
		});
		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		const mapVersionIndex = newLocations[locationIndex].data.mapVersions?.findIndex((e) => e?._id === mapVersion);
		newLocations[locationIndex].data.mapVersions[mapVersionIndex].regions[index].components = newSelectedSurfaceMapComponents;
		setLocations(newLocations);

		updateSurfaceMapComponentsList(newLocations[locationIndex].data.mapVersions[mapVersionIndex]);
	}

	function changeLocation(e) {
		const new_location_id = locationChildren[e]?._id;

		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		if (locationIndex === -1) return false;
		const mapVersionIndex = newLocations[locationIndex].data.mapVersions?.findIndex((e) => e?._id === mapVersion);
		if (mapVersionIndex === -1) return false;
		newLocations[locationIndex].data.mapVersions[mapVersionIndex].regions[index].location = new_location_id;
		setLocations(newLocations);

		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			const mapVersionIndex = newLocation.data.mapVersions?.findIndex((e) => e?._id === mapVersion);
			if (mapVersionIndex === -1) return newLocation;
			newLocation.data.mapVersions[mapVersionIndex].regions[index].location = new_location_id;
			return newLocation;
		});
	}

	function onMouseOver() {
		setRegionItemHoveringOver(regionsItem?._id);
	}

	function onMouseOut() {
		setRegionItemHoveringOver((oldValue) => {
			if (JSON.stringify(oldValue) === JSON.stringify(regionsItem?._id)) return false;
			return oldValue;
		});
	}

	return {
		locations,
		changeRegionsItemName,
		changeRegionsItemColour,
		removeRegionsItem,
		isSelectingSurfaceMapComponents,
		regionSelectingSurfaceMapComponentsFor,
		startSelectingMapComponents,
		endSelectingMapComponents,
		changeLocation,
		onMouseOver,
		onMouseOut,
	};
};
