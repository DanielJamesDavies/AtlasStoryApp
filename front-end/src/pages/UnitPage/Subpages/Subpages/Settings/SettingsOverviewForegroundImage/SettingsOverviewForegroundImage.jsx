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
		unit_type,
		isAuthorizedToEdit,
		unitVersion,
		unitOverviewForegrounds,
		changeOverviewForeground,
		changeOverviewForegroundAlignment,
		changeOverviewForegroundPosition,
		changeOverviewForegroundScale,
		removeOverviewForeground,
		revertOverviewForeground,
		saveOverviewForeground,
	} = SettingsOverviewForegroundImageLogic();

	if (!["character", "group"].includes(unit_type)) return null;
	return (
		<ContentItem hasBg={true} size='s'>
			<LabelContainer
				className='unit-page-subpage-settings-overview-foreground-container'
				label={"Overview Foreground Image on Version: " + unitVersion?.title}
			>
				<EditableContainer
					isAuthorizedToEdit={isAuthorizedToEdit}
					onRemove={removeOverviewForeground}
					onRevert={revertOverviewForeground}
					onSave={saveOverviewForeground}
				>
					<div
						className={
							!unitOverviewForegrounds.find((e) => e?._id === unitVersion?._id)?.image?.image ||
							unitOverviewForegrounds.find((e) => e?._id === unitVersion?._id)?.image?.image === "NO_IMAGE"
								? "unit-page-subpage-settings-overview-foreground-image unit-page-subpage-settings-overview-foreground-image-no-image"
								: "unit-page-subpage-settings-overview-foreground-image"
						}
					>
						{!unitOverviewForegrounds.find((e) => e?._id === unitVersion?._id)?.image?.image ||
						unitOverviewForegrounds.find((e) => e?._id === unitVersion?._id)?.image?.image === "NO_IMAGE" ? null : (
							<img src={unitOverviewForegrounds.find((e) => e?._id === unitVersion?._id)?.image?.image} alt='' />
						)}
					</div>
					<div
						className={
							!unitOverviewForegrounds.find((e) => e?._id === unitVersion?._id)?.image?.image ||
							unitOverviewForegrounds.find((e) => e?._id === unitVersion?._id)?.image?.image === "NO_IMAGE"
								? "unit-page-subpage-settings-overview-foreground-image unit-page-subpage-settings-overview-foreground-image-no-image"
								: "unit-page-subpage-settings-overview-foreground-image"
						}
					>
						<ImageInput
							value={unitOverviewForegrounds.find((e) => e?._id === unitVersion?._id)?.image?.image}
							onChange={changeOverviewForeground}
						/>
						<LabelContainer label='Alignment' isInline={true}>
							<AlignmentInput value={unitVersion?.overviewForeground?.alignment} onChange={changeOverviewForegroundAlignment} />
						</LabelContainer>
						<LabelContainer label='Position' isInline={true}>
							<CoordinatesInput value={unitVersion?.overviewForeground?.position} onChange={changeOverviewForegroundPosition} />
						</LabelContainer>
						<LabelContainer label='Scale' isInline={true}>
							<CoordinatesInput value={[unitVersion?.overviewForeground?.scale]} onChange={changeOverviewForegroundScale} />
						</LabelContainer>
					</div>
				</EditableContainer>
			</LabelContainer>
		</ContentItem>
	);
};
