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
		selectedLocationId,
		setSelectedLocationId,
		setIsDisplayingHierarchy,
		isPositioningSurfaceMapPlace,
	} = useContext(LocationsContext);

	const { APIRequest } = useContext(APIContext);
	const { recentImages, addImagesToRecentImages } = useContext(RecentDataContext);
	const [locationMapImage, setLocationMapImage] = useState(false);
	const [isImagePixelated, setIsImagePixelated] = useState(false);
	const [isPanning, setIsPanning] = useState(false);
	const [isScrolling, setIsScrolling] = useState(false);
	const [regionNamesHTML, setRegionNamesHTML] = useState("");
	const [regionNamesTexts, setRegionNamesTexts] = useState("");

	const loadingCircleContainerLoadedRef = useRef();
	const surfaceMapContainerRef = useRef();
	const surfaceMapImageContainerRef = useRef();
	const surfaceMapImageRef = useRef();
	const surfaceMapImageComponentsContainerRef = useRef();
	const surfaceMapImageDisplayComponentsContainerRef = useRef();
	const surfaceMapImageRegionsNamesRef = useRef();
	const surfaceMapImageRegionsNamesTextsRef = useRef();
	const surfaceMapDrawingShapeRef = useRef();
	const surfaceMapImageNewComponentsRef = useRef();
	const surfaceMapPlacesRef = useRef();
	const surfaceMapPositioningPlaceRef = useRef();
	const [surfaceMapPlaces, setSurfaceMapPlaces] = useState(null);

	const currentLocationId = useRef(false);
	var regionClusters = useRef();

	var zoom = useRef(1);
	var panning = useRef(false);
	var pointX = useRef(0);
	var pointY = useRef(0);
	var startPos = useRef({ x: 0, y: 0 });
	var lastWindowWidth = useRef(0);

	const { updateRegionsNames } = SurfaceMapRegionsLogic({
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
	});

	SurfaceMapPlacesLogic({
		surfaceMapContainerRef,
		surfaceMapPlacesRef,
		surfaceMapPositioningPlaceRef,
		setSurfaceMapPlaces,
		zoom,
		pointX,
		pointY,
	});

	const { surfaceMapImageDisplayComponents, surfaceMapImageComponentsStyles } = SurfaceMapComponentsLogic({
		surfaceMapContainerRef,
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
	});

	const { onTouchStart, onTouchMove, enterMovementBox, leaveMovementBox, onMovementBoxWheel } = SurfaceMapMovementLogic({
		surfaceMapContainerRef,
		surfaceMapImageContainerRef,
		surfaceMapImageComponentsContainerRef,
		surfaceMapImageRef,
		pointX,
		pointY,
		zoom,
		startPos,
		updateRegionsNames,
		setIsImagePixelated,
		panning,
		setIsPanning,
		setIsScrolling,
		locationMapImage,
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

			const mapImageID = locations?.find((e) => e?._id === currentMapLocationId)?.data?.mapImage;
			let mapImage = false;

			if (mapImageID) {
				const recentImage = recentImages.current.find((e) => e?._id === mapImageID);
				if (recentImage?.image) {
					mapImage = recentImage;
				} else {
					const map_image_response = await APIRequest("/image/" + mapImageID, "GET");
					if (map_image_response?.errors || !map_image_response?.data?.image?.image) return false;
					mapImage = map_image_response?.data?.image;

					addImagesToRecentImages([mapImage]);
				}

				setLocationMapImage(mapImage?.image);
			}

			setTimeout(() => {
				loadingCircleContainerLoadedRef.current.style = `animation: none; opacity: 1`;
				loadingCircleContainerLoadedRef.current.children[0].style = `opacity: 1`;
				loadingCircleContainerLoadedRef.current.classList.remove("locations-surface-map-loading-circle-container-loaded");
			}, 1);
			setTimeout(() => {
				loadingCircleContainerLoadedRef.current.style = ``;
				loadingCircleContainerLoadedRef.current.children[0].style = ``;
				loadingCircleContainerLoadedRef.current.classList.add("locations-surface-map-loading-circle-container-loaded");

				surfaceMapImageNewComponentsRef.current.setAttribute("width", surfaceMapImageRef?.current?.clientWidth);
				surfaceMapImageNewComponentsRef.current.setAttribute("height", surfaceMapImageRef?.current?.clientHeight);
			}, 1200);

			lastWindowWidth.current = window.innerWidth;
		}
		getLocationMapImage();
	}, [locations, currentMapLocationId, setLocationMapImage, currentLocationId, APIRequest, addImagesToRecentImages, recentImages]);

	return {
		locations,
		currentMapLocationId,
		loadingCircleContainerLoadedRef,
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
		surfaceMapImageDisplayComponents,
		surfaceMapImageComponentsStyles,
		onMovementBoxWheel,
		selectedLocationId,
		setSelectedLocationId,
		setIsDisplayingHierarchy,
		regionNamesHTML,
		regionNamesTexts,
		surfaceMapPlacesRef,
		surfaceMapPositioningPlaceRef,
		surfaceMapPlaces,
		isPositioningSurfaceMapPlace,
	};
};
