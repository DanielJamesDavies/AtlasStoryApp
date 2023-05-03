// Packages
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";

// Components

// Logic

// Context

// Services

// Styles

// Assets
import starTwinkle from "./StarTwinkle.png";

export const StarTwinkle = ({ position, scale = 1, onClick, onPointerOver, onPointerOut }) => {
	const starSprite = useLoader(TextureLoader, starTwinkle);

	return (
		<sprite
			position={position}
			scale={scale < 1 ? 1 : scale}
			renderOrder={100}
			onClick={onClick}
			onPointerOver={onPointerOver}
			onPointerOut={onPointerOut}
		>
			<spriteMaterial map={starSprite} depthTest={false} />
		</sprite>
	);
};
