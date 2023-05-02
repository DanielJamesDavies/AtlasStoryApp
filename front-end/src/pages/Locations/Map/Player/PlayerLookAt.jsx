// Packages
import { useContext, useRef } from "react";
import { useFrame } from "@react-three/fiber";

// Components

// Logic
import { HierarchyFunctions } from "../../HierarchyFunctions";
import { MapFunctions } from "../MapFunctions";

// Context
import { LocationsContext } from "../../LocationsContext";
import { Vector3 } from "three";

// Services

// Styles

// Assets

export const PlayerLookAt = () => {
	const { story, locations, setPlayerLookAtObjectPosition, playerCamera, travellingToMapLocationId } = useContext(LocationsContext);
	const { getItemFromIdInHierarchy } = HierarchyFunctions();
	const { coordToPosition } = MapFunctions();
	const playerLookAt = useRef();
	const playerLookAtBetween = useRef();
	const playerLookAtMesh = useRef();
	const isInitialFrame = useRef(true);

	useFrame(() => {
		if (playerLookAt.current && travellingToMapLocationId) {
			const newLocationId = getItemFromIdInHierarchy(travellingToMapLocationId, story?.data?.locationsHierarchy)?._id;
			let newPosition = locations.find((e) => JSON.stringify(e?._id) === JSON.stringify(newLocationId))?.position;
			newPosition = coordToPosition(newPosition, { order: "yxz", multiplier: 0.05 });

			if (isInitialFrame.current) {
				const distance = Math.hypot(
					Math.abs(playerCamera.position.x - newPosition[0]),
					Math.abs(playerCamera.position.y - newPosition[1]),
					Math.abs(playerCamera.position.z - newPosition[2])
				);

				isInitialFrame.current = false;

				playerLookAtBetween.current.position.set(0, 0, -distance);
				playerLookAtBetween.current.lookAt(new Vector3(...newPosition));
			} else {
				const playerLookAtBetweenWorldPosition = playerLookAtBetween.current.getWorldPosition(new Vector3());
				const distance = Math.hypot(
					Math.abs(playerLookAtBetweenWorldPosition.x - newPosition[0]),
					Math.abs(playerLookAtBetweenWorldPosition.y - newPosition[1]),
					Math.abs(playerLookAtBetweenWorldPosition.z - newPosition[2])
				);
				playerLookAtMesh.current.position.lerp(new Vector3(0, 0, distance), 0.06);
				setPlayerLookAtObjectPosition(playerLookAtMesh.current.getWorldPosition(new Vector3()));
			}
		} else {
			isInitialFrame.current = true;
			if (playerLookAt.current) {
				playerLookAt.current.position.set(playerCamera.position.x, playerCamera.position.y, playerCamera.position.z);
				playerLookAt.current.rotation.set(playerCamera.rotation.x, playerCamera.rotation.y, playerCamera.rotation.z);
			}
			if (playerLookAtBetween.current) playerLookAtBetween.current.position.set(0, 0, -10);
			if (playerLookAtMesh.current) playerLookAtMesh.current.position.set(0, 0, 0);
		}
	});

	if (!playerCamera) return null;
	return (
		<group ref={playerLookAt}>
			<group ref={playerLookAtBetween}>
				<mesh ref={playerLookAtMesh}>
					<sphereGeometry args={[0.5, 1, 1]} />
					<meshStandardMaterial color='#0044ff' opacity={0} transparent />
				</mesh>
			</group>
		</group>
	);
};
