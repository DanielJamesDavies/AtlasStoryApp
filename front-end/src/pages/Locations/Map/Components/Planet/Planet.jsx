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

export const Planet = ({ position, scale = 1, tilt, onClick }) => {
	const ref = useRef();
	const cloudsRef = useRef();
	const [earthDayMap, earthCloudsMap] = useLoader(TextureLoader, [
		"/Assets/Map/Earth/2k_earth_daymap.jpg",
		"/Assets/Map/Earth/2k_earth_clouds.jpg",
	]);

	useFrame((_, delta) => {
		ref.current.rotation.x -= delta * 0.8 * Math.min(1 / (scale * scale), 3);
		cloudsRef.current.rotation.x += delta * 0.15 * Math.min(1 / (scale * scale), 3);
	});

	return (
		<group ref={ref} position={position} scale={scale} dispose={null} onClick={onClick === undefined ? null : (e) => onClick(e)}>
			<group rotation={tilt === undefined ? [0, 0, 0] : tilt} scale={0.5}>
				<mesh rotation={[0, 0, Math.PI / 2]}>
					<sphereGeometry args={[21.5, 32, 16]} />
					<meshStandardMaterial map={earthDayMap} />
				</mesh>
				<mesh ref={cloudsRef} rotation={[0, 0, Math.PI / 2]}>
					<sphereGeometry args={[21.75, 32, 16]} />
					<meshStandardMaterial map={earthCloudsMap} opacity={0.5} transparent />
				</mesh>
				<mesh>
					<sphereGeometry attach='geometry' args={[22, 32, 16]} />
					<meshPhongMaterial attach='material' color='#0055ff' opacity={0.2} transparent />
				</mesh>
			</group>
		</group>
	);
};
