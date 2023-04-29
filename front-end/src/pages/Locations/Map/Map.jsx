// Packages
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { Physics } from "@react-three/cannon";

// Components
import { Player } from "./Player/Player";
import { Scene } from "./Scene/Scene";

// Logic
import { MapLogic } from "./MapLogic";

// Context

// Services

// Styles
import "./Map.css";

// Assets

export const Map = () => {
	const { locationsMapRef, setSelectedLocationId, isPlayerMovementEnabled, setisPlayerMovementEnabled, setCursorPointer } = MapLogic();

	return (
		<div
			ref={locationsMapRef}
			className='locations-map'
			onMouseDown={() => setSelectedLocationId(false)}
			onMouseEnter={() => setisPlayerMovementEnabled(true)}
			onMouseLeave={() => setisPlayerMovementEnabled(false)}
		>
			<Canvas>
				<Physics gravity={[0, 0, 0]}>
					<Player isPlayerMovementEnabled={isPlayerMovementEnabled} />
					<Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
					<ambientLight />
					<pointLight position={[10, 10, 10]} />
					<Scene setCursorPointer={setCursorPointer} />
				</Physics>
			</Canvas>
		</div>
	);
};
