// Packages
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const Planet = ({ position, scale = 1, tilt, onClick, onPointerOver, onPointerOut, isHovering }) => {
	const ref = useRef();
	const { nodes, materials } = useGLTF("/Assets/Map/Earth/scene.gltf");

	useFrame((_, delta) => (ref.current.rotation.x -= delta * 0.3 * Math.min(1 / (scale * scale), 3)));

	return (
		<group
			ref={ref}
			position={position}
			scale={scale}
			dispose={null}
			onClick={onClick === undefined ? null : () => onClick()}
			onPointerOver={onPointerOver}
			onPointerOut={onPointerOut}
		>
			<group name='Sketchfab_model' rotation={[0, -Math.PI / 2, 0]} scale={0.5}>
				<group name='157f21a0fd4a468082d7f17951348031fbx' rotation={[Math.PI / 2, 0, 0]}>
					<group name='group1' rotation={tilt === undefined ? [0, 0, 0] : tilt}>
						<group name='Nubes' position={[0, 0, 0]}>
							<mesh name='Nubes_tierra_nubes_0' geometry={nodes.Nubes_tierra_nubes_0.geometry} material={materials.tierra_nubes} />
						</group>
						<group name='Atmosfera' scale={0.99}>
							<mesh
								name='Atmosfera_tierra_atmosfera_01_0'
								geometry={nodes.Atmosfera_tierra_atmosfera_01_0.geometry}
								material={materials.tierra_atmosfera_01}
							/>
						</group>
						<group name='Tierra'>
							<mesh
								name='Tierra_Tierra_blin_superficie_0'
								geometry={nodes.Tierra_Tierra_blin_superficie_0.geometry}
								material={materials.Tierra_blin_superficie}
							/>
						</group>
						<group name='Atmosfera1' scale={0.98}>
							<mesh
								name='Atmosfera1_tierra_atmosfera_02_0'
								geometry={nodes.Atmosfera1_tierra_atmosfera_02_0.geometry}
								material={materials.tierra_atmosfera_02}
							/>
						</group>
					</group>
				</group>
			</group>
		</group>
	);
};

useGLTF.preload("/Assets/Map/Earth/scene.gltf");
