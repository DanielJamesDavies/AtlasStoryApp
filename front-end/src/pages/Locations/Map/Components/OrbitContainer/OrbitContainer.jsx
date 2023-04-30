// Packages
import { useRef, useLayoutEffect } from "react";
import { useFrame } from "@react-three/fiber";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const OrbitContainer = ({ children, apoapsis, periapsis, inclination }) => {
	const orbitContainerRef = useRef();
	const orbitRef = useRef();
	const orbitChildrenContainerRef = useRef();

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
					<mesh>
						<torusGeometry args={[apoapsis, 0.01, 5, 100]} />
						<meshBasicMaterial color='#444444 ' />
					</mesh>
				</group>
			</group>
		</group>
	);
};
