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

export const Star = ({ location_id, position, scale = 1, onClick, onPointerOver, onPointerOut, addToMapObjectLocations }) => {
	const ref = useRef();

	const [starMap] = useLoader(TextureLoader, ["/Assets/Map/Star1/2k_sun.jpg"]);

	useFrame((_, delta) => {
		if (addToMapObjectLocations) addToMapObjectLocations({ _id: location_id, pos: ref.current.getWorldPosition(new Vector3()) });

		const speed = 0.1;
		ref.current.rotation.x -= delta * Math.min(1 / (scale * scale), 3) * speed;
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
			<mesh rotation={[0, 0, Math.PI / 2]} scale={0.46}>
				<sphereGeometry args={[21.5, 32, 16]} />
				<meshStandardMaterial map={starMap} />
			</mesh>
		</group>
	);
};
