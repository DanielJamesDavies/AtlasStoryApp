// Packages
import { useContext, useRef, useEffect, useState, useCallback } from "react";

// Components

// Logic
import { SurfaceMapMovementLogic } from "./SurfaceMapMovementLogic";
import { SurfaceMapRegionsLogic } from "./SurfaceMapRegionsLogic";
import { SurfaceMapComponentsLogic } from "./SurfaceMapComponentsLogic";

// Context
import { LocationsContext } from "../LocationsContext";
import { APIContext } from "../../../context/APIContext";
import { RecentDataContext } from "../../../context/RecentDataContext";

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
	} = useContext(LocationsContext);

	const { APIRequest } = useContext(APIContext);
	const { recentImages, addImagesToRecentImages } = useContext(RecentDataContext);
	const [locationMapImage, setLocationMapImage] = useState(false);
	const [isImagePixelated, setIsImagePixelated] = useState(false);
	const [isPanning, setIsPanning] = useState(false);
	const [isScrolling, setIsScrolling] = useState(false);
	const [regionNamesHTML, setRegionNamesHTML] = useState("");
	const [regionNamesTexts, setRegionNamesTexts] = useState("");

	const surfaceMapImageContainerRef = useRef();
	const surfaceMapImageRef = useRef();
	const surfaceMapImageComponentsContainerRef = useRef();
	const surfaceMapImageRegionsNamesRef = useRef();
	const surfaceMapImageRegionsNamesTextsRef = useRef();

	const currentLocationId = useRef(false);
	var regionClusters = useRef();

	var zoom = useRef(1);
	var panning = useRef(false);
	var pointX = useRef(0);
	var pointY = useRef(0);
	var startPos = useRef({ x: 0, y: 0 });
	var lastWindowWidth = useRef(0);

	const {} = SurfaceMapMovementLogic();

	const {} = SurfaceMapRegionsLogic({
		surfaceMapImageRef,
		surfaceMapImageComponentsContainerRef,
		surfaceMapImageRegionsNamesRef,
		surfaceMapImageRegionsNamesTextsRef,
		zoom,
		regionClusters,
		currentLocationId,
		setRegionNamesTexts,
		setRegionNamesHTML,
	});

	const {} = SurfaceMapComponentsLogic({ surfaceMapImageComponentsContainerRef });

	useEffect(() => {
		lastWindowWidth.current = window.innerWidth;
	}, [lastWindowWidth]);

	useEffect(() => {
		async function getLocationMapImage() {
			if (JSON.stringify(currentLocationId.current) === JSON.stringify(currentMapLocationId)) return false;
			if (locations?.length === 0) return false;
			currentLocationId.current = JSON.parse(JSON.stringify(currentMapLocationId));

			const mapImageID = locations?.find((e) => e?._id === currentMapLocationId)?.data?.mapImage;
			let mapImage = false;

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

			lastWindowWidth.current = window.innerWidth;
		}
		getLocationMapImage();
	}, [locations, currentMapLocationId, setLocationMapImage, currentLocationId]);

	return {
		locations,
		currentMapLocationId,
		surfaceMapContainerRef,
		surfaceMapImageContainerRef,
		surfaceMapImageRef,
		surfaceMapImageComponentsContainerRef,
		surfaceMapImageRegionsNamesRef,
		surfaceMapImageRegionsNamesTextsRef,
		locationMapImage,
		onTouchStart,
		onTouchMove,
		isImagePixelated,
		enterMovementBox,
		leaveMovementBox,
		isPanning,
		isScrolling,
		isSelectingSurfaceMapComponents,
		surfaceMapImageComponentsStyles,
		onMovementBoxWheel,
		selectedLocationId,
		setSelectedLocationId,
		setIsDisplayingHierarchy,
		regionNamesHTML,
		regionNamesTexts,
	};
};
