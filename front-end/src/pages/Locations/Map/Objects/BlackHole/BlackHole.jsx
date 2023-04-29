// Packages
import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const BlackHole = ({ position, scale = 1, onClick }) => {
	const ref = useRef();
	const { nodes, materials } = useGLTF("/Assets/Map/BlackHole1/scene.gltf");

	useFrame((_, delta) => (ref.current.rotation.x += delta * 0.3 * Math.min(1 / (scale * scale), 3)));

	return (
		<group ref={ref} position={position} scale={scale} dispose={null} onClick={onClick === undefined ? null : () => onClick()}>
			<group rotation={[0, 0, Math.PI / 2]} scale={15}>
				<mesh geometry={nodes.Object_4.geometry} material={materials.black} scale={0.75} />
				<mesh geometry={nodes.Object_6.geometry} material={materials.accretion_disk} scale={0.91} />
				<mesh geometry={nodes.Object_8.geometry} material={materials.Einstein_ring} />
				<mesh geometry={nodes.Object_10.geometry} material={materials.black} scale={1.05} />
				<mesh geometry={nodes.Object_12.geometry} material={materials.glowing} scale={1.07} />
			</group>
		</group>
	);
};

useGLTF.preload("/Assets/Map/BlackHole1/scene.gltf");
