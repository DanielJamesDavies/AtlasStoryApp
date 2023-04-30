// Packages
import { useCallback, useContext, useEffect, useRef } from "react";

// Components

// Logic

// Context
import { LocationsContext } from "../../LocationsContext";

// Services

// Styles

// Assets

export const PlayerControls = ({ camera, isPlayerMovementEnabled }) => {
	const {
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

	const mutliKeyPresses = useRef();
	const isMouseDown = useRef(false);

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
			isMouseDown.current = true;
			setIsMouseControllingPlayer(true);
			locationsMapRef.current.style.cursor = "none";
		},
		[isMouseDown, locationsMapRef, setIsMouseControllingPlayer]
	);

	const onMouseMove = useCallback(
		(e) => {
			if (!isMouseDown.current) return false;

			const mouseSensitivity = 0.15;

			const deltaX = e.movementX * mouseSensitivity;
			const deltaY = e.movementY * mouseSensitivity;

			playerCameraRotation.current[0] += deltaX * (Math.PI / 180);
			playerCameraRotation.current[1] += -deltaY * (Math.PI / 180);

			camera.rotation.set(...playerCameraRotation.current);
		},
		[camera, playerCameraRotation]
	);

	const onMouseUp = useCallback(
		(e) => {
			if (e?.button !== 0) return resetPlayerActions();
			isMouseDown.current = false;
			setIsMouseControllingPlayer(false);
			locationsMapRef.current.style.cursor = "auto";
		},
		[isMouseDown, locationsMapRef, resetPlayerActions, setIsMouseControllingPlayer]
	);

	const onWheel = useCallback(
		(e) => {
			if (!isPlayerMovementEnabled) return false;

			setPlayerSpeed((oldPlayerSpeed) => {
				let newPlayerSpeed = JSON.parse(JSON.stringify(oldPlayerSpeed));
				newPlayerSpeed += -Math.sign(e.deltaY);
				return newPlayerSpeed < 1 ? 1 : newPlayerSpeed > 3 ? 3 : newPlayerSpeed;
			});
		},
		[setPlayerSpeed, isPlayerMovementEnabled]
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

			if (mutliKeyPresses.current?.key !== key_pressed) mutliKeyPresses.current = { key: key_pressed, events: [] };
			mutliKeyPresses.current.events.push(["keyDown", Date.now()]);
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
			let newPlayerActions = false;
			setPlayerActions((oldPlayerActions) => {
				newPlayerActions = JSON.parse(JSON.stringify(oldPlayerActions));
				newPlayerActions[actionKeyPair.action] = false;
				return newPlayerActions;
			});

			if (mutliKeyPresses.current?.key !== key_pressed) mutliKeyPresses.current = { key: key_pressed, events: [] };
			mutliKeyPresses.current.events.push(["keyUp", Date.now()]);
		},
		[actionInputPairs, setPlayerActions, isPlayerMovementEnabled]
	);

	useEffect(() => {
		const locationsMapRefCurrent = locationsMapRef?.current;
		locationsMapRefCurrent?.addEventListener("mousedown", onMouseDown);
		locationsMapRefCurrent.addEventListener("mousemove", onMouseMove);
		locationsMapRefCurrent?.addEventListener("mouseup", onMouseUp);
		locationsMapRefCurrent?.addEventListener("mouseleave", onMouseUp);
		locationsMapRefCurrent?.addEventListener("wheel", onWheel);

		document.addEventListener("keydown", onKeyDown);
		document.addEventListener("keyup", onKeyUp);
		return () => {
			locationsMapRefCurrent.removeEventListener("mousedown", onMouseDown);
			locationsMapRefCurrent.removeEventListener("mousemove", onMouseMove);
			locationsMapRefCurrent.removeEventListener("mouseup", onMouseUp);
			locationsMapRefCurrent?.removeEventListener("mouseleave", onMouseUp);
			locationsMapRefCurrent?.removeEventListener("wheel", onWheel);

			document.removeEventListener("keydown", onKeyDown);
			document.removeEventListener("keyup", onKeyUp);
		};
	}, [locationsMapRef, onKeyDown, onKeyUp, onMouseDown, onMouseMove, onMouseUp, onWheel]);

	return { playerActions, playerSpeed };
};
