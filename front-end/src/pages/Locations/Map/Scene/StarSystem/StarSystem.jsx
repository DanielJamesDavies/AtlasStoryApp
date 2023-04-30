// Packages
import { useContext, useEffect, useRef, useState } from "react";

// Components
import { OrbitContainer } from "../../Components/OrbitContainer/OrbitContainer";
import { OutlineContainer } from "../../Components/OutlineContainer/OutlineContainer";
import { Star } from "../../Components/Star/Star";
import { Planet } from "../../Components/Planet/Planet";

// Logic
import { MapFunctions } from "../../MapFunctions";

// Context
import { LocationsContext } from "../../../LocationsContext";

// Services

// Styles

// Assets

export const StarSystem = ({ location, locations, hierarchyItem, setCursorPointer }) => {
	const {
		playerApi,
		changeCameraRotation,
		setIsDisplayingHierarchy,
		selectedLocationId,
		setSelectedLocationId,
		hoverMapLocationId,
		setHoverMapLocationId,
	} = useContext(LocationsContext);
	const { coordToPosition } = MapFunctions();
	const ref = useRef();
	const [isHovering, setIsHovering] = useState(false);

	useEffect(() => {
		if (playerApi) playerApi.position.set(...[-10, -3, 22]);
		changeCameraRotation([8 * (Math.PI / 180), 320 * (Math.PI / 180), Math.PI / 2]);
	}, [playerApi, changeCameraRotation]);

	function onPointerOver(star_system_id) {
		setHoverMapLocationId(star_system_id);
		setIsHovering(true);
	}

	function onPointerOut() {
		setHoverMapLocationId(false);
		setIsHovering(false);
	}

	useEffect(() => {
		setCursorPointer(isHovering);
	}, [setCursorPointer, isHovering]);

	function onClickStar(starSystem) {
		setIsDisplayingHierarchy(true);
		setSelectedLocationId(starSystem?._id);
	}

	return (
		<group ref={ref}>
			{!hierarchyItem?.children
				? null
				: hierarchyItem?.children.map((child, index) => {
						const childLocation = locations.find((e) => JSON.stringify(e?._id) === JSON.stringify(child?._id));
						return (
							<OrbitContainer key={index} apoapsis={index * 6} periapsis={index * 4} inclination={0}>
								{childLocation?.type !== "star" ? null : (
									<OutlineContainer
										scale={0.8}
										thickness={2}
										isDisplaying={
											JSON.stringify(childLocation?._id) === JSON.stringify(selectedLocationId) ||
											JSON.stringify(childLocation?._id) === JSON.stringify(hoverMapLocationId)
										}
										colour={JSON.stringify(childLocation?._id) === JSON.stringify(selectedLocationId) ? "#fff" : "#aaa"}
										onPointerOver={() => onPointerOver(childLocation?._id)}
										onPointerOut={() => onPointerOut()}
									>
										<Star
											position={coordToPosition(childLocation?.position, { order: "yxz", multiplier: 0.05 })}
											scale={0.06}
											onClick={() => onClickStar(childLocation)}
											isHovering={JSON.stringify(childLocation?._id) === JSON.stringify(hoverMapLocationId)}
										/>
									</OutlineContainer>
								)}
								{childLocation?.type !== "planet" ? null : (
									<OutlineContainer
										scale={0.03}
										thickness={1}
										isDisplaying={
											JSON.stringify(childLocation?._id) === JSON.stringify(selectedLocationId) ||
											JSON.stringify(childLocation?._id) === JSON.stringify(hoverMapLocationId)
										}
										colour={JSON.stringify(childLocation?._id) === JSON.stringify(selectedLocationId) ? "#fff" : "#aaa"}
										onPointerOver={() => onPointerOver(childLocation?._id)}
										onPointerOut={() => onPointerOut()}
									>
										<Planet
											position={coordToPosition(childLocation?.position, { order: "yxz", multiplier: 0.05 })}
											scale={0.03}
											onClick={() => onClickStar(childLocation)}
											isHovering={JSON.stringify(childLocation?._id) === JSON.stringify(hoverMapLocationId)}
										/>
									</OutlineContainer>
								)}
							</OrbitContainer>
						);
				  })}
		</group>
	);
};
