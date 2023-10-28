// Packages
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { Physics } from "@react-three/cannon";

// Components
import { Player } from "./Player/Player";
import { PlayerLookAt } from "./Player/PlayerLookAt";
import { Scene } from "./Scene/Scene";

// Logic
import { SpaceMapLogic } from "./SpaceMapLogic";

// Context

// Services

// Styles
import "./SpaceMap.css";
import { LoadingCircle } from "../../../components/LoadingCircle/LoadingCircle";

// Assets

export const SpaceMap = () => {
	const {
		locations,
		locationTypes,
		locationsMapRef,
		onMouseEnter,
		onMouseLeave,
		selectedLocationId,
		setSelectedLocationId,
		setIsDisplayingHierarchy,
		isPlayerMovementEnabled,
		setIsPlayerMovementEnabled,
		setCursorPointer,
		isHidingSpaceMap,
		hoverMapLocationId,
		onMouseMove,
		locationsMapLabelStyles,
		travellingToMapLocationId,
	} = SpaceMapLogic();

	return (
		<div
			ref={locationsMapRef}
			className={"locations-map" + (isHidingSpaceMap ? " locations-map-hidden" : " locations-map-is-displaying")}
			onMouseDown={() => {
				if (selectedLocationId) {
					setSelectedLocationId(false);
				} else {
					setIsDisplayingHierarchy(false);
				}
			}}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			onMouseMove={onMouseMove}
		>
			<div className='locations-map-loading-circle-container'>
				<LoadingCircle center={true} size='l' />
			</div>
			<div className='locations-map-label-container'>
				{travellingToMapLocationId !== false || !locations?.find((e) => e?._id === hoverMapLocationId)?.data?.name ? null : (
					<div className='locations-map-label' style={locationsMapLabelStyles}>
						{locationTypes?.find((e) => e?.type === locations?.find((e) => e?._id === hoverMapLocationId)?.type)?.icon}
						<span>{locations?.find((e) => e?._id === hoverMapLocationId)?.data?.name}</span>
					</div>
				)}
			</div>
			<Canvas gl={{ powerPreference: "high-performance", antialias: false }}>
				<Physics gravity={[0, 0, 0]}>
					<Player isPlayerMovementEnabled={isPlayerMovementEnabled} setIsPlayerMovementEnabled={setIsPlayerMovementEnabled} />
					<PlayerLookAt />
					<Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
					<ambientLight />
					<pointLight position={[10, 10, 10]} />
					<Scene setCursorPointer={setCursorPointer} />
				</Physics>
			</Canvas>
		</div>
	);
};
