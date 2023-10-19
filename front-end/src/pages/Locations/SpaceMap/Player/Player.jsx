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
		setIsPlayerViewControlEnabled,
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
		mapObjectLocations,
		setIsHidingSpaceMap,
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
				const mapObjectLocation = mapObjectLocations.find((e) => JSON.stringify(e?._id) === JSON.stringify(newLocationId))?.pos;
				let newPosition = [0, 0, 0];
				if (mapObjectLocation) {
					newPosition = [mapObjectLocation.x, mapObjectLocation.y, mapObjectLocation.z];
				} else {
					newPosition = locations.find((e) => JSON.stringify(e?._id) === JSON.stringify(newLocationId))?.position;
					newPosition = coordToPosition(newPosition, { order: "yxz", multiplier: 0.05 });
				}

				const camera_position = camera.position.clone();
				const dist = Math.hypot(camera_position.x - newPosition[0], camera_position.y - newPosition[1], camera_position.z - newPosition[2]);

				movingTime.current += delta;

				const min_dist = 0.25;

				if (dist > min_dist) camera.position.lerp(new Vector3(...newPosition), delta * 10);

				if (dist <= min_dist || movingTime.current > 0.6 + travellingToMapLocationForwardDelta / 10) {
					setIsHidingSpaceMap(true);
					setTimeout(() => {
						movingTime.current = 0;
						rotatingTime.current = 0;
						const scenesChangePlayerInitialItem = JSON.parse(
							JSON.stringify(scenesChangePlayerInitial.current.find((e) => e.type === newLocation?.type))
						);
						if (scenesChangePlayerInitialItem) {
							api.position.set(...scenesChangePlayerInitialItem?.position);
							camera.rotation.set(...scenesChangePlayerInitialItem?.rotation);
							playerCameraRotation.current = scenesChangePlayerInitialItem?.rotation;
						}
						setCurrentMapLocationId(JSON.parse(JSON.stringify(travellingToMapLocationId)));
						setTravellingToMapLocationId(false);
						setIsPlayerMovementEnabled(true);
						setIsPlayerViewControlEnabled(true);
					}, 200);
					setTimeout(() => setIsHidingSpaceMap(false), 210);
				}
			}
		}
	});

	return <mesh ref={ref}></mesh>;
};
