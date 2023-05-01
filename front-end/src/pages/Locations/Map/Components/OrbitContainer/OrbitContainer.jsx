// Packages
import { useRef, useLayoutEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const OrbitContainer = ({ children, apoapsis, periapsis, inclination, thickness = 1, onClick, onPointerOver, onPointerOut }) => {
	const orbitContainerRef = useRef();
	const orbitRef = useRef();
	const orbitChildrenContainerRef = useRef();
	const [isHovering, setIsHovering] = useState(false);

	useLayoutEffect(() => {
		function translateOrbitChildrenContainer() {
			if (!orbitChildrenContainerRef?.current) return false;
			orbitChildrenContainerRef.current.position.z = apoapsis;
			orbitRef.current.rotation.x = Math.random() * 360 * (Math.PI * 2);
			orbitContainerRef.current.rotation.y = inclination * (Math.PI / 180);
		}
		translateOrbitChildrenContainer();
	}, [orbitChildrenContainerRef, apoapsis, inclination]);

	useFrame((_, delta) => {
		if (apoapsis === 0) return false;
		const speed = 0.008;
		orbitRef.current.rotation.x -= (delta + 1 / (apoapsis + 0.5)) * speed;
	});

	return (
		<group ref={orbitContainerRef}>
			<group ref={orbitRef}>
				<group ref={orbitChildrenContainerRef}>{children}</group>
				<group rotation={[0, Math.PI / 2, 0]}>
					<mesh
						onClick={onClick}
						onPointerOver={(e) => {
							setIsHovering(true);
							onPointerOver(e);
						}}
						onPointerOut={(e) => {
							setIsHovering(false);
							onPointerOut(e);
						}}
						renderOrder={100}
					>
						<torusGeometry args={[apoapsis, 0.25, 5, 100]} />
						<meshBasicMaterial color='#fff' opacity={0} transparent />
					</mesh>
				</group>
				<group rotation={[0, Math.PI / 2, 0]}>
					<mesh>
						<torusGeometry args={[apoapsis, 0.02 * thickness, 5, 100]} />
						<meshBasicMaterial color={isHovering ? "#888" : "#555"} />
					</mesh>
				</group>
			</group>
		</group>
	);
};
