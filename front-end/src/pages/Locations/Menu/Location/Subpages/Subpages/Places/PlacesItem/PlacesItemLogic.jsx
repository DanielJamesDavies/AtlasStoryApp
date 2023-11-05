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
		positioningPlaceID,
		setPositioningPlaceID,
		mapVersionID,
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
			const mapVersionIndex = newLocation.data.mapVersions?.findIndex((e) => e?._id === mapVersionID);
			if (mapVersionIndex === -1) return false;
			newLocation.data.mapVersions[mapVersionIndex].places[index].name = e.target.value;
			return newLocation;
		});
		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		const mapVersionIndex = newLocations[locationIndex].data.mapVersions?.findIndex((e) => e?._id === mapVersionID);
		if (locationIndex === -1 || mapVersionIndex === -1) return false;
		newLocations[locationIndex].data.mapVersions[mapVersionIndex].places[index].name = e.target.value;
		setLocations(newLocations);
	}

	function removePlacesItem() {
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			const mapVersionIndex = newLocation.data.mapVersions?.findIndex((e) => e?._id === mapVersionID);
			if (mapVersionIndex === -1) return false;
			newLocation.data.mapVersions[mapVersionIndex].places.splice(index, 1);
			return newLocation;
		});
		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		const mapVersionIndex = newLocations[locationIndex].data.mapVersions?.findIndex((e) => e?._id === mapVersionID);
		if (locationIndex === -1 || mapVersionIndex === -1) return false;
		newLocations[locationIndex].data.mapVersions[mapVersionIndex].places.splice(index, 1);
		setLocations(newLocations);
	}

	function startPositioningPlace() {
		setIsPositioningSurfaceMapPlace(true);
		setPositioningPlaceID(placesItem?._id);
	}

	function endPositioningPlace() {
		setIsPositioningSurfaceMapPlace(false);
		setPositioningPlaceID(false);
	}

	function changeLocation(e) {
		const new_location_id = locationChildren[e]?._id;

		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		if (locationIndex === -1) return false;
		const mapVersionIndex = newLocations[locationIndex].data.mapVersions?.findIndex((e) => e?._id === mapVersionID);
		if (mapVersionIndex === -1) return false;
		newLocations[locationIndex].data.mapVersions[mapVersionIndex].places[index].location = new_location_id;
		setLocations(newLocations);

		let newLocation = false;
		setLocation((oldLocation) => {
			newLocation = JSON.parse(JSON.stringify(oldLocation));
			const mapVersionIndex = newLocation.data.mapVersions?.findIndex((e) => e?._id === mapVersionID);
			if (mapVersionIndex === -1) return false;
			newLocation.data.mapVersions[mapVersionIndex].places[index].location = new_location_id;
			return newLocation;
		});
	}

	function changeSymbol(e) {
		const new_symbol = placeSymbols[e]?._id;

		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		if (locationIndex === -1) return false;
		const mapVersionIndex = newLocations[locationIndex].data.mapVersions?.findIndex((e) => e?._id === mapVersionID);
		if (mapVersionIndex === -1) return false;
		newLocations[locationIndex].data.mapVersions[mapVersionIndex].places[index].symbol = new_symbol;
		setLocations(newLocations);

		let newLocation = false;
		setLocation((oldLocation) => {
			newLocation = JSON.parse(JSON.stringify(oldLocation));
			const mapVersionIndex = newLocation.data.mapVersions?.findIndex((e) => e?._id === mapVersionID);
			if (mapVersionIndex === -1) return false;
			newLocation.data.mapVersions[mapVersionIndex].places[index].symbol = new_symbol;
			return newLocation;
		});
	}

	function toggleIsMajor() {
		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		if (locationIndex === -1) return false;
		const mapVersionIndex = newLocations[locationIndex].data.mapVersions?.findIndex((e) => e?._id === mapVersionID);
		if (mapVersionIndex === -1) return false;
		newLocations[locationIndex].data.mapVersions[mapVersionIndex].places[index].isMajor = newLocations[locationIndex].data.mapVersions[
			mapVersionIndex
		].places[index].isMajor
			? false
			: true;
		setLocations(newLocations);

		let newLocation = false;
		setLocation((oldLocation) => {
			newLocation = JSON.parse(JSON.stringify(oldLocation));
			const mapVersionIndex = newLocation.data.mapVersions?.findIndex((e) => e?._id === mapVersionID);
			if (mapVersionIndex === -1) return false;
			newLocation.data.mapVersions[mapVersionIndex].places[index].isMajor =
				newLocations[locationIndex].data.mapVersions[mapVersionIndex].places[index].isMajor;
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
