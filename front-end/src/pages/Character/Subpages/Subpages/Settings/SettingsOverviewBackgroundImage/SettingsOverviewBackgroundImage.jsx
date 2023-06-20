// Packages

// Components
import { ContentItem } from "../../../../../../components/ContentItem/ContentItem";
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { LabelContainer } from "../../../../../../components/LabelContainer/LabelContainer";
import { ImageInput } from "../../../../../../components/ImageInput/ImageInput";
import { ErrorMessage } from "../../../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { SettingsOverviewBackgroundImageLogic } from "./SettingsOverviewBackgroundImageLogic";

// Context

// Services

// Styles
import "./SettingsOverviewBackgroundImage.css";

// Assets

export const SettingsOverviewBackgroundImage = () => {
	const {
		isAuthorizedToEdit,
		characterOverviewBackground,
		changeOverviewBackground,
		removeOverviewBackground,
		revertOverviewBackground,
		saveOverviewBackground,
		errors,
	} = SettingsOverviewBackgroundImageLogic();

	return (
		<ContentItem hasBg={true} size='s'>
			<LabelContainer className='character-subpage-settings-overview-background-container' label='Overview Background Image'>
				<EditableContainer
					isAuthorizedToEdit={isAuthorizedToEdit}
					onRemove={removeOverviewBackground}
					onRevert={revertOverviewBackground}
					onSave={saveOverviewBackground}
				>
					<div className='character-subpage-settings-overview-background-image'>
						{!characterOverviewBackground || characterOverviewBackground === "NO_IMAGE" ? null : (
							<img src={characterOverviewBackground} alt='' />
						)}
					</div>
					<div>
						<div className='character-subpage-settings-overview-background-image'>
							<ImageInput value={characterOverviewBackground} onChange={changeOverviewBackground} />
						</div>
						<ErrorMessage errors={errors} />
					</div>
				</EditableContainer>
			</LabelContainer>
		</ContentItem>
	);
};
