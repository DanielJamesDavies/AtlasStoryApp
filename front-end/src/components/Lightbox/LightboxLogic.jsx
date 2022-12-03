// Packages
import { useContext, useRef, useEffect } from "react";

// Components

// Logic

// Context
import { LightboxContext } from "../../context/LightboxContext";

// Services

// Styles

// Assets

export const LightboxLogic = () => {
	const { lightboxImageIDs, setLightboxImageIDs, lightboxImages, setLightboxImages, lightboxIndex, setLightboxIndex } =
		useContext(LightboxContext);

	function incrementLightboxIndex(e) {
		e.stopPropagation();
		setLightboxIndex((oldLightboxIndex) => (oldLightboxIndex - 1 < 0 ? 0 : oldLightboxIndex - 1));
	}

	function decrementLightboxIndex(e) {
		e.stopPropagation();
		setLightboxIndex((oldLightboxIndex) =>
			oldLightboxIndex + 1 > lightboxImages.length - 1 ? lightboxImages.length - 1 : oldLightboxIndex + 1
		);
	}

	function closeLightbox() {
		setLightboxImageIDs([]);
		setLightboxImages([]);
		setLightboxIndex(0);
	}

	const lightBoxImageContainerRef = useRef();
	var zoom = useRef(1);
	var panning = useRef(false);
	var pointX = useRef(0);
	var pointY = useRef(0);
	var startPos = useRef({ x: 0, y: 0 });

	useEffect(() => {
		zoom.current = 1;
		panning.current = false;
		pointX.current = 0;
		pointY.current = 0;

		const lightBoxImageContainerRefCurrent = lightBoxImageContainerRef.current;
		if (lightBoxImageContainerRef?.current) {
			lightBoxImageContainerRefCurrent.style.transform =
				"translate(" + pointX.current + "px, " + pointY.current + "px) scale(" + zoom.current + ")";
			lightBoxImageContainerRefCurrent.addEventListener("mousedown", imageLightBoxOnMouseDown);
			lightBoxImageContainerRefCurrent.addEventListener("mouseup", imageLightBoxOnMouseUp);
			lightBoxImageContainerRefCurrent.addEventListener("mouseout", imageLightBoxOnMouseUp);
			lightBoxImageContainerRefCurrent.addEventListener("mousemove", imageLightBoxOnMouseMove);
			lightBoxImageContainerRefCurrent.addEventListener("wheel", imageLightBoxOnWheel);
		}
		return () => {
			if (lightBoxImageContainerRefCurrent) {
				lightBoxImageContainerRefCurrent.removeEventListener("mousedown", imageLightBoxOnMouseDown);
				lightBoxImageContainerRefCurrent.removeEventListener("mouseup", imageLightBoxOnMouseUp);
				lightBoxImageContainerRefCurrent.removeEventListener("mouseout", imageLightBoxOnMouseUp);
				lightBoxImageContainerRefCurrent.removeEventListener("mousemove", imageLightBoxOnMouseMove);
				lightBoxImageContainerRefCurrent.removeEventListener("wheel", imageLightBoxOnWheel);
			}
		};
	}, [lightBoxImageContainerRef, lightboxImages, lightboxIndex, zoom, panning, pointX, pointY]);

	function imageLightBoxOnMouseDown(e) {
		e.preventDefault();
		startPos = { x: e.clientX - pointX.current, y: e.clientY - pointY.current };
		panning.current = true;
	}

	function imageLightBoxOnMouseUp() {
		panning.current = false;
	}

	function imageLightBoxOnMouseMove(e) {
		e.preventDefault();
		if (!panning.current) return;
		pointX.current = e.clientX - startPos.x;
		pointY.current = e.clientY - startPos.y;
		lightBoxImageContainerRef.current.style.transform =
			"translate(" + pointX.current + "px, " + pointY.current + "px) scale(" + zoom.current + ")";
	}

	function imageLightBoxOnWheel(e) {
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
			lightBoxImageContainerRef.current.style.transform =
				"translate(" + pointX.current + "px, " + pointY.current + "px) scale(" + zoom.current + ")";
		}

		lightBoxImageContainerRef.current.style.transform =
			"translate(" + pointX.current + "px, " + pointY.current + "px) scale(" + zoom.current + ")";
	}

	const lightboxContainerRef = useRef();

	useEffect(() => {
		function onGesture(e) {
			e.preventDefault();
			e.stopPropagation();
			document.body.style.zoom = 0.99;
		}

		const lightboxContainerRefCurrent = lightboxContainerRef?.current;
		if (lightboxContainerRefCurrent) {
			lightboxContainerRefCurrent.addEventListener("gesturestart", onGesture);
			lightboxContainerRefCurrent.addEventListener("gesturechange", onGesture);
			lightboxContainerRefCurrent.addEventListener("gestureend", onGesture);
		}

		return () => {
			if (lightboxContainerRefCurrent) {
				lightboxContainerRefCurrent.removeEventListener("gesturestart", onGesture);
				lightboxContainerRefCurrent.removeEventListener("gesturechange", onGesture);
				lightboxContainerRefCurrent.removeEventListener("gestureend", onGesture);
			}
		};
	}, [lightboxContainerRef, lightBoxImageContainerRef]);

	let prevDist = useRef({ current: false });

	function onTouchStart(e) {
		e.preventDefault();
		e.stopPropagation();

		if (e.touches.length === 1) {
			startPos = { x: e.touches[0].pageX - pointX.current, y: e.touches[0].pageY - pointY.current };
		} else if (e.touches.length === 2) {
			startPos = { x: e.touches[0].pageX - pointX.current, y: e.touches[0].pageY - pointY.current };
			prevDist.current = false;
		} else {
			startPos = { x: e.touches[0].pageX - pointX.current, y: e.touches[0].pageY - pointY.current };
		}
	}

	function onTouchMove(e) {
		e.preventDefault();

		if (e.touches.length === 1) {
			const newPointX = e.touches[0].pageX - startPos.x;
			const newPointY = e.touches[0].pageY - startPos.y;
			if (!Number.isNaN(newPointX)) pointX.current = newPointX;
			if (!Number.isNaN(newPointY)) pointY.current = newPointY;
		} else if (e.touches.length === 2) {
			let centerX = Math.min(e.touches[0].pageX, e.touches[1].pageX) + Math.abs(e.touches[0].pageX - e.touches[1].pageX) / 2;
			let centerY = Math.min(e.touches[0].pageY, e.touches[1].pageY) + Math.abs(e.touches[0].pageY - e.touches[1].pageY) / 2;

			let xs = (centerX - pointX.current) / zoom.current;
			let ys = (centerY - pointY.current) / zoom.current;

			if (prevDist.current === false)
				prevDist.current = Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY);

			let dist = Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY);

			let diffDist = prevDist.current - dist;

			zoom.current -= diffDist * zoom.current * 0.01;

			if (zoom.current <= 1) {
				zoom.current = 1;
				pointX.current = 0;
				pointY.current = 0;
			} else if (zoom.current >= 50) {
				zoom.current = 50;
				pointX.current = centerX - xs * zoom.current;
				pointY.current = centerY - ys * zoom.current;
			} else {
				pointX.current = centerX - xs * zoom.current;
				pointY.current = centerY - ys * zoom.current;
			}

			prevDist.current = Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY);
		}

		lightBoxImageContainerRef.current.style.transform =
			"translate(" + pointX.current + "px, " + pointY.current + "px) scale(" + zoom.current + ")";
	}

	return {
		lightboxImageIDs,
		lightboxImages,
		lightboxIndex,
		incrementLightboxIndex,
		decrementLightboxIndex,
		closeLightbox,
		lightBoxImageContainerRef,
		lightboxContainerRef,
		onTouchStart,
		onTouchMove,
	};
};
