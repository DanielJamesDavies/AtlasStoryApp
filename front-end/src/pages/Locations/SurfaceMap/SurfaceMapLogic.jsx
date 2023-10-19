// Packages
import { useContext, useRef, useEffect, useState, useCallback } from "react";

// Components

// Logic

// Context
import { LocationsContext } from "../LocationsContext";
import { APIContext } from "../../../context/APIContext";
import { RecentDataContext } from "../../../context/RecentDataContext";

// Services

// Styles

// Assets

export const SurfaceMapLogic = () => {
	const { locations, currentMapLocationId } = useContext(LocationsContext);
	const { APIRequest } = useContext(APIContext);
	const { recentImages, addImagesToRecentImages } = useContext(RecentDataContext);
	const [locationMapImage, setLocationMapImage] = useState(false);
	const [isImagePixelated, setIsImagePixelated] = useState(false);
	const [isPanning, setIsPanning] = useState(false);

	const surfaceMapImageContainerRef = useRef();
	const surfaceMapImageRef = useRef();
	const surfaceMapImageComponentsContainerRef = useRef();
	var zoom = useRef(1);
	var panning = useRef(false);
	var pointX = useRef(0);
	var pointY = useRef(0);
	var startPos = useRef({ x: 0, y: 0 });
	var lastWindowWidth = useRef(0);

	useEffect(() => {
		lastWindowWidth.current = window.innerWidth;
	}, [lastWindowWidth]);

	const getDimensionsZoom = useCallback(() => {
		const width_zoom = window?.innerWidth / surfaceMapImageRef?.current?.clientWidth;
		const height_zoom = window?.innerHeight / surfaceMapImageRef?.current?.clientHeight;
		return { width_zoom, height_zoom };
	}, [surfaceMapImageRef]);

	const updatePointsForBounds = useCallback(() => {
		const max_mobile_width = 750;

		const { width_zoom, height_zoom } = getDimensionsZoom();
		zoom.current = Math.max(zoom.current, width_zoom, height_zoom);

		const imageContainerWidthDelta =
			((surfaceMapImageContainerRef?.current?.clientWidth - surfaceMapImageRef?.current?.clientWidth) * zoom.current) / 2;
		const max_pointX =
			window.innerWidth > max_mobile_width
				? surfaceMapImageRef?.current?.clientWidth * zoom.current - window.innerWidth - 1 * zoom.current
				: surfaceMapImageRef?.current?.clientWidth * zoom.current - window.innerWidth + imageContainerWidthDelta - 1 * zoom.current;

		const imageContainerHeightDelta =
			((surfaceMapImageContainerRef?.current?.clientHeight - surfaceMapImageRef?.current?.clientHeight) * zoom.current) / 2;
		const max_pointY =
			surfaceMapImageRef?.current?.clientHeight * zoom.current + imageContainerHeightDelta - window.innerHeight - 1 * zoom.current;

		// X Bounds
		if (pointX.current > 68 - 1 * zoom.current) pointX.current = 68 - 1 * zoom.current;
		if (window.innerWidth <= max_mobile_width && pointX.current > -imageContainerWidthDelta) pointX.current = -imageContainerWidthDelta;
		if (pointX.current < -max_pointX) pointX.current = -max_pointX;

		// Y Bounds
		if (pointY.current > -imageContainerHeightDelta - 1 * zoom.current) pointY.current = -imageContainerHeightDelta - 1 * zoom.current;
		if (pointY.current < -max_pointY && window.innerWidth > max_mobile_width) pointY.current = -max_pointY;
		if (window.innerWidth <= max_mobile_width && pointY.current < -max_pointY - 58) pointY.current = -max_pointY - 58;
	}, [getDimensionsZoom]);

	const currentLocationId = useRef(false);
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
			setTimeout(() => {
				try {
					const { width_zoom, height_zoom } = getDimensionsZoom();
					zoom.current = Math.max(width_zoom, height_zoom);
					pointX.current = -(surfaceMapImageContainerRef?.current?.clientWidth - surfaceMapImageRef?.current?.clientWidth) * zoom.current;
					pointY.current =
						-((surfaceMapImageContainerRef?.current?.clientHeight - surfaceMapImageRef?.current?.clientHeight) * zoom.current) / 2;
					updatePointsForBounds();
					surfaceMapImageContainerRef.current.style.transform =
						"translate(" + pointX.current + "px, " + pointY.current + "px) scale(" + zoom.current + ")";
				} catch {}
			}, 100);

			setLocationMapImage(mapImage?.image);

			setTimeout(() => {
				if (!surfaceMapImageComponentsContainerRef.current?.children) return false;

				const svg_width = surfaceMapImageComponentsContainerRef.current?.children[0].getAttribute("width");
				const image_width = surfaceMapImageRef?.current?.clientWidth;
				const image_height = surfaceMapImageRef?.current?.clientHeight;

				const max_component_width = Math.floor(image_width * (zoom.current / 1)) - 2;
				const max_component_height = Math.floor(image_height * (zoom.current / 1)) - 2;

				Array.from(surfaceMapImageComponentsContainerRef?.current?.children[0]?.children)?.map((path) => {
					let { width, height } = path.getClientRects()[0];
					width *= image_width / svg_width;
					height *= image_width / svg_width;

					if (width > max_component_width && height > max_component_height) {
						path.classList.add("locations-surface-map-image-component-delete");
					} else if (JSON.stringify(path.getAttribute("fill")) !== JSON.stringify("rgb(255,255,255)")) {
						path.classList.add("locations-surface-map-image-component-delete");
					} else {
						path.classList.add("locations-surface-map-image-component-active");
					}
					return true;
				});
				Array.from(document.getElementsByClassName("locations-surface-map-image-component-delete")).map((path) => path.remove());

				const imageContainerWidthDelta =
					((surfaceMapImageContainerRef?.current?.clientWidth - surfaceMapImageRef?.current?.clientWidth) * zoom.current) / 2;
				let surfaceMapImageComponentsContainerStyles = [`scale: ${image_width / svg_width}`, `margin-top: -2px`];
				if (window?.innerWidth > 750)
					surfaceMapImageComponentsContainerStyles.push(`margin-left: ${-1 * (imageContainerWidthDelta * (1 / zoom.current) + 1.5)}px`);
				surfaceMapImageComponentsContainerRef.current.style = surfaceMapImageComponentsContainerStyles.join("; ");
			}, 100);
		}
		getLocationMapImage();
	}, [
		locations,
		currentMapLocationId,
		setLocationMapImage,
		currentLocationId,
		APIRequest,
		recentImages,
		addImagesToRecentImages,
		surfaceMapImageRef,
		updatePointsForBounds,
		getDimensionsZoom,
	]);

	window.addEventListener("resize", () => {
		zoom.current *= lastWindowWidth.current / window.innerWidth;
		const { width_zoom, height_zoom } = getDimensionsZoom();
		zoom.current = Math.max(zoom.current, width_zoom, height_zoom);
		updatePointsForBounds();
		if (surfaceMapImageContainerRef.current?.style) {
			surfaceMapImageContainerRef.current.style.transform =
				"translate(" + pointX.current + "px, " + pointY.current + "px) scale(" + zoom.current + ")";
		} else {
			setTimeout(() => {
				if (surfaceMapImageContainerRef.current?.style) {
					surfaceMapImageContainerRef.current.style.transform =
						"translate(" + pointX.current + "px, " + pointY.current + "px) scale(" + zoom.current + ")";
				}
			}, 2);
		}

		const imageContainerWidthDelta =
			((surfaceMapImageContainerRef?.current?.clientWidth - surfaceMapImageRef?.current?.clientWidth) * zoom.current) / 2;
		const svg_width = surfaceMapImageComponentsContainerRef.current.children[0].getAttribute("width");
		const image_width = surfaceMapImageRef?.current?.clientWidth;
		let surfaceMapImageComponentsContainerStyles = [`scale: ${image_width / svg_width}`, `margin-top: -2px`];
		if (window?.innerWidth > 750)
			surfaceMapImageComponentsContainerStyles.push(`margin-left: ${-1 * (imageContainerWidthDelta * (1 / zoom.current) + 1.5)}px`);
		surfaceMapImageComponentsContainerRef.current.style = surfaceMapImageComponentsContainerStyles.join("; ");

		lastWindowWidth.current = window.innerWidth;
	});

	useEffect(() => {
		zoom.current = 1;
		panning.current = false;
		pointX.current = 0;
		pointY.current = 0;

		const surfaceMapImageContainerRefCurrent = surfaceMapImageContainerRef.current;
		if (surfaceMapImageContainerRef?.current) {
			surfaceMapImageContainerRefCurrent.style.transform =
				"translate(" + pointX.current + "px, " + pointY.current + "px) scale(" + zoom.current + ")";
			surfaceMapImageContainerRefCurrent.addEventListener("mousedown", imageSurfaceMapOnMouseDown);
			surfaceMapImageContainerRefCurrent.addEventListener("mouseup", imageSurfaceMapOnMouseUp);
			surfaceMapImageContainerRefCurrent.addEventListener("mouseout", imageSurfaceMapOnMouseUp);
			surfaceMapImageContainerRefCurrent.addEventListener("mousemove", imageSurfaceMapOnMouseMove);
			surfaceMapImageContainerRefCurrent.addEventListener("wheel", imageSurfaceMapOnWheel);
		}
		return () => {
			if (surfaceMapImageContainerRefCurrent) {
				surfaceMapImageContainerRefCurrent.removeEventListener("mousedown", imageSurfaceMapOnMouseDown);
				surfaceMapImageContainerRefCurrent.removeEventListener("mouseup", imageSurfaceMapOnMouseUp);
				surfaceMapImageContainerRefCurrent.removeEventListener("mouseout", imageSurfaceMapOnMouseUp);
				surfaceMapImageContainerRefCurrent.removeEventListener("mousemove", imageSurfaceMapOnMouseMove);
				surfaceMapImageContainerRefCurrent.removeEventListener("wheel", imageSurfaceMapOnWheel);
			}
		};
		// eslint-disable-next-line
	}, [surfaceMapImageContainerRef, locationMapImage, zoom, panning, pointX, pointY]);

	function imageSurfaceMapOnMouseDown(e) {
		e.preventDefault();
		startPos = { x: e.clientX - pointX.current, y: e.clientY - pointY.current };
		panning.current = true;
		setIsPanning(true);
	}

	function imageSurfaceMapOnMouseUp() {
		panning.current = false;
		setIsPanning(false);
	}

	function imageSurfaceMapOnMouseMove(e) {
		e.preventDefault();
		if (!panning.current) return;
		pointX.current = e.clientX - startPos.x;
		pointY.current = e.clientY - startPos.y;

		updatePointsForBounds();

		surfaceMapImageContainerRef.current.style.transform =
			"translate(" + pointX.current + "px, " + pointY.current + "px) scale(" + zoom.current + ")";
	}

	function imageSurfaceMapOnWheel(e) {
		e.stopPropagation();
		e.preventDefault();

		const prev_pointX = JSON.parse(JSON.stringify(pointX.current));
		const prev_pointY = JSON.parse(JSON.stringify(pointY.current));
		const prev_zoom = JSON.parse(JSON.stringify(zoom.current));

		let xs = (e.clientX - pointX.current) / zoom.current;
		let ys = (e.clientY - pointY.current) / zoom.current;
		let delta = e.wheelDelta ? e.wheelDelta : -e.deltaY;

		if (Math.sign(delta) === 1) {
			zoom.current *= 1.2;
		} else {
			zoom.current /= 1.2;
		}

		setIsImagePixelated(zoom.current > 3);

		if (zoom.current <= 1) {
			zoom.current = 1;
			pointX.current = -(surfaceMapImageContainerRef?.current?.clientWidth - surfaceMapImageRef?.current?.clientWidth) * zoom.current;
			pointY.current = 0;
		} else if (zoom.current >= 40) {
			zoom.current = 40;
			pointX.current = e.clientX - xs * zoom.current;
			pointY.current = e.clientY - ys * zoom.current;
		} else {
			pointX.current = e.clientX - xs * zoom.current;
			pointY.current = e.clientY - ys * zoom.current;
		}

		const { width_zoom, height_zoom } = getDimensionsZoom();

		zoom.current = Math.max(zoom.current, width_zoom, height_zoom);

		updatePointsForBounds();

		if (zoom.current === Math.max(width_zoom, height_zoom) && prev_zoom <= zoom.current) {
			pointX.current = prev_pointX;
			pointY.current = prev_pointY;
		}

		updatePointsForBounds();

		surfaceMapImageContainerRef.current.style.transform =
			"translate(" + pointX.current + "px, " + pointY.current + "px) scale(" + zoom.current + ")";
	}

	const surfaceMapContainerRef = useRef();

	useEffect(() => {
		function onGesture(e) {
			e.preventDefault();
			e.stopPropagation();
			document.body.style.zoom = 0.99;
		}

		const surfaceMapContainerRefCurrent = surfaceMapContainerRef?.current;
		if (surfaceMapContainerRefCurrent) {
			surfaceMapContainerRefCurrent.addEventListener("gesturestart", onGesture);
			surfaceMapContainerRefCurrent.addEventListener("gesturechange", onGesture);
			surfaceMapContainerRefCurrent.addEventListener("gestureend", onGesture);
		}

		return () => {
			if (surfaceMapContainerRefCurrent) {
				surfaceMapContainerRefCurrent.removeEventListener("gesturestart", onGesture);
				surfaceMapContainerRefCurrent.removeEventListener("gesturechange", onGesture);
				surfaceMapContainerRefCurrent.removeEventListener("gestureend", onGesture);
			}
		};
	}, [surfaceMapContainerRef, surfaceMapImageContainerRef]);

	let prevDist = useRef(false);
	// eslint-disable-next-line
	const [points, setPoints] = useState(false);
	let startCoords = useRef({ centerX: false, centerY: false });

	function onTouchStart(e) {
		e.stopPropagation();

		if (e.touches.length === 1) {
			startPos = { x: e.touches[0].pageX - pointX.current, y: e.touches[0].pageY - pointY.current };
		} else if (e.touches.length === 2) {
			startPos = { x: e.touches[0].pageX - pointX.current, y: e.touches[0].pageY - pointY.current };
			prevDist.current = false;
			startCoords.centerX = Math.min(e.touches[0].pageX, e.touches[1].pageX) + Math.abs(e.touches[0].pageX - e.touches[1].pageX) / 2;
			startCoords.centerY = Math.min(e.touches[0].pageY, e.touches[1].pageY) + Math.abs(e.touches[0].pageY - e.touches[1].pageY) / 2;
		} else {
			startPos = { x: e.touches[0].pageX - pointX.current, y: e.touches[0].pageY - pointY.current };
		}
	}

	function onTouchMove(e) {
		if (e.touches.length === 1) {
			const newPointX = e.touches[0].pageX - startPos.x;
			const newPointY = e.touches[0].pageY - startPos.y;
			if (Number.isNaN(newPointX) || Number.isNaN(newPointY)) return;
			pointX.current = newPointX;
			pointY.current = newPointY;
		} else if (e.touches.length === 2) {
			const prev_pointX = JSON.parse(JSON.stringify(pointX.current));
			const prev_pointY = JSON.parse(JSON.stringify(pointY.current));

			let xs = (startCoords.centerX - pointX.current) / zoom.current;
			let ys = (startCoords.centerY - pointY.current) / zoom.current;

			let dist = Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY);

			if (prevDist.current === false) prevDist.current = dist;

			let diffDist = prevDist.current - dist;

			zoom.current -= diffDist * zoom.current * 0.006;
			setIsImagePixelated(zoom.current > 3);

			const width_zoom = window?.innerWidth / surfaceMapImageRef?.current?.clientWidth;
			const height_zoom = window?.innerHeight / surfaceMapImageRef?.current?.clientHeight;

			if (zoom.current <= 1) {
				zoom.current = Math.max(1, width_zoom, height_zoom);
				pointX.current = 0;
				pointY.current = 0;
			} else if (zoom.current >= 50) {
				zoom.current = 50;
				pointX.current = startCoords.centerX - xs * zoom.current;
				pointY.current = startCoords.centerY - ys * zoom.current;
			} else {
				pointX.current = startCoords.centerX - xs * zoom.current;
				pointY.current = startCoords.centerY - ys * zoom.current;
			}

			if (zoom.current === Math.max(width_zoom, height_zoom)) {
				pointX.current = prev_pointX;
				pointY.current = prev_pointY;
			}

			setPoints({ pointX: pointX.current, pointY: pointY.current });

			prevDist.current = Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY);
		}

		updatePointsForBounds();

		surfaceMapImageContainerRef.current.style.transform =
			"translate(" + pointX.current + "px, " + pointY.current + "px) scale(" + zoom.current + ")";
	}

	var movementInterval = useRef(false);
	function enterMovementBox(delta_x, delta_y) {
		movementInterval.current = setInterval(() => {
			const max_zoom_multiplier = 15;
			pointX.current += -delta_x * Math.min(max_zoom_multiplier, zoom.current * 1.5);
			pointY.current += -delta_y * Math.min(max_zoom_multiplier, zoom.current * 1.5);

			updatePointsForBounds();

			surfaceMapImageContainerRef.current.style.transform =
				"translate(" + pointX.current + "px, " + pointY.current + "px) scale(" + zoom.current + ")";
		}, 1);
	}

	function leaveMovementBox() {
		if (movementInterval.current !== false) {
			clearInterval(movementInterval.current);
			movementInterval.current = false;
		}
	}

	return {
		locations,
		currentMapLocationId,
		surfaceMapContainerRef,
		surfaceMapImageContainerRef,
		surfaceMapImageComponentsContainerRef,
		surfaceMapImageRef,
		locationMapImage,
		onTouchStart,
		onTouchMove,
		isImagePixelated,
		enterMovementBox,
		leaveMovementBox,
		isPanning,
	};
};
