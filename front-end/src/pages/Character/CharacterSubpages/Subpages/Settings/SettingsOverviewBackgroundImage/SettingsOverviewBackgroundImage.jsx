// Packages

// Components
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
	const { isAuthorizedToEdit, characterOverviewBackground, changeOverviewBackground, revertOverviewBackground, saveOverviewBackground, errors } =
		SettingsOverviewBackgroundImageLogic();

	return (
		<LabelContainer className='character-subpage-settings-overview-background-container' label='Overview Background Image'>
			<EditableContainer isAuthorizedToEdit={isAuthorizedToEdit} onRevert={revertOverviewBackground} onSave={saveOverviewBackground}>
				<div className='character-subpage-settings-overview-background-image'>
					{!characterOverviewBackground ? null : <img src={characterOverviewBackground} alt='' />}
				</div>
				<div>
					<div className='character-subpage-settings-overview-background-image'>
						<ImageInput value={characterOverviewBackground} onChange={changeOverviewBackground} />
					</div>
					<ErrorMessage errors={errors} />
				</div>
			</EditableContainer>
		</LabelContainer>
	);
};
