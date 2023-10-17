// Packages
import { useContext, useRef, useEffect, useState } from "react";

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

	const surfaceMapImageContainerRef = useRef();
	var zoom = useRef(1);
	var panning = useRef(false);
	var pointX = useRef(0);
	var pointY = useRef(0);
	var startPos = useRef({ x: 0, y: 0 });

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
					zoom.current = 1.1;
					surfaceMapImageContainerRef.current.style.transform =
						"translate(" + pointX.current + "px, " + pointY.current + "px) scale(" + zoom.current + ")";
				} catch {}
			}, 100);
			setLocationMapImage(mapImage?.image);
		}
		getLocationMapImage();
	}, [locations, currentMapLocationId, setLocationMapImage, currentLocationId, APIRequest, recentImages, addImagesToRecentImages]);

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
	}, [surfaceMapImageContainerRef, locationMapImage, zoom, panning, pointX, pointY]);

	function imageSurfaceMapOnMouseDown(e) {
		e.preventDefault();
		startPos = { x: e.clientX - pointX.current, y: e.clientY - pointY.current };
		panning.current = true;
	}

	function imageSurfaceMapOnMouseUp() {
		panning.current = false;
	}

	function imageSurfaceMapOnMouseMove(e) {
		e.preventDefault();
		if (!panning.current) return;
		pointX.current = e.clientX - startPos.x;
		pointY.current = e.clientY - startPos.y;
		surfaceMapImageContainerRef.current.style.transform =
			"translate(" + pointX.current + "px, " + pointY.current + "px) scale(" + zoom.current + ")";
	}

	function imageSurfaceMapOnWheel(e) {
		e.stopPropagation();
		e.preventDefault();

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
			pointX.current = 0;
			pointY.current = 0;
		} else if (zoom.current >= 40) {
			zoom.current = 40;
			pointX.current = e.clientX - xs * zoom.current;
			pointY.current = e.clientY - ys * zoom.current;
		} else {
			pointX.current = e.clientX - xs * zoom.current;
			pointY.current = e.clientY - ys * zoom.current;
			surfaceMapImageContainerRef.current.style.transform =
				"translate(" + pointX.current + "px, " + pointY.current + "px) scale(" + zoom.current + ")";
		}

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
			let xs = (startCoords.centerX - pointX.current) / zoom.current;
			let ys = (startCoords.centerY - pointY.current) / zoom.current;

			let dist = Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY);

			if (prevDist.current === false) prevDist.current = dist;

			let diffDist = prevDist.current - dist;

			zoom.current -= diffDist * zoom.current * 0.006;
			setIsImagePixelated(zoom.current > 3);

			if (zoom.current <= 1) {
				zoom.current = 1;
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

			setPoints({ pointX: pointX.current, pointY: pointY.current });

			prevDist.current = Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY);
		}

		surfaceMapImageContainerRef.current.style.transform =
			"translate(" + pointX.current + "px, " + pointY.current + "px) scale(" + zoom.current + ")";
	}

	return { surfaceMapContainerRef, surfaceMapImageContainerRef, locationMapImage, onTouchStart, onTouchMove, isImagePixelated };
};
