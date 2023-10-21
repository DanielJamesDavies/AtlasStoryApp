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

export const RegionsItemLogic = ({ regionsItem, index }) => {
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
	} = useContext(LocationsContext);
	const { setLocation } = useContext(LocationContext);

	function changeRegionsItemName(e) {
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.regions[index].name = e.target.value;
			return newLocation;
		});
		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		newLocations[locationIndex].data.regions[index].name = e.target.value;
		setLocations(newLocations);
	}

	function changeRegionsItemColour(new_colour) {
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.regions[index].colour = new_colour;
			return newLocation;
		});
		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		newLocations[locationIndex].data.regions[index].colour = new_colour;
		setLocations(newLocations);
	}

	function removeRegionsItem() {
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.regions.splice(index, 1);
			return newLocation;
		});
		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		newLocations[locationIndex].data.regions.splice(index, 1);
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
			newLocation.data.regions[index].components = newSelectedSurfaceMapComponents;
			return newLocation;
		});
		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		newLocations[locationIndex].data.regions[index].components = newSelectedSurfaceMapComponents;
		setLocations(newLocations);

		updateSurfaceMapComponentsList(newLocation);
	}

	return {
		changeRegionsItemName,
		changeRegionsItemColour,
		removeRegionsItem,
		isSelectingSurfaceMapComponents,
		regionSelectingSurfaceMapComponentsFor,
		startSelectingMapComponents,
		endSelectingMapComponents,
	};
};
