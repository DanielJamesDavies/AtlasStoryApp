// Packages
import { useContext, useRef, useEffect, useState, useLayoutEffect } from "react";
import { sanitizeSVG } from "@skjnldsv/sanitize-svg";

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
		setLocationMapComponentsImages,
		locationMapImage,
		setLocationMapImage,
		locationMapComponentsImage,
		setLocationMapComponentsImage,
		setLocationMapImages,
		locationsSurfaceMapLoadingCircleContainerRef,
	} = useContext(LocationsContext);

	const { APIRequest } = useContext(APIContext);
	const { recentImages, addImagesToRecentImages } = useContext(RecentDataContext);

	const [isImagePixelated, setIsImagePixelated] = useState(false);
	const [areRegionsFilled, setAreRegionsFilled] = useState(true);
	const [isPanning, setIsPanning] = useState(false);
	const [isScrolling, setIsScrolling] = useState(false);
	const [regionNamesHTML, setRegionNamesHTML] = useState("");
	const [regionNamesTexts, setRegionNamesTexts] = useState("");
	const [surfaceMapPlaces, setSurfaceMapPlaces] = useState(null);

	const [isLoadingImages, setIsLoadingImages] = useState(true);
	const [lastTimeOfError, setLastTimeOfError] = useState(0);

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
		setAreRegionsFilled,
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
		isLoadingImages,
		setLastTimeOfError,
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

	useLayoutEffect(() => {
		async function getLocationMapImage() {
			if (JSON.stringify(currentLocationId.current) === JSON.stringify(currentMapLocationId)) return false;
			if (locations?.length === 0) return false;
			currentLocationId.current = JSON.parse(JSON.stringify(currentMapLocationId));

			locationsSurfaceMapLoadingCircleContainerRef.current.classList.remove("locations-surface-map-loading-circle-container-loaded");

			setLocationMapImage(false);
			setIsLoadingImages(true);

			const location = locations?.find((e) => e?._id === currentMapLocationId);
			const mapVersionID = location?.data?.mapVersions[0]?._id;

			const mapComponentsImages = await Promise.all(
				location?.data?.mapVersions?.map(async (mapVersion, index) => {
					let mapComponentsImage = false;

					if (!mapVersion?.mapImageComponents) return false;
					const map_image_response = await APIRequest("/image/" + mapVersion?.mapImageComponents, "GET");
					if (map_image_response?.errors || !map_image_response?.data?.image?.image) return false;
					mapComponentsImage = map_image_response?.data?.image;
					console.log("mapComponentsImage", { map_image_response, mapComponentsImage });

					if (index === 0)
						setLocationMapComponentsImage(
							mapComponentsImage?.image.split("https://")[0]?.length === 0
								? '<svg width="2000" height="1000" version="1.1" xmlns="http://www.w3.org/2000/svg"></svg>'
								: mapComponentsImage?.image
						);
					return { ...mapComponentsImage, ...{ version_id: mapVersion?._id } };
				})
			);

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

			setLocationMapComponentsImages(mapComponentsImages);
			setLocationMapImages(mapImages);
			setMapVersionID(mapVersionID);
			setIsLoadingImages(false);

			setTimeout(() => {
				locationsSurfaceMapLoadingCircleContainerRef.current.classList.add("locations-surface-map-loading-circle-container-loaded");
			}, 750);

			setTimeout(() => {
				surfaceMapImageNewComponentsRef?.current?.setAttribute("width", surfaceMapImageRef?.current?.clientWidth);
				surfaceMapImageNewComponentsRef?.current?.setAttribute("height", surfaceMapImageRef?.current?.clientHeight);
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
		locationsSurfaceMapLoadingCircleContainerRef,
		setLocationMapImages,
		lastTimeOfError,
	]);

	const [locationMapComponentsImageSanitized, setLocationMapComponentsImageSanitized] = useState(null);

	useLayoutEffect(() => {
		const get_sanitized_components_image = async () => {
			if (locationMapComponentsImage === false)
				return setLocationMapComponentsImageSanitized(
					'<svg width="2000" height="1000" version="1.1" xmlns="http://www.w3.org/2000/svg"></svg>'
				);
			const new_image =
				(await sanitizeSVG(locationMapComponentsImage)) ||
				'<svg width="2000" height="1000" version="1.1" xmlns="http://www.w3.org/2000/svg"></svg>';
			setLocationMapComponentsImageSanitized(new_image);
			setTimeout(() => {
				if (!surfaceMapImageComponentsContainerRef?.current?.children?.[0]?.children?.[0]) {
					setLocationMapComponentsImageSanitized(false);
					setTimeout(() => setLocationMapComponentsImageSanitized(new_image), 1);
				}
			}, 1);
		};
		get_sanitized_components_image();
	}, [locationMapComponentsImage, setLocationMapComponentsImageSanitized]);

	return {
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
		areRegionsFilled,
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
		locationsSurfaceMapLoadingCircleContainerRef,
		locationMapComponentsImageSanitized,
	};
};
