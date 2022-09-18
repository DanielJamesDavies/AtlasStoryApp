// Packages

// Components
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { LabelContainer } from "../../../../../../components/LabelContainer/LabelContainer";
import { ImageInput } from "../../../../../../components/ImageInput/ImageInput";
import { ErrorMessage } from "../../../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { SettingsPosterBackgroundImageLogic } from "./SettingsPosterBackgroundImageLogic";

// Context

// Services

// Styles
import "./SettingsPosterBackgroundImage.css";

// Assets

export const SettingsPosterBackgroundImage = () => {
	const { isAuthorizedToEdit, substoryPosterBackground, changePosterBackground, revertPosterBackground, savePosterBackground, errors } =
		SettingsPosterBackgroundImageLogic();

	return (
		<LabelContainer className='substory-subpage-settings-poster-background-container' label='Poster Background Image'>
			<EditableContainer isAuthorizedToEdit={isAuthorizedToEdit} onRevert={revertPosterBackground} onSave={savePosterBackground}>
				<div className='substory-subpage-settings-poster-background-image'>
					{!substoryPosterBackground ? null : <img src={substoryPosterBackground} alt='' />}
				</div>
				<div>
					<div className='substory-subpage-settings-poster-background-image'>
						<ImageInput value={substoryPosterBackground} onChange={changePosterBackground} />
					</div>
					<ErrorMessage errors={errors} />
				</div>
			</EditableContainer>
		</LabelContainer>
	);
};
