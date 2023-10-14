// Packages
import { useRef, useState, useCallback, useLayoutEffect } from "react";
import { Vector3 } from "three";

// Components

// Logic
import { MapFunctions } from "../../MapFunctions";

// Context

// Services

// Styles

// Assets

export const Path = ({ path, locations }) => {
	const { coordToPosition } = MapFunctions();

	const lineRef = useRef();
	const cylinderBufferGeometryRef = useRef();
	const isLoading = useRef(true);
	const currPositions = useRef(false);
	const [width, setWidth] = useState(0);
	const [length, setLength] = useState(0);

	const getPointPositons = useCallback(() => {
		const options = { order: "yxz", multiplier: 0.05 };
		const pos_from = coordToPosition(locations.find((e) => JSON.stringify(e?._id) === JSON.stringify(path?.from))?.position, options);
		const pos_to = coordToPosition(locations.find((e) => JSON.stringify(e?._id) === JSON.stringify(path?.to))?.position, options);
		return [pos_from, pos_to];
	}, [path, locations, coordToPosition]);

	useLayoutEffect(() => {
		const [pos_from, pos_to] = getPointPositons();

		async function createPath(pos_from, pos_to, iteration) {
			if (!lineRef?.current || !cylinderBufferGeometryRef?.current) return false;
			if (JSON.stringify(currPositions.current) === JSON.stringify([pos_from, pos_to])) return false;

			setWidth(path?.isMajor ? 0.04 : 0.015);

			const newLength = Math.hypot(pos_from[0] - pos_to[0], pos_from[1] - pos_to[1], pos_from[2] - pos_to[2]);
			setLength(newLength);

			lineRef.current.position.copy(new Vector3(...pos_from));
			lineRef.current.lookAt(new Vector3(...pos_to));

			cylinderBufferGeometryRef.current.rotateX(Math.PI / 2);
			cylinderBufferGeometryRef.current.translate(0, 0, newLength / 2);

			if (iteration === 1) {
				isLoading.current = false;
				currPositions.current = [pos_from, pos_to];
			}
		}
		createPath(pos_from, pos_to, 0);
		setTimeout(() => createPath(pos_from, pos_to, 1), 1);
	}, [path, locations, getPointPositons, setWidth, setLength, isLoading, currPositions]);

	return (
		<mesh ref={lineRef} position={getPointPositons()[0]}>
			<cylinderBufferGeometry ref={cylinderBufferGeometryRef} attach='geometry' args={[width, width, length, 25]} />
			<meshBasicMaterial attach='material' color={path?.colour === undefined ? "#444444" : path?.colour} />
		</mesh>
	);
};
