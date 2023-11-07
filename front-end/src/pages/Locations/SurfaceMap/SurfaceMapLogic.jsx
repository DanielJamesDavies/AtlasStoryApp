// Packages
import { useContext, useRef, useEffect, useState } from "react";

// Components

// Logic
import { SurfaceMapMovementLogic } from "./SurfaceMapMovementLogic";
import { SurfaceMapRegionsLogic } from "./SurfaceMapRegionsLogic";
import { SurfaceMapComponentsLogic } from "./SurfaceMapComponentsLogic";

// Context
import { LocationsContext } from "../LocationsContext";
import { APIContext } from "../../../context/APIContext";
import { RecentDataContext } from "../../../context/RecentDataContext";
import { SurfaceMapPlacesLogic } from "./SurfaceMapPlacesLogic";

// Services

// Styles

// Assets

export const SurfaceMapLogic = () => {
	const {
		locations,
		currentMapLocationId,
		isSelectingSurfaceMapComponents,
		isDeletingSurfaceMapComponents,
		isPositioningSurfaceMapPlace,
		mapVersionID,
		setMapVersionID,
		locationMapComponentsImages,
		setLocationMapComponentsImages,
	} = useContext(LocationsContext);

	const { APIRequest } = useContext(APIContext);
	const { recentImages, addImagesToRecentImages } = useContext(RecentDataContext);
	const [locationMapImage, setLocationMapImage] = useState(false);
	const [locationMapComponentsImage, setLocationMapComponentsImage] = useState(false);
	const [locationMapImages, setLocationMapImages] = useState(false);

	const [isImagePixelated, setIsImagePixelated] = useState(false);
	const [isPanning, setIsPanning] = useState(false);
	const [isScrolling, setIsScrolling] = useState(false);
	const [regionNamesHTML, setRegionNamesHTML] = useState("");
	const [regionNamesTexts, setRegionNamesTexts] = useState("");
	const [surfaceMapPlaces, setSurfaceMapPlaces] = useState(null);

	const surfaceMapContainerRef = useRef();
	const surfaceMapImageContainerRef = useRef();
	const surfaceMapImageRef = useRef();
	const surfaceMapImageComponentsContainerRef = useRef();
	const surfaceMapImageDisplayComponentsContainerRef = useRef();
	const surfaceMapImageRegionsNamesRef = useRef();
	const surfaceMapImageRegionsNamesTextsRef = useRef();
	const surfaceMapDrawingShapeRef = useRef();
	const surfaceMapImageNewComponentsRef = useRef();
	const surfaceMapPositioningPlaceRef = useRef();
	const locationsSurfaceMapLoadingCircleContainerRef = useRef();

	const currentLocationId = useRef(false);
	var regionClusters = useRef();

	var zoom = useRef(1);
	var panning = useRef(false);
	var pointX = useRef(0);
	var pointY = useRef(0);
	var startPos = useRef({ x: 0, y: 0 });
	var lastWindowWidth = useRef(0);
	const max_mobile_width = 750;

	const { onTouchStart, onTouchMove, enterMovementBox, leaveMovementBox, onMovementBoxWheel, getDimensionsZoom } = SurfaceMapMovementLogic({
		surfaceMapContainerRef,
		surfaceMapImageContainerRef,
		surfaceMapImageComponentsContainerRef,
		surfaceMapImageRef,
		pointX,
		pointY,
		zoom,
		startPos,
		setIsImagePixelated,
		panning,
		setIsPanning,
		setIsScrolling,
		locationMapImage,
		max_mobile_width,
	});

	SurfaceMapRegionsLogic({
		locationMapImage,
		surfaceMapImageRef,
		surfaceMapImageComponentsContainerRef,
		surfaceMapImageContainerRef,
		surfaceMapImageRegionsNamesRef,
		surfaceMapImageRegionsNamesTextsRef,
		zoom,
		regionClusters,
		currentLocationId,
		setRegionNamesTexts,
		setRegionNamesHTML,
		getDimensionsZoom,
		max_mobile_width,
		mapVersionID,
	});

	SurfaceMapPlacesLogic({
		surfaceMapContainerRef,
		surfaceMapImageRef,
		surfaceMapImageContainerRef,
		surfaceMapPositioningPlaceRef,
		setSurfaceMapPlaces,
		zoom,
		pointX,
		pointY,
		mapVersionID,
	});

	const { surfaceMapImageDisplayComponents, surfaceMapImageComponentsStyles } = SurfaceMapComponentsLogic({
		surfaceMapImageContainerRef,
		surfaceMapImageComponentsContainerRef,
		surfaceMapImageDisplayComponentsContainerRef,
		surfaceMapImageRef,
		surfaceMapDrawingShapeRef,
		surfaceMapImageNewComponentsRef,
		zoom,
		pointX,
		pointY,
		locationMapImage,
		mapVersionID,
		locationMapComponentsImage,
		setLocationMapComponentsImage,
		setLocationMapComponentsImages,
	});

	useEffect(() => {
		lastWindowWidth.current = window.innerWidth;
	}, [lastWindowWidth]);

	useEffect(() => {
		async function getLocationMapImage() {
			if (JSON.stringify(currentLocationId.current) === JSON.stringify(currentMapLocationId)) return false;
			if (locations?.length === 0) return false;
			currentLocationId.current = JSON.parse(JSON.stringify(currentMapLocationId));

			setLocationMapImage(false);

			const location = locations?.find((e) => e?._id === currentMapLocationId);
			const mapVersionID = location?.data?.mapVersions[0]?._id;

			setMapVersionID(mapVersionID);

			const mapComponentsImages = await Promise.all(
				location?.data?.mapVersions?.map(async (mapVersion, index) => {
					let mapComponentsImage = false;

					if (!mapVersion?.mapImageComponents) return false;
					const map_image_response = await APIRequest("/image/" + mapVersion?.mapImageComponents, "GET");
					if (map_image_response?.errors || !map_image_response?.data?.image?.image) return false;
					mapComponentsImage = map_image_response?.data?.image;

					if (index === 0) setLocationMapComponentsImage(mapComponentsImage?.image);
					return { ...mapComponentsImage, ...{ version_id: mapVersion?._id } };
				})
			);

			setLocationMapComponentsImages(mapComponentsImages);

			const mapImages = await Promise.all(
				location?.data?.mapVersions?.map(async (mapVersion, index) => {
					let mapImage = false;

					if (!mapVersion?.mapImage) return false;
					const recentImage = recentImages.current.find((e) => e?._id === mapVersion?.mapImage);
					if (recentImage?.image) {
						mapImage = recentImage;
					} else {
						const map_image_response = await APIRequest("/image/" + mapVersion?.mapImage, "GET");
						if (map_image_response?.errors || !map_image_response?.data?.image?.image) return false;
						mapImage = map_image_response?.data?.image;

						addImagesToRecentImages([mapImage]);
					}

					if (index === 0) setLocationMapImage(mapImage?.image);
					return mapImage;
				})
			);

			setLocationMapImages(mapImages);

			locationsSurfaceMapLoadingCircleContainerRef.current.classList.add("locations-surface-map-loading-circle-container-loaded");

			setTimeout(() => {
				surfaceMapImageNewComponentsRef?.current.setAttribute("width", surfaceMapImageRef?.current?.clientWidth);
				surfaceMapImageNewComponentsRef?.current.setAttribute("height", surfaceMapImageRef?.current?.clientHeight);
			}, 1200);

			lastWindowWidth.current = window.innerWidth;
		}
		getLocationMapImage();
	}, [
		locations,
		currentMapLocationId,
		setLocationMapImage,
		currentLocationId,
		APIRequest,
		addImagesToRecentImages,
		recentImages,
		setMapVersionID,
		setLocationMapComponentsImage,
		setLocationMapComponentsImages,
	]);

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

	return {
		locations,
		currentMapLocationId,
		surfaceMapContainerRef,
		surfaceMapImageContainerRef,
		surfaceMapImageRef,
		surfaceMapImageComponentsContainerRef,
		surfaceMapImageDisplayComponentsContainerRef,
		surfaceMapImageRegionsNamesRef,
		surfaceMapImageRegionsNamesTextsRef,
		surfaceMapDrawingShapeRef,
		surfaceMapImageNewComponentsRef,
		locationMapImage,
		onTouchStart,
		onTouchMove,
		isImagePixelated,
		enterMovementBox,
		leaveMovementBox,
		isPanning,
		isScrolling,
		isSelectingSurfaceMapComponents,
		isDeletingSurfaceMapComponents,
		surfaceMapImageDisplayComponents,
		surfaceMapImageComponentsStyles,
		onMovementBoxWheel,
		regionNamesHTML,
		regionNamesTexts,
		surfaceMapPositioningPlaceRef,
		surfaceMapPlaces,
		isPositioningSurfaceMapPlace,
		mapVersionID,
		decrementMapVersion,
		incrementMapVersion,
		locationsSurfaceMapLoadingCircleContainerRef,
		locationMapComponentsImage,
	};
};
