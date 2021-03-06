// Packages

// Components
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
	const { isAuthorizedToEdit, characterCardBackground, changeCardBackground, revertCardBackground, saveCardBackground, errors } =
		SettingsCardBackgroundImageLogic();

	return (
		<LabelContainer className='character-subpage-settings-card-background-container' label='Card Background Image'>
			<EditableContainer isAuthorizedToEdit={isAuthorizedToEdit} onRevert={revertCardBackground} onSave={saveCardBackground}>
				<div className='character-subpage-settings-card-background-image'>
					{!characterCardBackground ? null : <img src={characterCardBackground} alt='' />}
				</div>
				<div>
					<div className='character-subpage-settings-card-background-image'>
						<ImageInput value={characterCardBackground} onChange={changeCardBackground} />
					</div>
					<ErrorMessage errors={errors} />
				</div>
			</EditableContainer>
		</LabelContainer>
	);
};
