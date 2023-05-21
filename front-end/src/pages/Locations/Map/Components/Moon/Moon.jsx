// Packages
import { useRef } from "react";
import { TextureLoader, Vector3 } from "three";
import { useLoader, useFrame } from "@react-three/fiber";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const Moon = ({
	location_id,
	position,
	scale = 1,
	tilt = 0,
	dayLength = 1,
	onClick,
	onPointerOver,
	onPointerOut,
	addToMapObjectLocations,
}) => {
	const ref = useRef();

	const [starMap] = useLoader(TextureLoader, ["/Assets/Map/Moon1/2k_moon.jpg"]);

	useFrame((_, delta) => {
		if (addToMapObjectLocations) addToMapObjectLocations({ _id: location_id, pos: ref.current.getWorldPosition(new Vector3()) });

		ref.current.rotation.x -= delta * 0.4 * Math.min(1 / (scale * scale), 3) * dayLength;
	});

	return (
		<group
			ref={ref}
			position={position}
			scale={scale}
			dispose={null}
			onClick={onClick}
			onPointerOver={onPointerOver}
			onPointerOut={onPointerOut}
		>
			<group rotation={[0, tilt / 18.24 / Math.PI, 0]} scale={0.5}>
				<mesh rotation={[3 * (Math.PI / 2), 0, Math.PI / 2]}>
					<sphereGeometry args={[21.5, 32, 16]} />
					<meshStandardMaterial map={starMap} />
				</mesh>
			</group>
		</group>
	);
};
