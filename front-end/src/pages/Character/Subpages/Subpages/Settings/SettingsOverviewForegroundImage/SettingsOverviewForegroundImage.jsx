// Packages

// Components
import { ContentItem } from "../../../../../../components/ContentItem/ContentItem";
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { LabelContainer } from "../../../../../../components/LabelContainer/LabelContainer";
import { ImageInput } from "../../../../../../components/ImageInput/ImageInput";
import { AlignmentInput } from "../../../../../../components/AlignmentInput/AlignmentInput";

// Logic
import { SettingsOverviewForegroundImageLogic } from "./SettingsOverviewForegroundImageLogic";

// Context

// Services

// Styles
import "./SettingsOverviewForegroundImage.css";
import { CoordinatesInput } from "../../../../../../components/CoordinatesInput/CoordinatesInput";

// Assets

export const SettingsOverviewForegroundImage = () => {
	const {
		isAuthorizedToEdit,
		characterVersion,
		characterOverviewForegrounds,
		changeOverviewForeground,
		changeOverviewForegroundAlignment,
		changeOverviewForegroundPosition,
		changeOverviewForegroundScale,
		removeOverviewForeground,
		revertOverviewForeground,
		saveOverviewForeground,
	} = SettingsOverviewForegroundImageLogic();

	return (
		<ContentItem hasBg={true} size='s'>
			<LabelContainer
				className='character-subpage-settings-overview-foreground-container'
				label={"Overview Foreground Image on Version: " + characterVersion?.title}
			>
				<EditableContainer
					isAuthorizedToEdit={isAuthorizedToEdit}
					onRemove={removeOverviewForeground}
					onRevert={revertOverviewForeground}
					onSave={saveOverviewForeground}
				>
					<div
						className={
							!characterOverviewForegrounds.find((e) => e?._id === characterVersion?._id)?.image?.image ||
							characterOverviewForegrounds.find((e) => e?._id === characterVersion?._id)?.image?.image === "NO_IMAGE"
								? "character-subpage-settings-overview-foreground-image character-subpage-settings-overview-foreground-image-no-image"
								: "character-subpage-settings-overview-foreground-image"
						}
					>
						{!characterOverviewForegrounds.find((e) => e?._id === characterVersion?._id)?.image?.image ||
						characterOverviewForegrounds.find((e) => e?._id === characterVersion?._id)?.image?.image === "NO_IMAGE" ? null : (
							<img src={characterOverviewForegrounds.find((e) => e?._id === characterVersion?._id)?.image?.image} alt='' />
						)}
					</div>
					<div
						className={
							!characterOverviewForegrounds.find((e) => e?._id === characterVersion?._id)?.image?.image ||
							characterOverviewForegrounds.find((e) => e?._id === characterVersion?._id)?.image?.image === "NO_IMAGE"
								? "character-subpage-settings-overview-foreground-image character-subpage-settings-overview-foreground-image-no-image"
								: "character-subpage-settings-overview-foreground-image"
						}
					>
						<ImageInput
							value={characterOverviewForegrounds.find((e) => e?._id === characterVersion?._id)?.image?.image}
							onChange={changeOverviewForeground}
						/>
						<LabelContainer label='Alignment' isInline={true}>
							<AlignmentInput value={characterVersion?.overviewForeground?.alignment} onChange={changeOverviewForegroundAlignment} />
						</LabelContainer>
						<LabelContainer label='Position' isInline={true}>
							<CoordinatesInput value={characterVersion?.overviewForeground?.position} onChange={changeOverviewForegroundPosition} />
						</LabelContainer>
						<LabelContainer label='Scale' isInline={true}>
							<CoordinatesInput value={[characterVersion?.overviewForeground?.scale]} onChange={changeOverviewForegroundScale} />
						</LabelContainer>
					</div>
				</EditableContainer>
			</LabelContainer>
		</ContentItem>
	);
};
