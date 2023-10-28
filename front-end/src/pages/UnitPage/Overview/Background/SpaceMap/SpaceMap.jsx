// Packages
import { useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

// Components
import { Scene } from "./Scene/Scene";

// Logic

// Context

// Services

// Styles

// Assets

export const SpaceMap = () => {
	const { camera } = useThree();

	return (
		<>
			<Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
			<ambientLight />
			<pointLight position={[10, 10, 10]} />
			<Scene camera={camera} />
		</>
	);
};
