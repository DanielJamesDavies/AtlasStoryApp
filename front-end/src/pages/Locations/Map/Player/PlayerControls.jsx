// Packages
import { useCallback, useContext, useEffect, useRef, useState } from "react";

// Components

// Logic

// Context
import { LocationsContext } from "../../LocationsContext";

// Services

// Styles

// Assets

export const PlayerControls = ({ camera, isPlayerMovementEnabled, setIsPlayerMovementEnabled, isPlayerViewControlEnabled, setIsPlayerViewControlEnabled }) => {
	const {
		currentMapLocationId,
		travellingToMapLocationId,
		setPlayerCamera,
		playerCameraRotation,
		locationsMapRef,
		playerActions,
		setPlayerActions,
		playerSpeed,
		setPlayerSpeed,
		setIsMouseControllingPlayer,
	} = useContext(LocationsContext);

	const actionInputPairs = useRef([
		{ input: "KeyW", action: "forward" },
		{ input: "KeyS", action: "backward" },
		{ input: "KeyA", action: "left" },
		{ input: "KeyD", action: "right" },
		{ input: "KeyR", action: "up" },
		{ input: "KeyF", action: "down" },
		{ input: "Space", action: "up" },
		{ input: "ShiftLeft", action: "down" },
	]);

	const isMouseDown = useRef(false);
	const maxSpeed = useRef(4);

	useEffect(() => {
		setIsPlayerViewControlEnabled(true);
	}, [currentMapLocationId, setIsPlayerViewControlEnabled])

	useEffect(() => {
		camera.fov = 80;
		camera.rotation.set(...playerCameraRotation.current);
		setPlayerCamera(camera);
	}, [camera, playerCameraRotation, setPlayerCamera]);

	const resetPlayerActions = useCallback(() => {
		setPlayerActions((oldPlayerActions) => {
			let newPlayerActions = JSON.parse(JSON.stringify(oldPlayerActions));
			Object.keys(newPlayerActions).map((key) => (newPlayerActions[key] = false));
			return newPlayerActions;
		});
	}, [setPlayerActions]);

	useEffect(() => {
		if (!isPlayerMovementEnabled) return resetPlayerActions();
	}, [isPlayerMovementEnabled, resetPlayerActions]);

	const onMouseDown = useCallback(
		(e) => {
			if (e?.button !== 0) return false;
			if (!isPlayerViewControlEnabled) return false;

			isMouseDown.current = true;
			setIsMouseControllingPlayer(true);
			locationsMapRef.current.style.cursor = "none";
		},
		[isMouseDown, locationsMapRef, setIsMouseControllingPlayer, isPlayerViewControlEnabled]
	);

	const onMouseMove = useCallback(
		(e) => {
			if (!isMouseDown.current) return false;
			if (!isPlayerViewControlEnabled) return false;

			const mouseSensitivity = 0.15;

			const deltaX = e.movementX * mouseSensitivity;
			const deltaY = e.movementY * mouseSensitivity;

			playerCameraRotation.current[0] += deltaX * (Math.PI / 180);
			playerCameraRotation.current[1] += -deltaY * (Math.PI / 180);

			camera.rotation.set(...playerCameraRotation.current);
		},
		[camera, playerCameraRotation, isPlayerViewControlEnabled]
	);

	const onMouseUp = useCallback(
		(e) => {
			if (e?.button !== 0) return resetPlayerActions();
			if (!isPlayerViewControlEnabled) return false;

			isMouseDown.current = false;
			setIsMouseControllingPlayer(false);
			locationsMapRef.current.style.cursor = "auto";
		},
		[isMouseDown, locationsMapRef, resetPlayerActions, setIsMouseControllingPlayer, isPlayerViewControlEnabled]
	);

	function isUsingTrackPad(e) {
		if (e.wheelDeltaY) {
		  if (Math.abs(e.wheelDeltaY) !== 120) return true;
		} else if (e.deltaMode === 0) {
		  return true;
		}
		return false;
	}

	const prev_wheel_timestamp = useRef(false);
	
	const onWheel = useCallback(
		(e) => {
			e.preventDefault();
			if (!isPlayerMovementEnabled) return false;

			if (isUsingTrackPad(e)) {
				if (prev_wheel_timestamp.current === false || e?.timeStamp - prev_wheel_timestamp.current > 150) {
					let actionKey = false;
					if (e?.wheelDelta > 0) actionKey = "forward";
					if (e?.wheelDelta < 0) actionKey = "backward";

					if (actionKey && !playerActions[actionKey]) {
						setPlayerActions((oldPlayerActions) => {
							let newPlayerActions = JSON.parse(JSON.stringify(oldPlayerActions));
							Object.keys(newPlayerActions).map((key) => newPlayerActions[key] = false);
							if (actionKey === "forward" && oldPlayerActions?.backward) return newPlayerActions;
							newPlayerActions[actionKey] = true;
							return newPlayerActions;
						});
					} else if (playerActions[actionKey]) {
						setPlayerSpeed((oldPlayerSpeed) => {
							let newPlayerSpeed = JSON.parse(JSON.stringify(oldPlayerSpeed));
							newPlayerSpeed += 1;
							return newPlayerSpeed < 1 ? 1 : newPlayerSpeed > maxSpeed.current ? maxSpeed.current : newPlayerSpeed;
						});
					}
				}

				prev_wheel_timestamp.current = e?.timeStamp;
			} else {
				setPlayerSpeed((oldPlayerSpeed) => {
					let newPlayerSpeed = JSON.parse(JSON.stringify(oldPlayerSpeed));
					newPlayerSpeed += -Math.sign(e.deltaY);
					return newPlayerSpeed < 1 ? 1 : newPlayerSpeed > maxSpeed.current ? maxSpeed.current : newPlayerSpeed;
				});
			}
		},
		[setPlayerSpeed, isPlayerMovementEnabled, maxSpeed, playerActions, setPlayerActions, prev_wheel_timestamp]
	);

	const onKeyDown = useCallback(
		(e) => {
			if (!isPlayerMovementEnabled) return false;
			if (e?.ctrlKey) return false;

			const key_pressed = e.code;

			const actionKeyPair = actionInputPairs.current.find((pair) => pair.input === key_pressed);
			if (!actionKeyPair) return false;
			setPlayerActions((oldPlayerActions) => {
				let newPlayerActions = JSON.parse(JSON.stringify(oldPlayerActions));
				newPlayerActions[actionKeyPair.action] = true;
				return newPlayerActions;
			});
		},
		[actionInputPairs, setPlayerActions, isPlayerMovementEnabled]
	);

	const onKeyUp = useCallback(
		(e) => {
			if (!isPlayerMovementEnabled) return false;
			if (e?.ctrlKey) return false;

			const key_pressed = e.code;

			const actionKeyPair = actionInputPairs.current.find((pair) => pair.input === key_pressed);
			if (!actionKeyPair) return false;
			setPlayerActions((oldPlayerActions) => {
				let newPlayerActions = JSON.parse(JSON.stringify(oldPlayerActions));
				newPlayerActions[actionKeyPair.action] = false;
				return newPlayerActions;
			});
		},
		[actionInputPairs, setPlayerActions, isPlayerMovementEnabled]
	);

	const onGesture = useCallback((e) => {
		e.preventDefault();
		e.stopPropagation();
		document.body.style.zoom = 0.99;
	}, []);

	const currTouches = useRef(0);
	const prevTouchPoint = useRef(false);
	const prevTouchDistance = useRef(false);
	const [isUsingTouch, setIsUsingTouch] = useState(false);

	const onTouchStart = useCallback(
		(e) => {
			e.stopPropagation();
			if (!isPlayerViewControlEnabled) return false;
			if (travellingToMapLocationId === false) setIsPlayerMovementEnabled(true);

			setIsUsingTouch(true);

			currTouches.current = e.touches.length;
			if (e.touches.length === 1) {
				prevTouchPoint.current = [e.touches[0]?.clientX, e.touches[0]?.clientY];
			} else if (e.touches.length === 2) {
				prevTouchDistance.current = Math.hypot(
					e.touches[1]?.clientX - e.touches[0]?.clientX,
					e.touches[1]?.clientY - e.touches[0]?.clientY
				);
			}
		},
		[
			setIsUsingTouch,
			currTouches,
			prevTouchPoint,
			prevTouchDistance,
			setIsPlayerMovementEnabled,
			travellingToMapLocationId,
			isPlayerViewControlEnabled,
		]
	);

	const onTouchMove = useCallback(
		(e) => {
			e.stopPropagation();
			if (!isPlayerViewControlEnabled) return false;

			if (currTouches.current !== e.touches.length) return false;

			if (e.touches.length === 1) {
				const prev_point = JSON.parse(JSON.stringify(prevTouchPoint.current));
				prevTouchPoint.current = [e.touches[0]?.clientX, e.touches[0]?.clientY];
				const curr_point = JSON.parse(JSON.stringify(prevTouchPoint.current));

				const deltaX = (curr_point[0] - prev_point[0]) * 0.22;
				const deltaY = (curr_point[1] - prev_point[1]) * 0.15;

				playerCameraRotation.current[0] += -deltaX * (Math.PI / 180);
				playerCameraRotation.current[1] += deltaY * (Math.PI / 180);

				camera.rotation.set(...playerCameraRotation.current);
			} else if (e.touches.length === 2) {
				const prev_dist = JSON.parse(JSON.stringify(prevTouchDistance.current));
				prevTouchDistance.current = Math.hypot(
					e.touches[1]?.clientX - e.touches[0]?.clientX,
					e.touches[1]?.clientY - e.touches[0]?.clientY
				);
				const curr_dist = JSON.parse(JSON.stringify(prevTouchDistance.current));
				const dist_delta = curr_dist - prev_dist;

				let actionKey = false;
				if (dist_delta > 0) {
					actionKey = "forward";
				} else if (dist_delta < 0) {
					actionKey = "backward";
				}

				if (actionKey) {
					setPlayerActions((oldPlayerActions) => {
						let newPlayerActions = JSON.parse(JSON.stringify(oldPlayerActions));
						newPlayerActions[actionKey] = true;
						return newPlayerActions;
					});
				}
			}
		},
		[playerCameraRotation, camera, prevTouchPoint, prevTouchDistance, setPlayerActions, isPlayerViewControlEnabled]
	);

	const onTouchEnd = useCallback(
		(e) => {
			e.stopPropagation();
			if (!isPlayerViewControlEnabled) return false;
			currTouches.current = 0;
			resetPlayerActions();
			setIsUsingTouch(false);
			if (travellingToMapLocationId === false) setIsPlayerMovementEnabled(false);
		},
		[currTouches, resetPlayerActions, setIsUsingTouch, setIsPlayerMovementEnabled, travellingToMapLocationId, isPlayerViewControlEnabled]
	);

	useEffect(() => {
		const locationsMapRefCurrent = locationsMapRef?.current;

		document.addEventListener("keydown", onKeyDown);
		document.addEventListener("keyup", onKeyUp);

		locationsMapRefCurrent?.addEventListener("mousedown", onMouseDown);
		locationsMapRefCurrent.addEventListener("mousemove", onMouseMove);
		locationsMapRefCurrent?.addEventListener("mouseup", onMouseUp);
		locationsMapRefCurrent?.addEventListener("mouseleave", onMouseUp);
		locationsMapRefCurrent?.addEventListener("wheel", onWheel, { passive: false });

		locationsMapRefCurrent.addEventListener("gesturestart", onGesture);
		locationsMapRefCurrent.addEventListener("gesturechange", onGesture);
		locationsMapRefCurrent.addEventListener("gestureend", onGesture);
		locationsMapRefCurrent.addEventListener("touchstart", onTouchStart);
		locationsMapRefCurrent.addEventListener("touchmove", onTouchMove);
		locationsMapRefCurrent.addEventListener("touchend", onTouchEnd);
		return () => {
			document.removeEventListener("keydown", onKeyDown);
			document.removeEventListener("keyup", onKeyUp);

			locationsMapRefCurrent.removeEventListener("mousedown", onMouseDown);
			locationsMapRefCurrent.removeEventListener("mousemove", onMouseMove);
			locationsMapRefCurrent.removeEventListener("mouseup", onMouseUp);
			locationsMapRefCurrent?.removeEventListener("mouseleave", onMouseUp);
			locationsMapRefCurrent?.removeEventListener("wheel", onWheel);

			locationsMapRefCurrent.removeEventListener("gesturestart", onGesture);
			locationsMapRefCurrent.removeEventListener("gesturechange", onGesture);
			locationsMapRefCurrent.removeEventListener("gestureend", onGesture);
			locationsMapRefCurrent.removeEventListener("touchstart", onTouchStart);
			locationsMapRefCurrent.removeEventListener("touchmove", onTouchMove);
			locationsMapRefCurrent.removeEventListener("touchend", onTouchEnd);
		};
	}, [locationsMapRef, onKeyDown, onKeyUp, onMouseDown, onMouseMove, onMouseUp, onWheel, onGesture, onTouchStart, onTouchMove, onTouchEnd]);

	return { playerActions, playerSpeed, isUsingTouch };
};
