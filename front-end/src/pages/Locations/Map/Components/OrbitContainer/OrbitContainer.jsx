// Packages
import { useRef, useLayoutEffect, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const OrbitContainer = ({ children, points = [0, 0], inclination, thickness = 1, onClick, onPointerOver, onPointerOut, isActive }) => {
	const orbitContainerRef = useRef();
	const orbitRef = useRef();
	const orbitChildrenContainerRef = useRef();
	const [isHovering, setIsHovering] = useState(false);
	const [apoapsis, setApoapsis] = useState(Math.max(...points));
	const [periapsis, setPeriapsis] = useState(Math.min(...points));
	const [semiMajorAxis, setSemiMajorAxis] = useState(Math.min(...points) + Math.abs(points[0] - points[1]) / 2);
	const [radius, setRadius] = useState(Math.min(...points) + Math.abs(points[0] - points[1]) / 2);

	useEffect(() => {
		setApoapsis(Math.max(...points));
		setPeriapsis(Math.min(...points));
		setSemiMajorAxis(Math.min(...points) + Math.abs(points[0] - points[1]) / 2);
		setRadius(Math.min(...points));
	}, [points]);

	useLayoutEffect(() => {
		function translateOrbitChildrenContainer() {
			if (!orbitChildrenContainerRef?.current) return false;
			orbitContainerRef.current.position.z = semiMajorAxis - periapsis;
			orbitContainerRef.current.rotation.y = inclination * (Math.PI / 360);
			// orbitRef.current.position.z = -(Math.abs(points[0] - points[1]) / 2) - Math.abs(points[0] - points[1]) / 5;
		}
		translateOrbitChildrenContainer();
	}, [orbitChildrenContainerRef, semiMajorAxis, apoapsis, periapsis, inclination]);

	useFrame((_, delta) => {
		if (radius === 0) return false;
		const speed = 0.032;
		orbitRef.current.rotation.x -= (delta + 1 / (radius + 0.5)) * speed;

		let newRadius = Math.min(...points) + Math.abs(points[0] - points[1]) / 2;
		setRadius(newRadius);
		orbitChildrenContainerRef.current.position.z = newRadius;
	});

	return (
		<group ref={orbitContainerRef}>
			<group ref={orbitRef}>
				<group ref={orbitChildrenContainerRef}>{children}</group>
			</group>
			<group rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 1]}>
				<mesh>
					<torusGeometry args={[semiMajorAxis, 0.04 * thickness, 5, 100]} />
					<meshBasicMaterial color={isActive || isHovering ? "#888" : "#555"} />
				</mesh>
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
					renderOrder={10}
				>
					<torusGeometry args={[semiMajorAxis, 0.25 * thickness, 5, 100]} />
					<meshBasicMaterial color='#fff' opacity={0} transparent />
				</mesh>
			</group>
		</group>
	);
};
