// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { LocationsContext } from "../LocationsContext";

// Services

// Styles

// Assets

export const LocationVersionLogic = () => {
	const {
		locations,
		currentMapLocationId,
		mapVersionID,
		setMapVersionID,
		locationMapComponentsImages,
		locationMapImage,
		setLocationMapImage,
		locationMapComponentsImage,
		setLocationMapComponentsImage,
		locationMapImages,
		locationsSurfaceMapLoadingCircleContainerRef,
	} = useContext(LocationsContext);

	function decrementMapVersion() {
		const oldLocationMapImage = JSON.parse(JSON.stringify(locationMapImage));
		const oldLocationMapComponentsImage = JSON.parse(JSON.stringify(locationMapComponentsImage));

		setLocationMapImage(false);
		setLocationMapComponentsImage(false);

		const location = locations?.find((e) => e?._id === currentMapLocationId);
		if (!location?.data?.mapVersions) {
			setLocationMapImage(oldLocationMapImage);
			setLocationMapComponentsImage(oldLocationMapComponentsImage);
			return;
		}

		const currentVersionIndex = location.data.mapVersions.findIndex((e) => e._id === mapVersionID);
		if (currentVersionIndex === -1 || currentVersionIndex === 0) {
			setLocationMapImage(oldLocationMapImage);
			setLocationMapComponentsImage(oldLocationMapComponentsImage);
			return false;
		}

		locationsSurfaceMapLoadingCircleContainerRef.current.classList.remove("locations-surface-map-loading-circle-container-loaded");
		setMapVersionID(location.data.mapVersions[currentVersionIndex - 1]?._id);
		setTimeout(() => {
			locationsSurfaceMapLoadingCircleContainerRef.current.classList.add("locations-surface-map-loading-circle-container-loaded");
			setLocationMapImage(locationMapImages?.find((e) => e?._id === location.data.mapVersions[currentVersionIndex - 1]?.mapImage)?.image);
			setLocationMapComponentsImage(
				locationMapComponentsImages?.find((e) => e?._id === location.data.mapVersions[currentVersionIndex - 1]?.mapImageComponents)?.image
			);
		}, 200);
	}

	function incrementMapVersion() {
		const oldLocationMapImage = JSON.parse(JSON.stringify(locationMapImage));
		const oldLocationMapComponentsImage = JSON.parse(JSON.stringify(locationMapComponentsImage));

		setLocationMapImage(false);
		setLocationMapComponentsImage(false);

		const location = locations?.find((e) => e?._id === currentMapLocationId);
		if (!location?.data?.mapVersions) {
			setLocationMapImage(oldLocationMapImage);
			setLocationMapComponentsImage(oldLocationMapComponentsImage);
			return false;
		}

		const currentVersionIndex = location.data.mapVersions.findIndex((e) => e._id === mapVersionID);
		if (currentVersionIndex === -1 || currentVersionIndex === location.data.mapVersions.length - 1) {
			setLocationMapImage(oldLocationMapImage);
			setLocationMapComponentsImage(oldLocationMapComponentsImage);
			return false;
		}

		const newImage = locationMapImages?.find((e) => e?._id === location.data.mapVersions[currentVersionIndex + 1]?.mapImage)?.image;
		if (!newImage) {
			setLocationMapImage(oldLocationMapImage);
			return false;
		}

		locationsSurfaceMapLoadingCircleContainerRef.current.classList.remove("locations-surface-map-loading-circle-container-loaded");
		setMapVersionID(location.data.mapVersions[currentVersionIndex + 1]?._id);
		setTimeout(() => {
			locationsSurfaceMapLoadingCircleContainerRef.current.classList.add("locations-surface-map-loading-circle-container-loaded");
			setLocationMapImage(locationMapImages?.find((e) => e?._id === location.data.mapVersions[currentVersionIndex + 1]?.mapImage)?.image);
			setLocationMapComponentsImage(
				locationMapComponentsImages?.find((e) => e?._id === location.data.mapVersions[currentVersionIndex + 1]?.mapImageComponents)?.image
			);
		}, 200);
	}

	return { locations, currentMapLocationId, mapVersionID, decrementMapVersion, incrementMapVersion };
};
