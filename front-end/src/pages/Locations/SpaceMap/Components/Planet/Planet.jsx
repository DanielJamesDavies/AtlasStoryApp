// Packages
import { useEffect, useRef, useState } from "react";
import { TextureLoader, Vector3 } from "three";
import { useLoader, useFrame } from "@react-three/fiber";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const Planet = ({ location_id, position, scale = 1, tilt = 0, dayLength = 1, onClick, addToMapObjectLocations }) => {
	const ref = useRef();
	const cloudsRef = useRef();
	const [earthDayMap, earthCloudsMap] = useLoader(TextureLoader, [
		"/Assets/Map/Earth/2k_earth_daymap.jpg",
		"/Assets/Map/Earth/2k_earth_clouds.jpg",
	]);
	const [new_scale, setNewScale] = useState(0);

	useEffect(() => {
		setNewScale(Math.min(Math.max(scale, 0.001), 0.05));
	}, [scale, setNewScale]);

	useFrame((_, delta) => {
		if (addToMapObjectLocations) addToMapObjectLocations({ _id: location_id, pos: ref.current.getWorldPosition(new Vector3()) });

		ref.current.rotation.x -= delta * 0.4 * Math.min(1 / (new_scale * new_scale), 3) * dayLength;
		cloudsRef.current.rotation.x += delta * 0.15 * Math.min(1 / (new_scale * new_scale), 3) * dayLength;
	});

	return (
		<group ref={ref} position={position} scale={new_scale} dispose={null} onClick={onClick === undefined ? null : (e) => onClick(e)}>
			<group rotation={[0, tilt / 18.24 / Math.PI, 0]} scale={0.47}>
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
