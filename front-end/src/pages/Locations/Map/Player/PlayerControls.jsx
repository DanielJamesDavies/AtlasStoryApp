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
	const { locationsMapRef, playerActions, setPlayerActions, playerSpeed, setPlayerSpeed } = useContext(LocationsContext);

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
	const cameraRotation = useRef([0, 0, Math.PI / 2]);

	const resetPlayerActions = useCallback(() => {
		setPlayerActions((oldPlayerActions) => {
			let newPlayerActions = JSON.parse(JSON.stringify(oldPlayerActions));
			Object.keys(newPlayerActions).map((key) => (newPlayerActions[key] = false));
			return newPlayerActions;
		});
	}, [setPlayerActions]);

	useEffect(() => {
		camera.fov = 80;
		cameraRotation.current[0] = 8 * (Math.PI / 180);
		cameraRotation.current[1] = 300 * (Math.PI / 180);
		camera.rotation.set(...cameraRotation.current);
	}, [camera, cameraRotation]);

	useEffect(() => {
		if (!isPlayerMovementEnabled) return resetPlayerActions();
	}, [isPlayerMovementEnabled, resetPlayerActions]);

	const onMouseDown = useCallback(
		(e) => {
			if (e?.button !== 0) return false;
			isMouseDown.current = true;
			locationsMapRef.current.style.cursor = "none";
		},
		[isMouseDown, locationsMapRef]
	);

	const onMouseMove = useCallback(
		(e) => {
			if (!isMouseDown.current) return false;

			const mouseSensitivity = 0.15;

			const deltaX = e.movementX * mouseSensitivity;
			const deltaY = e.movementY * mouseSensitivity;

			cameraRotation.current[0] += deltaX * (Math.PI / 180);
			cameraRotation.current[1] += -deltaY * (Math.PI / 180);

			camera.rotation.set(...cameraRotation.current);
		},
		[camera]
	);

	const onMouseUp = useCallback(
		(e) => {
			if (e?.button !== 0) return resetPlayerActions();
			isMouseDown.current = false;
			locationsMapRef.current.style.cursor = "auto";
		},
		[isMouseDown, locationsMapRef, resetPlayerActions]
	);

	const onWheel = useCallback(
		(e) => {
			if (!isPlayerMovementEnabled) return false;

			let speedDelta = 0;
			setPlayerActions((oldPlayerActions) => {
				let newPlayerActions = JSON.parse(JSON.stringify(oldPlayerActions));

				if (playerSpeed > 1) {
					if (
						(newPlayerActions["forward"] && Math.sign(e.deltaY) === -1) ||
						(newPlayerActions["backward"] && Math.sign(e.deltaY) === 1)
					) {
						speedDelta += 1;
					} else {
						speedDelta = -playerSpeed + 1;
						newPlayerActions["forward"] = false;
						newPlayerActions["backward"] = false;
					}
				} else {
					if (
						(Math.sign(e.deltaY) === 1 && newPlayerActions["forward"]) ||
						(Math.sign(e.deltaY) === -1 && newPlayerActions["backward"])
					) {
						newPlayerActions["forward"] = false;
						newPlayerActions["backward"] = false;
					} else if (Math.sign(e.deltaY) === -1) {
						if (newPlayerActions["forward"]) speedDelta = 1;
						newPlayerActions["forward"] = true;
						newPlayerActions["backward"] = false;
					} else {
						if (newPlayerActions["backward"]) speedDelta = 1;
						newPlayerActions["backward"] = true;
						newPlayerActions["forward"] = false;
					}
				}
				return newPlayerActions;
			});

			setPlayerSpeed((oldPlayerSpeed) => oldPlayerSpeed + speedDelta);
		},
		[setPlayerActions, playerSpeed, setPlayerSpeed, isPlayerMovementEnabled]
	);

	function getMultiKeyPressCount() {
		const maxPressDelta = 500;

		let newEvents = [];
		mutliKeyPresses.current.events.map((event) => {
			if (newEvents.length !== 0 && newEvents[newEvents.length - 1][0] === event[0]) return false;
			newEvents.push(event);
			return true;
		});

		let startIndex = 0;
		newEvents.map((curr_event, index) => {
			if (index === 0) return false;
			const prev_event = newEvents[index - 1];
			if (curr_event[1] - prev_event[1] > maxPressDelta) startIndex = index;
			return true;
		});

		return newEvents.filter((e, index) => index >= startIndex && e[0] === "keyDown")?.length;
	}

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
			setPlayerSpeed((oldPlayerSpeed) => {
				const multiKeyPressCount = getMultiKeyPressCount();
				return oldPlayerSpeed > multiKeyPressCount ? oldPlayerSpeed : multiKeyPressCount;
			});
		},
		[actionInputPairs, setPlayerActions, setPlayerSpeed, isPlayerMovementEnabled]
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
			setPlayerSpeed((oldPlayerSpeed) => {
				return Object.entries(newPlayerActions)
					.filter(([_, value]) => value)
					.map((e) => e[0]).length === 0
					? 1
					: oldPlayerSpeed;
			});
		},
		[actionInputPairs, setPlayerActions, setPlayerSpeed, isPlayerMovementEnabled]
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
