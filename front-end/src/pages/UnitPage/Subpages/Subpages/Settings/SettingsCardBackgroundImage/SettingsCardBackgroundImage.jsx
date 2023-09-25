// Packages

// Components
import { ContentItem } from "../../../../../../components/ContentItem/ContentItem";
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { LabelContainer } from "../../../../../../components/LabelContainer/LabelContainer";
import { ImageInput } from "../../../../../../components/ImageInput/ImageInput";
import { ErrorMessage } from "../../../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { SettingsCardBackgroundImageLogic } from "./SettingsCardBackgroundImageLogic";

// Context

// Services

// Styles
import "./SettingsCardBackgroundImage.css";

// Assets

export const SettingsCardBackgroundImage = () => {
	const {
		unit_type,
		isAuthorizedToEdit,
		characterCardBackground,
		changeCardBackground,
		removeCardBackground,
		revertCardBackground,
		saveCardBackground,
		errors,
	} = SettingsCardBackgroundImageLogic();

	if (!["character"].includes(unit_type)) return null;
	return (
		<ContentItem hasBg={true} size='s'>
			<LabelContainer className='unit-page-subpage-settings-card-background-container' label='Card Background Image'>
				<EditableContainer
					isAuthorizedToEdit={isAuthorizedToEdit}
					onRemove={removeCardBackground}
					onRevert={revertCardBackground}
					onSave={saveCardBackground}
				>
					<div className='unit-page-subpage-settings-card-background-image'>
						{!characterCardBackground ? null : <img src={characterCardBackground} alt='' />}
					</div>
					<div>
						<div className='unit-page-subpage-settings-card-background-image'>
							<ImageInput value={characterCardBackground} onChange={changeCardBackground} />
						</div>
						<ErrorMessage errors={errors} />
					</div>
				</EditableContainer>
			</LabelContainer>
		</ContentItem>
	);
};
