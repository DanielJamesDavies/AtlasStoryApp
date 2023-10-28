// Packages
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";

// Components
import { SpaceMap } from "./SpaceMap/SpaceMap";

// Logic
import { BackgroundLogic } from "./BackgroundLogic";

// Context

// Services

// Styles
import "./Background.css";

// Assets

export const Background = () => {
	const { unit_type, unit, unitOverviewForegrounds, unitOverviewBackground, unitVersion, overviewForegroundSizeRef, locationMapImage } =
		BackgroundLogic();

	if (unitOverviewForegrounds === false) return null;
	if (unit_type === "location" && (!unitOverviewBackground || unitOverviewBackground === "NO_IMAGE"))
		return (
			<>
				{unit?.type === "surfaceLocation" ? (
					<div className='unit-page-overview-background-surface-map-container'>
						{!locationMapImage || locationMapImage === "NO_IMAGE" ? null : <img src={locationMapImage} alt='' />}
					</div>
				) : (
					<div className='unit-page-overview-background-space-map-container'>
						<Canvas gl={{ powerPreference: "high-performance", antialias: false }}>
							<Physics gravity={[0, 0, 0]}>
								<SpaceMap />
							</Physics>
						</Canvas>
					</div>
				)}
			</>
		);
	return (
		<>
			{!["character"].includes(unit_type) ? null : (
				<div
					className={
						!unitOverviewForegrounds.find((e) => e?._id === unitVersion?._id)?.image?.image ||
						unitOverviewForegrounds.find((e) => e?._id === unitVersion?._id)?.image?.image === "NO_IMAGE"
							? "unit-page-overview-foreground-container unit-page-overview-foreground-container-no-image"
							: "unit-page-overview-foreground-container"
					}
				>
					<div
						className={
							"unit-page-overview-foreground unit-page-overview-foreground-alignment-" + unitVersion?.overviewForeground?.alignment
						}
					>
						{!unitOverviewForegrounds.find((e) => e?._id === unitVersion?._id)?.image?.image ||
						unitOverviewForegrounds.find((e) => e?._id === unitVersion?._id)?.image?.image === "NO_IMAGE" ? null : (
							<img
								src={unitOverviewForegrounds.find((e) => e?._id === unitVersion?._id)?.image?.image}
								alt=''
								style={{
									transform: `translate(${unitVersion?.overviewForeground?.position.join("px, ")}px)`,
									height: isNaN(
										overviewForegroundSizeRef?.current?.clientHeight *
											parseFloat(unitVersion?.overviewForeground?.scale * ((window.innerHeight + 200) / 1300))
									)
										? "0px"
										: overviewForegroundSizeRef?.current?.clientHeight *
										  parseFloat(unitVersion?.overviewForeground?.scale * ((window.innerHeight + 200) / 1300)),
									maxWidth: isNaN(
										overviewForegroundSizeRef?.current?.clientWidth * parseFloat(unitVersion?.overviewForeground?.scale)
									)
										? "0px"
										: overviewForegroundSizeRef?.current?.clientWidth * parseFloat(unitVersion?.overviewForeground?.scale),
								}}
							/>
						)}
						{!unitOverviewForegrounds.find((e) => e?._id === unitVersion?._id)?.image?.image ||
						unitOverviewForegrounds.find((e) => e?._id === unitVersion?._id)?.image?.image === "NO_IMAGE" ? null : (
							<div style={{ scale: unitVersion?.overviewForeground?.scale }}>
								<img
									ref={overviewForegroundSizeRef}
									className='unit-page-overview-foreground-image-size'
									src={unitOverviewForegrounds.find((e) => e?._id === unitVersion?._id)?.image?.image}
									alt=''
								/>
							</div>
						)}
					</div>
				</div>
			)}
			<div
				className={
					!unitOverviewBackground || unitOverviewBackground === "NO_IMAGE"
						? "unit-page-overview-background unit-page-overview-background-no-image"
						: "unit-page-overview-background"
				}
			>
				{!unitOverviewBackground || unitOverviewBackground === "NO_IMAGE" ? null : <img src={unitOverviewBackground} alt='' />}
			</div>
		</>
	);
};
