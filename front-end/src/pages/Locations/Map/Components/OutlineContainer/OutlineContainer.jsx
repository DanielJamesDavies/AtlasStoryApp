// Packages
import { useRef, useContext, useState } from "react";
import { useFrame } from "@react-three/fiber";

// Components

// Logic

// Context
import { LocationsContext } from "../../../LocationsContext";

// Services

// Styles

// Assets

export const OutlineContainer = ({
	children,
	scale = 1,
	thickness = 1,
	gap = 1,
	colour = "#ffffff",
	isDisplaying,
	onPointerOver,
	onPointerOut,
}) => {
	const { playerCamera } = useContext(LocationsContext);
	const outlineRef = useRef();

	const [actualThickness, setActualThickness] = useState(false);
	const [distanceAway, setDistanceAway] = useState(false);

	useFrame(() => {
		if (!isDisplaying || !outlineRef?.current || !playerCamera) return false;
		outlineRef.current.lookAt(playerCamera.position);

		const newDistanceAway = Math.hypot(
			Math.abs(playerCamera.position.x - outlineRef.current.position.x),
			Math.abs(playerCamera.position.y - outlineRef.current.position.y),
			Math.abs(playerCamera.position.z - outlineRef.current.position.z)
		);
		setDistanceAway(newDistanceAway);
		setActualThickness(Math.max(newDistanceAway * thickness * 0.002, thickness / 40));
	});

	return (
		<group onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
			<group>{children}</group>
			{!isDisplaying ? null : (
				<group ref={outlineRef}>
					{actualThickness === false || distanceAway === false ? null : (
						<mesh>
							<torusGeometry
								args={[
									(scale + gap + actualThickness) * Math.max(((4 * scale) / distanceAway) * 0.22, 0.045 + scale * 10),
									actualThickness,
									5,
									100,
								]}
							/>
							<meshBasicMaterial color={colour} />
						</mesh>
					)}
				</group>
			)}
		</group>
	);
};
