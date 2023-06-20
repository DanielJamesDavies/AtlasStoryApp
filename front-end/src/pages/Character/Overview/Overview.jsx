// Packages

// Components
import { CharacterOverviewPrimaryImage } from "./PrimaryImage/PrimaryImage";
import { CharacterOverviewSummaryItems } from "./SummaryItems/SummaryItems";
import { CharacterOverviewDescription } from "./Description/Description";
import { ChangeOverviewBackground } from "./ChangeOverviewBackground/ChangeOverviewBackground";

// Logic
import { CharacterOverviewLogic } from "./OverviewLogic";

// Context

// Services

// Styles
import "./Overview.css";

// Assets

export const CharacterOverview = ({ innerRef }) => {
	const { characterOverviewBackground, characterVersion, characterOverviewForegrounds, overviewForegroundSizeRef } = CharacterOverviewLogic();

	return (
		<div className='character-overview-container'>
			<div ref={innerRef} className='character-overview'>
				<div className='character-overview-content'>
					<div className='character-overview-content-section-1'>
						<CharacterOverviewDescription />
					</div>
					<div className='character-overview-content-section-2'>
						<CharacterOverviewPrimaryImage />
						<CharacterOverviewSummaryItems />
					</div>
				</div>
				<ChangeOverviewBackground />
				<div
					className={
						!characterOverviewForegrounds.find((e) => e?._id === characterVersion?._id)?.image?.image ||
						characterOverviewForegrounds.find((e) => e?._id === characterVersion?._id)?.image?.image === "NO_IMAGE"
							? "character-overview-foreground-container character-overview-foreground-container-no-image"
							: "character-overview-foreground-container"
					}
				>
					<div
						className={
							"character-overview-foreground character-overview-foreground-alignment-" +
							characterVersion?.overviewForeground?.alignment
						}
					>
						{!characterOverviewForegrounds.find((e) => e?._id === characterVersion?._id)?.image?.image ||
						characterOverviewForegrounds.find((e) => e?._id === characterVersion?._id)?.image?.image === "NO_IMAGE" ? null : (
							<img
								src={characterOverviewForegrounds.find((e) => e?._id === characterVersion?._id)?.image?.image}
								alt=''
								style={{
									transform: `translate(${characterVersion?.overviewForeground?.position.join("px, ")}px)`,
									height: isNaN(
										overviewForegroundSizeRef?.current?.clientHeight *
											parseFloat(characterVersion?.overviewForeground?.scale * ((window.innerHeight + 200) / 1300))
									)
										? "0px"
										: overviewForegroundSizeRef?.current?.clientHeight *
										  parseFloat(characterVersion?.overviewForeground?.scale * ((window.innerHeight + 200) / 1300)),
									maxWidth: isNaN(
										overviewForegroundSizeRef?.current?.clientWidth * parseFloat(characterVersion?.overviewForeground?.scale)
									)
										? "0px"
										: overviewForegroundSizeRef?.current?.clientWidth * parseFloat(characterVersion?.overviewForeground?.scale),
								}}
							/>
						)}
						{!characterOverviewForegrounds.find((e) => e?._id === characterVersion?._id)?.image?.image ||
						characterOverviewForegrounds.find((e) => e?._id === characterVersion?._id)?.image?.image === "NO_IMAGE" ? null : (
							<div style={{ scale: characterVersion?.overviewForeground?.scale }}>
								<img
									ref={overviewForegroundSizeRef}
									className='character-overview-foreground-image-size'
									src={characterOverviewForegrounds.find((e) => e?._id === characterVersion?._id)?.image?.image}
									alt=''
								/>
							</div>
						)}
					</div>
				</div>
				<div
					className={
						!characterOverviewBackground || characterOverviewBackground === "NO_IMAGE"
							? "character-overview-background character-overview-background-no-image"
							: "character-overview-background"
					}
				>
					{!characterOverviewBackground || characterOverviewBackground === "NO_IMAGE" ? null : (
						<img src={characterOverviewBackground} alt='' />
					)}
				</div>
			</div>
		</div>
	);
};
