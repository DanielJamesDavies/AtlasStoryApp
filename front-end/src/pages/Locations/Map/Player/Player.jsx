// Packages
import { useContext, useEffect, useRef } from "react";
import { Vector3 } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";

// Components
import { PlayerControls } from "./PlayerControls";

// Logic

// Context
import { LocationsContext } from "../../LocationsContext";

// Services

// Styles

// Assets

export const Player = ({ isPlayerMovementEnabled }) => {
	const { camera } = useThree();
	const [ref, api] = useSphere(() => ({ mass: 1, type: "Dynamic", position: [-22, -2, 17] }));
	const { playerActions, playerSpeed, isUsingTouch } = PlayerControls({ camera, isPlayerMovementEnabled });
	const { setPlayerApi } = useContext(LocationsContext);

	const position = useRef([0, 0, 0]);
	useEffect(() => {
		setPlayerApi(api);
		api.position.subscribe((pos) => (position.current = pos));
	}, [api, setPlayerApi]);

	function getNewVelocity() {
		let newVelocity = [0, 0, 0];

		const actionVelocityDelta = {
			forward: [0, 0, 1],
			backward: [0, 0, -1],
			left: [-1, 0, 0],
			right: [1, 0, 0],
			up: [0, 1, 0],
			down: [0, -1, 0],
		};

		Object.entries(playerActions)
			.filter(([_, value]) => value)
			.map((e) => {
				if (actionVelocityDelta[e[0]] === undefined) return false;
				newVelocity[0] += actionVelocityDelta[e[0]][0];
				newVelocity[1] += actionVelocityDelta[e[0]][1];
				newVelocity[2] += actionVelocityDelta[e[0]][2] * -1;
				return true;
			});

		const speedLevels = [2, 8, 16, 28];
		const speedMultiplier = isUsingTouch ? 2 : 1;
		const speed = speedLevels[playerSpeed - 1] === undefined ? 0 : speedLevels[playerSpeed - 1] * speedMultiplier;

		const vector = new Vector3(...newVelocity).multiplyScalar(speed).applyEuler(camera.rotation);
		return vector;
	}

	useFrame(() => {
		camera.position.copy(new Vector3(position.current[0], position.current[1], position.current[2]));
		api.velocity.set(...getNewVelocity());
	});

	return <mesh ref={ref}></mesh>;
};
