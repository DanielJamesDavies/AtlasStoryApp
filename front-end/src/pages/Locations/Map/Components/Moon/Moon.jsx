// Packages
import { useRef } from "react";
import { TextureLoader } from "three";
import { useLoader, useFrame } from "@react-three/fiber";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const Moon = ({ position, scale = 1, tilt, onClick, onPointerOver, onPointerOut }) => {
	const ref = useRef();
	const [starMap] = useLoader(TextureLoader, ["/Assets/Map/Moon1/2k_moon.jpg"]);

	useFrame((_, delta) => (ref.current.rotation.x -= delta * 0.009 * Math.min(1 / (scale * scale), 3)));

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
			<group rotation={tilt === undefined ? [0, 0, 0] : tilt} scale={0.5}>
				<mesh rotation={[3 * (Math.PI / 2), 0, Math.PI / 2]}>
					<sphereGeometry args={[21.5, 32, 16]} />
					<meshStandardMaterial map={starMap} />
				</mesh>
			</group>
		</group>
	);
};
