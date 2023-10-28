// Packages

// Components
import { OrbitContainer } from "../../Components/OrbitContainer/OrbitContainer";
import { Star } from "../../Components/Star/Star";
import { Planet } from "../../Components/Planet/Planet";
import { Moon } from "../../Components/Moon/Moon";

// Logic
import { MapFunctions } from "../../MapFunctions";

// Context

// Services

// Styles

// Assets

export const StarSystem = ({ locations, hierarchyItem }) => {
	const { coordToPosition } = MapFunctions();
	let locations3DMapImages = false;

	return (
		<group>
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
							>
								{childLocation?.type !== "star" ? null : (
									<Star
										location_id={childLocation?._id}
										position={coordToPosition(childLocation?.position, { order: "yxz", multiplier: 0.05 })}
										scale={childLocation?.scale / 18000000000}
									/>
								)}
								{childLocation?.type !== "planet" ? null : (
									<Planet
										location_id={childLocation?._id}
										position={coordToPosition(childLocation?.position, { order: "yxz", multiplier: 0.05 })}
										scale={childLocation?.scale / 360000000}
										tilt={childLocation?.tilt}
										dayLength={childLocation?.dayLength}
										image={
											locations3DMapImages === false
												? undefined
												: locations3DMapImages?.find((e) => e._id === childLocation?.data?.mapImage)?.image || false
										}
									/>
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
												>
													{child2Location?.type !== "moon" ? null : (
														<Moon
															location_id={child2Location?._id}
															position={coordToPosition(child2Location?.position, {
																order: "yxz",
																multiplier: 0.05,
															})}
															scale={child2Location?.scale / 275000000}
															tilt={child2Location?.tilt}
															dayLength={child2Location?.dayLength}
															image={
																locations3DMapImages === false
																	? undefined
																	: locations3DMapImages?.find((e) => e._id === child2Location?.data?.mapImage)
																			?.image || false
															}
														/>
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
