// Packages
import { useContext, useEffect, useRef, useState } from "react";

// Components
import { OrbitContainer } from "../../Components/OrbitContainer/OrbitContainer";
import { OutlineContainer } from "../../Components/OutlineContainer/OutlineContainer";
import { Star } from "../../Components/Star/Star";
import { Planet } from "../../Components/Planet/Planet";
import { Moon } from "../../Components/Moon/Moon";

// Logic
import { MapFunctions } from "../../MapFunctions";

// Context
import { LocationsContext } from "../../../LocationsContext";

// Services

// Styles

// Assets

export const StarSystem = ({ locations, hierarchyItem, setCursorPointer }) => {
	const {
		setIsDisplayingHierarchy,
		changeCurrentMapLocationId,
		selectedLocationId,
		setSelectedLocationId,
		hoverMapLocationId,
		setHoverMapLocationId,
		addToMapObjectLocations,
		locations3DMapImages,
	} = useContext(LocationsContext);
	const { coordToPosition } = MapFunctions();
	const ref = useRef();
	const [isHovering, setIsHovering] = useState(false);

	function onPointerOver(e, location_id) {
		e.stopPropagation();
		setHoverMapLocationId(location_id);
		setIsHovering(true);
	}

	function onPointerOut(e) {
		e.stopPropagation();
		setHoverMapLocationId(false);
		setIsHovering(false);
	}

	useEffect(() => {
		setCursorPointer(isHovering);
	}, [setCursorPointer, isHovering]);

	const clicks = useRef([]);
	const clickTimeout = useRef(false);

	function getNewClicks(oldClicks, maxDelta) {
		let newClicks = JSON.parse(JSON.stringify(oldClicks));

		let startIndex = 0;
		newClicks.map((curr_click, index) => {
			if (index === newClicks.length - 1) return false;
			const next_click = newClicks[index + 1];
			if (next_click - curr_click > maxDelta) startIndex = index + 1;
			return true;
		});

		return newClicks.filter((_, index) => index >= startIndex);
	}

	function onClickLocation(e, input_location) {
		if (e?.stopPropagation !== undefined) e.stopPropagation();

		const maxDelta = 400;

		clicks.current.push(Date.now());
		clicks.current = getNewClicks(clicks.current, maxDelta);
		switch (clicks.current.length) {
			case 1:
				clickTimeout.current = setTimeout(() => {
					setIsDisplayingHierarchy(true);
					setSelectedLocationId(input_location?._id);
				}, maxDelta);
				break;
			case 2:
				clearTimeout(clickTimeout.current);
				setIsDisplayingHierarchy(false);
				setSelectedLocationId(false);

				let forwardDelta = 0;
				if (input_location?.type === "star") forwardDelta = -4.5;
				if (input_location?.type === "planet") forwardDelta = -3.2;
				if (input_location?.type === "moon") forwardDelta = -2;
				changeCurrentMapLocationId(input_location?._id, forwardDelta);
				break;
			default:
				break;
		}
	}

	return (
		<group ref={ref}>
			{!hierarchyItem?.children
				? null
				: hierarchyItem?.children.map((child, index) => {
						const childLocation = locations.find((e) => JSON.stringify(e?._id) === JSON.stringify(child?._id));
						return (
							<OrbitContainer
								key={index}
								points={
									!childLocation?.points || childLocation.points.length < 2
										? [0, 0]
										: [childLocation?.points[0] / 12000000, childLocation?.points[1] / 12000000]
								}
								inclination={childLocation?.inclination}
								onClick={(e) => onClickLocation(e, childLocation)}
								onPointerOver={(e) => onPointerOver(e, childLocation?._id)}
								onPointerOut={(e) => onPointerOut(e)}
								isActive={
									JSON.stringify(childLocation?._id) === JSON.stringify(selectedLocationId) ||
									JSON.stringify(childLocation?._id) === JSON.stringify(hoverMapLocationId)
								}
							>
								{childLocation?.type !== "star" ? null : (
									<OutlineContainer
										scale={childLocation?.scale / 18000000000}
										thickness={2}
										isDisplaying={
											JSON.stringify(childLocation?._id) === JSON.stringify(selectedLocationId) ||
											JSON.stringify(childLocation?._id) === JSON.stringify(hoverMapLocationId)
										}
										colour={JSON.stringify(childLocation?._id) === JSON.stringify(selectedLocationId) ? "#fff" : "#aaa"}
										onPointerOver={(e) => onPointerOver(e, childLocation?._id)}
										onPointerOut={(e) => onPointerOut(e)}
									>
										<Star
											location_id={childLocation?._id}
											position={coordToPosition(childLocation?.position, { order: "yxz", multiplier: 0.05 })}
											scale={childLocation?.scale / 18000000000}
											onClick={(e) => onClickLocation(e, childLocation)}
											addToMapObjectLocations={addToMapObjectLocations}
										/>
									</OutlineContainer>
								)}
								{childLocation?.type !== "planet" ? null : (
									<OutlineContainer
										scale={childLocation?.scale / 360000000}
										thickness={1}
										gap={1.05}
										isDisplaying={
											JSON.stringify(childLocation?._id) === JSON.stringify(selectedLocationId) ||
											JSON.stringify(childLocation?._id) === JSON.stringify(hoverMapLocationId)
										}
										colour={JSON.stringify(childLocation?._id) === JSON.stringify(selectedLocationId) ? "#fff" : "#aaa"}
										onClick={(e) => onClickLocation(e, childLocation)}
										onPointerOver={(e) => onPointerOver(e, childLocation?._id)}
										onPointerOut={(e) => onPointerOut(e)}
									>
										<Planet
											location_id={childLocation?._id}
											position={coordToPosition(childLocation?.position, { order: "yxz", multiplier: 0.05 })}
											scale={childLocation?.scale / 360000000}
											tilt={childLocation?.tilt}
											dayLength={childLocation?.dayLength}
											onClick={(e) => onClickLocation(e, childLocation)}
											addToMapObjectLocations={addToMapObjectLocations}
											image={
												locations3DMapImages === false
													? undefined
													: locations3DMapImages?.find((e) => e._id === childLocation?.data?.mapImage)?.image || false
											}
										/>
									</OutlineContainer>
								)}
								{child?.children === undefined || child?.children.length === 0
									? null
									: child?.children.map((child2, index) => {
											const child2Location = locations.find((e) => JSON.stringify(e?._id) === JSON.stringify(child2?._id));
											return (
												<OrbitContainer
													key={index}
													points={
														!child2Location?.points || child2Location.points.length < 2
															? [0, 0]
															: [child2Location?.points[0] / 350000, child2Location?.points[1] / 350000]
													}
													inclination={child2Location?.inclination}
													thickness={0.5}
													onClick={(e) => onClickLocation(e, child2Location)}
													onPointerOver={(e) => onPointerOver(e, child2Location?._id)}
													onPointerOut={(e) => onPointerOut(e)}
												>
													{child2Location?.type !== "moon" ? null : (
														<OutlineContainer
															scale={child2Location?.scale / 275000000}
															thickness={0.8}
															gap={1.05}
															isDisplaying={
																JSON.stringify(child2Location?._id) === JSON.stringify(selectedLocationId) ||
																JSON.stringify(child2Location?._id) === JSON.stringify(hoverMapLocationId)
															}
															colour={
																JSON.stringify(child2Location?._id) === JSON.stringify(selectedLocationId)
																	? "#fff"
																	: "#aaa"
															}
															onPointerOver={() => onPointerOver(child2Location?._id)}
															onPointerOut={() => onPointerOut()}
														>
															<Moon
																location_id={child2Location?._id}
																position={coordToPosition(child2Location?.position, {
																	order: "yxz",
																	multiplier: 0.05,
																})}
																scale={child2Location?.scale / 275000000}
																tilt={child2Location?.tilt}
																dayLength={child2Location?.dayLength}
																onClick={(e) => onClickLocation(e, child2Location)}
																onPointerOver={(e) => onPointerOver(e, child2Location?._id)}
																onPointerOut={(e) => onPointerOut(e)}
																addToMapObjectLocations={addToMapObjectLocations}
																image={
																	locations3DMapImages === false
																		? undefined
																		: locations3DMapImages?.find(
																				(e) => e._id === child2Location?.data?.mapImage
																		  )?.image || false
																}
															/>
														</OutlineContainer>
													)}
												</OrbitContainer>
											);
									  })}
							</OrbitContainer>
						);
				  })}
		</group>
	);
};
