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

export const Moon = ({ position, scale = 1, tilt, onClick, onPointerOver, onPointerOut }) => {
	const ref = useRef();
	const { nodes, materials } = useGLTF("/Assets/Map/Moon1/scene.gltf");

	useFrame((_, delta) => (ref.current.rotation.x -= delta * 0.008 * Math.min(1 / (scale * scale), 3)));

	return (
		<group
			ref={ref}
			position={position}
			scale={scale}
			dispose={null}
			onClick={onClick === undefined ? null : (e) => onClick(e)}
			onPointerOver={onPointerOver}
			onPointerOut={onPointerOut}
		>
			<group name='Sketchfab_model' rotation={[0, -Math.PI / 2, 2 * (Math.PI / 2)]} scale={1}>
				<group name='157f21a0fd4a468082d7f17951348031fbx' rotation={[Math.PI / 2, 0, 0]}>
					<group name='group1' rotation={tilt === undefined ? [0, 0, 0] : tilt}>
						<group rotation={[-Math.PI / 2, 0, 0]}>
							<mesh geometry={nodes.Object_2.geometry} material={materials.None} />
							<mesh geometry={nodes.Object_3.geometry} material={materials.None} />
							<mesh geometry={nodes.Object_4.geometry} material={materials.None} />
							<mesh geometry={nodes.Object_5.geometry} material={materials.None} />
							<mesh geometry={nodes.Object_6.geometry} material={materials.None} />
							<mesh geometry={nodes.Object_7.geometry} material={materials.None} />
							<mesh geometry={nodes.Object_8.geometry} material={materials.None} />
							<mesh geometry={nodes.Object_9.geometry} material={materials.None} />
							<mesh geometry={nodes.Object_10.geometry} material={materials.None} />
							<mesh geometry={nodes.Object_11.geometry} material={materials.None} />
							<mesh geometry={nodes.Object_12.geometry} material={materials.None} />
							<mesh geometry={nodes.Object_13.geometry} material={materials.None} />
							<mesh geometry={nodes.Object_14.geometry} material={materials.None} />
							<mesh geometry={nodes.Object_15.geometry} material={materials.None} />
							<mesh geometry={nodes.Object_16.geometry} material={materials.None} />
							<mesh geometry={nodes.Object_17.geometry} material={materials.None} />
							<mesh geometry={nodes.Object_18.geometry} material={materials.None} />
							<mesh geometry={nodes.Object_19.geometry} material={materials.None} />
							<mesh geometry={nodes.Object_20.geometry} material={materials.None} />
							<mesh geometry={nodes.Object_21.geometry} material={materials.None} />
							<mesh geometry={nodes.Object_22.geometry} material={materials.None} />
							<mesh geometry={nodes.Object_23.geometry} material={materials.None} />
							<mesh geometry={nodes.Object_24.geometry} material={materials.None} />
							<mesh geometry={nodes.Object_25.geometry} material={materials.None} />
							<mesh geometry={nodes.Object_26.geometry} material={materials.None} />
							<mesh geometry={nodes.Object_27.geometry} material={materials.None} />
							<mesh geometry={nodes.Object_28.geometry} material={materials.None} />
							<mesh geometry={nodes.Object_29.geometry} material={materials.None} />
							<mesh geometry={nodes.Object_30.geometry} material={materials.None} />
							<mesh geometry={nodes.Object_31.geometry} material={materials.None} />
							<mesh geometry={nodes.Object_32.geometry} material={materials.None} />
							<mesh geometry={nodes.Object_33.geometry} material={materials.None} />
						</group>
					</group>
				</group>
			</group>
		</group>
	);
};

useGLTF.preload("/Assets/Map/Moon1/scene.gltf");
