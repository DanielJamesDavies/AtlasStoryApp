// Packages
import { useRef, useEffect, useState, useCallback, useContext } from "react";

// Components

// Logic

// Context
import { LocationsContext } from "../LocationsContext";

// Services

// Styles

// Assets

export const SurfaceMapMovementLogic = ({
	surfaceMapContainerRef,
	surfaceMapImageContainerRef,
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
}) => {
	const { isDisplayingHierarchy, isDrawingSurfaceMapComponents } = useContext(LocationsContext);

	const isDisplayingHierarchyValue = useRef();

	const max_mobile_width = 750;

	const getDimensionsZoom = useCallback(() => {
		let width_zoom = window?.innerWidth / surfaceMapImageRef?.current?.clientWidth;
		let height_zoom = window?.innerHeight / surfaceMapImageRef?.current?.clientHeight;
		if (window.innerWidth <= max_mobile_width) height_zoom = (window?.innerHeight - 58) / surfaceMapImageRef?.current?.clientHeight;
		return { width_zoom, height_zoom };
	}, [surfaceMapImageRef]);

	const updateSurfaceMapContainerStyle = useCallback(() => {
		const imageContainerHeightDelta =
			((surfaceMapImageContainerRef?.current?.clientHeight - surfaceMapImageRef?.current?.clientHeight) * zoom.current) / 2;
		surfaceMapContainerRef.current.style = `--zoom: ${zoom.current}; --min_y: ${-imageContainerHeightDelta - 1 * zoom.current}`;
	}, [zoom, surfaceMapImageContainerRef, surfaceMapImageRef, surfaceMapContainerRef]);

	const updatePointsForBounds = useCallback(() => {
		const { width_zoom, height_zoom } = getDimensionsZoom();
		zoom.current = Math.max(zoom.current, width_zoom, height_zoom);

		let max_pointX = surfaceMapImageRef?.current?.clientWidth * zoom.current - window.innerWidth - 1 * zoom.current;

		const imageContainerHeightDelta =
			((surfaceMapImageContainerRef?.current?.clientHeight - surfaceMapImageRef?.current?.clientHeight) * zoom.current) / 2;
		const max_pointY =
			surfaceMapImageRef?.current?.clientHeight * zoom.current + imageContainerHeightDelta - window.innerHeight - 1 * zoom.current;

		const menuWidth = Math.min(window.innerWidth, 800) - 44 - 10;
		if (isDisplayingHierarchyValue.current) max_pointX += menuWidth;

		// X Bounds
		if (pointX.current > 68 - 1 * zoom.current && window.innerWidth > max_mobile_width) pointX.current = 68 - 1 * zoom.current;
		if (window.innerWidth <= max_mobile_width && pointX.current > 0) pointX.current = 0;
		if (pointX.current < -max_pointX) pointX.current = -max_pointX;

		// Y Bounds
		if (pointY.current > -imageContainerHeightDelta - 1 * zoom.current) pointY.current = -imageContainerHeightDelta - 1 * zoom.current;
		if (pointY.current < -max_pointY && window.innerWidth > max_mobile_width) pointY.current = -max_pointY;
		if (window.innerWidth <= max_mobile_width && pointY.current < -max_pointY - 58) pointY.current = -max_pointY - 58;
	}, [getDimensionsZoom, pointX, pointY, surfaceMapImageContainerRef, surfaceMapImageRef, zoom, isDisplayingHierarchyValue]);

	useEffect(() => {
		isDisplayingHierarchyValue.current = isDisplayingHierarchy;
		updatePointsForBounds();
		if (surfaceMapImageContainerRef?.current)
			surfaceMapImageContainerRef.current.style.transform =
				"translate(" + pointX.current + "px, " + pointY.current + "px) scale(" + zoom.current + ")";
		updateSurfaceMapContainerStyle();
	}, [
		isDisplayingHierarchy,
		updatePointsForBounds,
		surfaceMapImageContainerRef,
		pointX,
		pointY,
		zoom,
		surfaceMapContainerRef,
		updateSurfaceMapContainerStyle,
	]);

	useEffect(() => {
		function setDefaultPosition() {
			try {
				// Minimum Zoom
				const { width_zoom, height_zoom } = getDimensionsZoom();
				zoom.current = Math.max(width_zoom, height_zoom);

				// Center X
				const max_pointX = surfaceMapImageRef?.current?.clientWidth * zoom.current - window.innerWidth - 1 * zoom.current;
				pointX.current = -(max_pointX / 2) + (zoom.current === width_zoom ? 68 / 2 : 0);

				const imageContainerHeightDelta =
					((surfaceMapImageContainerRef?.current?.clientHeight - surfaceMapImageRef?.current?.clientHeight) * zoom.current) / 2;
				const max_pointY =
					surfaceMapImageRef?.current?.clientHeight * zoom.current + imageContainerHeightDelta - window.innerHeight - 1 * zoom.current;
				const min_pointY = -imageContainerHeightDelta - 1 * zoom.current;
				pointY.current = -((-max_pointY + min_pointY) / 2) + min_pointY;

				// Set Initial Position and Zoom
				updatePointsForBounds();
				surfaceMapImageContainerRef.current.style.transform =
					"translate(" + pointX.current + "px, " + pointY.current + "px) scale(" + zoom.current + ")";
				updateSurfaceMapContainerStyle();
			} catch {}
		}
		setTimeout(() => setDefaultPosition(), 200);
	}, [
		locationMapImage,
		getDimensionsZoom,
		pointX,
		pointY,
		surfaceMapImageContainerRef,
		surfaceMapImageRef,
		updatePointsForBounds,
		zoom,
		updateSurfaceMapContainerStyle,
	]);

	const onResize = useCallback(() => {
		const { width_zoom, height_zoom } = getDimensionsZoom();
		zoom.current = Math.max(zoom.current, width_zoom, height_zoom);
		updatePointsForBounds();
		if (surfaceMapImageContainerRef.current?.style) {
			surfaceMapImageContainerRef.current.style.transform =
				"translate(" + pointX.current + "px, " + pointY.current + "px) scale(" + zoom.current + ")";
			updateSurfaceMapContainerStyle();
		} else {
			setTimeout(() => {
				if (surfaceMapImageContainerRef.current?.style) {
					surfaceMapImageContainerRef.current.style.transform =
						"translate(" + pointX.current + "px, " + pointY.current + "px) scale(" + zoom.current + ")";
					updateSurfaceMapContainerStyle();
				}
			}, 2);
		}

		updatePointsForBounds();

		surfaceMapImageContainerRef.current.style.transform =
			"translate(" + pointX.current + "px, " + pointY.current + "px) scale(" + zoom.current + ")";
		updateSurfaceMapContainerStyle();
	}, [getDimensionsZoom, pointX, pointY, zoom, surfaceMapImageContainerRef, updatePointsForBounds, updateSurfaceMapContainerStyle]);

	useEffect(() => {
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, [onResize]);

	useEffect(() => {
		zoom.current = 1;
		panning.current = false;
		pointX.current = 0;
		pointY.current = 0;

		const surfaceMapImageContainerRefCurrent = surfaceMapImageContainerRef.current;
		if (surfaceMapImageContainerRef?.current) {
			surfaceMapImageContainerRefCurrent.style.transform =
				"translate(" + pointX.current + "px, " + pointY.current + "px) scale(" + zoom.current + ")";
			updateSurfaceMapContainerStyle();
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
		if (!panning.current || isDrawingSurfaceMapComponents) return;
		pointX.current = e.clientX - startPos.x;
		pointY.current = e.clientY - startPos.y;

		updatePointsForBounds();

		surfaceMapImageContainerRef.current.style.transform =
			"translate(" + pointX.current + "px, " + pointY.current + "px) scale(" + zoom.current + ")";
		updateSurfaceMapContainerStyle();
	}

	var stopScrollTimeout = false;
	function imageSurfaceMapOnWheel(e) {
		e.stopPropagation();
		e.preventDefault();

		setIsScrolling(true);
		clearTimeout(stopScrollTimeout);
		stopScrollTimeout = setTimeout(() => setIsScrolling(false), 500);

		let xs = (e.clientX - pointX.current) / zoom.current;
		let ys = (e.clientY - pointY.current) / zoom.current;
		let delta = e.wheelDelta ? e.wheelDelta : -e.deltaY;

		if (Math.sign(delta) === 1) {
			zoom.current *= 1.2;
		} else {
			zoom.current /= 1.2;
		}

		setIsImagePixelated(zoom.current > 3);

		const { width_zoom, height_zoom } = getDimensionsZoom();

		const max_zoom = (1 / window.innerWidth) * 40000;
		zoom.current = Math.max(zoom.current, width_zoom, height_zoom);
		if (zoom.current >= max_zoom) zoom.current = max_zoom;

		pointX.current = e.clientX - xs * zoom.current;
		pointY.current = e.clientY - ys * zoom.current;

		updatePointsForBounds();

		surfaceMapImageContainerRef.current.style.transform =
			"translate(" + pointX.current + "px, " + pointY.current + "px) scale(" + zoom.current + ")";
		updateSurfaceMapContainerStyle();

		updateRegionsNames();
	}

	function onMovementBoxWheel() {
		leaveMovementBox();
		setTimeout(() => leaveMovementBox(), 1);

		setIsScrolling(true);
		clearTimeout(stopScrollTimeout);
		stopScrollTimeout = setTimeout(() => setIsScrolling(false), 500);
	}

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

			const { width_zoom, height_zoom } = getDimensionsZoom();

			const max_zoom = (1 / window.innerWidth) * 40000;
			zoom.current = Math.max(zoom.current, width_zoom, height_zoom);
			if (zoom.current >= max_zoom) zoom.current = Math.max(50, max_zoom);

			pointX.current = startCoords.centerX - xs * zoom.current;
			pointY.current = startCoords.centerY - ys * zoom.current;

			updatePointsForBounds();

			setPoints({ pointX: pointX.current, pointY: pointY.current });

			prevDist.current = Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY);
		}

		updatePointsForBounds();

		surfaceMapImageContainerRef.current.style.transform =
			"translate(" + pointX.current + "px, " + pointY.current + "px) scale(" + zoom.current + ")";
		updateSurfaceMapContainerStyle();
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
			updateSurfaceMapContainerStyle();
		}, 1);
	}

	function leaveMovementBox() {
		if (movementInterval.current !== false) {
			clearInterval(movementInterval.current);
			movementInterval.current = false;
		}
	}

	useEffect(() => {
		return () => {
			clearInterval(movementInterval.current);
			movementInterval.current = false;
		};
	}, []);

	return {
		onTouchStart,
		onTouchMove,
		enterMovementBox,
		leaveMovementBox,
		onMovementBoxWheel,
	};
};
