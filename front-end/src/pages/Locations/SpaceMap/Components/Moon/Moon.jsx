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
	image,
}) => {
	const ref = useRef();

	const surfaceMap = useLoader(TextureLoader, !image ? "/Assets/Map/Moon1/2k_moon.jpg" : image);

	const delta_buffer = useRef(0);

	useFrame((_, delta) => {
		delta_buffer.current += delta;
		if (delta_buffer?.current > 0.1) {
			delta_buffer.current = 0;
			if (addToMapObjectLocations) addToMapObjectLocations({ _id: location_id, pos: ref.current.getWorldPosition(new Vector3()) });
		}

		const rotation_speed = 0.1;
		ref.current.rotation.x -= delta * 0.4 * Math.min(1 / (scale * scale), 3) * dayLength * rotation_speed;
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
					<meshStandardMaterial map={surfaceMap} />
				</mesh>
			</group>
		</group>
	);
};
