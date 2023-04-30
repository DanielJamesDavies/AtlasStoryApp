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

export const Star = ({ position, scale = 1, onClick, onPointerOver, onPointerOut }) => {
	const ref = useRef();
	const { nodes, materials } = useGLTF("/Assets/Map/Star1/scene.gltf");

	useFrame((_, delta) => {
		const speed = 0.1;
		ref.current.rotation.x -= delta * Math.min(1 / (scale * scale), 3) * speed;
	});

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
			<group name='Sketchfab_Scene' rotation={[0, 0, Math.PI / 2]}>
				<group name='Sketchfab_model'>
					<group name='3a2aaa22fb3d4b329318a980ad1bf6d1fbx'>
						<group name='Object_2'>
							<group name='RootNode'>
								<group name='UnstableStarCore' rotation={[-Math.PI / 2, 0, 0]}>
									<mesh
										name='UnstableStarCore_1_0'
										geometry={nodes.UnstableStarCore_1_0.geometry}
										material={materials.material}
									/>
								</group>
								<group name='UnstableStarref' rotation={[-Math.PI / 2, 0, 0]} scale={1.01}>
									<mesh
										name='UnstableStarref_2_0'
										geometry={nodes.UnstableStarref_2_0.geometry}
										material={materials.material_1}
									/>
								</group>
								<group>
									<mesh>
										<sphereGeometry attach='geometry' args={[10.2, 32, 16]} />
										<meshPhongMaterial attach='material' color='#ffaa77' opacity={0.2} transparent />
									</mesh>
								</group>
							</group>
						</group>
					</group>
				</group>
			</group>
		</group>
	);
};

useGLTF.preload("/Assets/Map/Star1/scene.gltf");
