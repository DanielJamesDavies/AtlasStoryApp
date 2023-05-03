// Packages
import { useContext, useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";

// Components
import { PlayerControls } from "./PlayerControls";

// Logic
import { HierarchyFunctions } from "../../HierarchyFunctions";
import { MapFunctions } from "../MapFunctions";

// Context
import { LocationsContext } from "../../LocationsContext";

// Services

// Styles

// Assets

export const Player = ({ isPlayerMovementEnabled, setIsPlayerMovementEnabled }) => {
	const { camera } = useThree();
	const [ref, api] = useSphere(() => ({ mass: 1, type: "Dynamic", position: [-22, -2, 17] }));
	const [isPlayerViewControlEnabled, setIsPlayerViewControlEnabled] = useState(true);
	const { playerActions, playerSpeed, isUsingTouch } = PlayerControls({
		camera,
		isPlayerMovementEnabled,
		setIsPlayerMovementEnabled,
		isPlayerViewControlEnabled,
	});
	const {
		story,
		locations,
		playerLookAtObjectPosition,
		setPlayerApi,
		playerCameraRotation,
		setCurrentMapLocationId,
		travellingToMapLocationId,
		setTravellingToMapLocationId,
		travellingToMapLocationForwardDelta,
		scenesChangePlayerInitial,
	} = useContext(LocationsContext);
	const { getItemFromIdInHierarchy } = HierarchyFunctions();
	const { coordToPosition } = MapFunctions();

	const position = useRef([0, 0, 0]);
	useEffect(() => {
		setPlayerApi(api);
		api.position.subscribe((pos) => (position.current = pos));
		api.position.subscribe((pos) => (position.current = pos));
	}, [api, setPlayerApi]);

	function getNewVelocity() {
		let newVelocity = [0, 0, 0];

		const actionVelocityDelta = {
			forward: [0, 0, 1],
			backward: [0, 0, -1],
			left: [-1, 0, 0],
			right: [1, 0, 0],
			up: [0, 1, 0],
			down: [0, -1, 0],
		};

		Object.entries(playerActions)
			.filter(([_, value]) => value)
			.map((e) => {
				if (actionVelocityDelta[e[0]] === undefined) return false;
				newVelocity[0] += actionVelocityDelta[e[0]][0];
				newVelocity[1] += actionVelocityDelta[e[0]][1];
				newVelocity[2] += actionVelocityDelta[e[0]][2] * -1;
				return true;
			});

		const speedLevels = [2, 8, 16, 28];
		const speedMultiplier = isUsingTouch ? 2 : 1;
		const speed = speedLevels[playerSpeed - 1] === undefined ? 0 : speedLevels[playerSpeed - 1] * speedMultiplier;

		const vector = new Vector3(...newVelocity).multiplyScalar(speed).applyEuler(camera.rotation);
		return vector;
	}

	const rotatingTime = useRef(0);
	const movingTime = useRef(0);
	useFrame((_, delta) => {
		if (travellingToMapLocationId === false || playerLookAtObjectPosition === false) {
			api.velocity.set(...getNewVelocity());
			camera.position.copy(new Vector3(position.current[0], position.current[1], position.current[2]));
		} else {
			if (rotatingTime.current < 0.4) {
				camera.lookAt(new Vector3(...playerLookAtObjectPosition));
				camera.rotateZ(Math.PI / 2 - camera.rotation._z);
				rotatingTime.current += delta;
				setIsPlayerViewControlEnabled(false);
			} else {
				const newLocationId = getItemFromIdInHierarchy(travellingToMapLocationId, story?.data?.locationsHierarchy)?._id;
				const newLocation = locations.find((e) => JSON.stringify(e?._id) === JSON.stringify(newLocationId));
				let newPosition = newLocation?.position;
				newPosition = coordToPosition(newPosition, { order: "yxz", multiplier: 0.05 });
				camera.position.lerp(new Vector3(...newPosition), 0.1);

				movingTime.current += delta;

				if (movingTime.current > 0.75 + travellingToMapLocationForwardDelta / 10) {
					movingTime.current = 0;
					rotatingTime.current = 0;

					const sceneChangePlayerInitial = scenesChangePlayerInitial.current.find((e) => e.type === newLocation?.type);
					if (sceneChangePlayerInitial) {
						api.position.set(...sceneChangePlayerInitial?.position);
						playerCameraRotation.current = sceneChangePlayerInitial?.rotation;
					}

					setCurrentMapLocationId(JSON.parse(JSON.stringify(travellingToMapLocationId)));
					setTravellingToMapLocationId(false);
					setIsPlayerMovementEnabled(true);
					setIsPlayerViewControlEnabled(true);
				}
			}
		}
	});

	return <mesh ref={ref}></mesh>;
};
