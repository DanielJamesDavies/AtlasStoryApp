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

export const PlacesItemLogic = ({ placesItem, index, locationChildren }) => {
	const {
		locations,
		setLocations,
		selectedLocationId,
		setIsPositioningSurfaceMapPlace,
		selectedSurfaceMapComponents,
		setSelectedSurfaceMapComponents,
		positioningPlaceID,
		setPositioningPlaceID,
		updateSurfaceMapComponentsList,
	} = useContext(LocationsContext);
	const { setLocation } = useContext(LocationContext);

	const placeSymbols = [
		{ _id: "star", name: "Star" },
		{ _id: "marker", name: "Marker" },
		{ _id: "circle", name: "Circle" },
		{ _id: "crosshairs", name: "Crosshairs" },
	];

	function changePlacesItemName(e) {
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.places[index].name = e.target.value;
			return newLocation;
		});
		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		newLocations[locationIndex].data.places[index].name = e.target.value;
		setLocations(newLocations);
	}

	function removePlacesItem() {
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.places.splice(index, 1);
			return newLocation;
		});
		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		newLocations[locationIndex].data.places.splice(index, 1);
		setLocations(newLocations);
	}

	function startPositioningPlace() {
		setIsPositioningSurfaceMapPlace(true);
		setSelectedSurfaceMapComponents(placesItem?.components);
		setPositioningPlaceID(placesItem?._id);
	}

	function endPositioningPlace() {
		setIsPositioningSurfaceMapPlace(false);
		setPositioningPlaceID(false);
		let newSelectedSurfaceMapComponents = JSON.parse(JSON.stringify(selectedSurfaceMapComponents));
		setSelectedSurfaceMapComponents([]);

		let newLocation = false;
		setLocation((oldLocation) => {
			newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.places[index].components = newSelectedSurfaceMapComponents;
			return newLocation;
		});
		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		newLocations[locationIndex].data.places[index].components = newSelectedSurfaceMapComponents;
		setLocations(newLocations);

		updateSurfaceMapComponentsList(newLocation);
	}

	function changeLocation(e) {
		const new_location_id = locationChildren[e]?._id;

		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		if (locationIndex === -1) return false;
		newLocations[locationIndex].data.places[index].location = new_location_id;
		setLocations(newLocations);

		let newLocation = false;
		setLocation((oldLocation) => {
			newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.places[index].location = new_location_id;
			return newLocation;
		});
	}

	function changeSymbol(e) {
		const new_symbol = placeSymbols[e]?._id;

		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		if (locationIndex === -1) return false;
		newLocations[locationIndex].data.places[index].symbol = new_symbol;
		setLocations(newLocations);

		let newLocation = false;
		setLocation((oldLocation) => {
			newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.places[index].symbol = new_symbol;
			return newLocation;
		});
	}

	function toggleIsMajor() {
		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		if (locationIndex === -1) return false;
		newLocations[locationIndex].data.places[index].isMajor = newLocations[locationIndex].data.places[index].isMajor ? false : true;
		setLocations(newLocations);

		let newLocation = false;
		setLocation((oldLocation) => {
			newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.places[index].isMajor = newLocations[locationIndex].data.places[index].isMajor;
			return newLocation;
		});
	}

	return {
		locations,
		changePlacesItemName,
		removePlacesItem,
		positioningPlaceID,
		startPositioningPlace,
		endPositioningPlace,
		changeLocation,
		placeSymbols,
		changeSymbol,
		toggleIsMajor,
	};
};
