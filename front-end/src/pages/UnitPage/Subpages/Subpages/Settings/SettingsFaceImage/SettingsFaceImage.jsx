// Packages

// Components
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { LabelContainer } from "../../../../../../components/LabelContainer/LabelContainer";
import { ImageInput } from "../../../../../../components/ImageInput/ImageInput";
import { ErrorMessage } from "../../../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { SettingsFaceImageLogic } from "./SettingsFaceImageLogic";

// Context

// Services

// Styles
import "./SettingsFaceImage.css";

// Assets

export const SettingsFaceImage = () => {
	const { unit_type, isAuthorizedToEdit, characterFaceImage, changeFaceImage, removeFaceImage, revertFaceImage, saveFaceImage, errors } =
		SettingsFaceImageLogic();

	if (!["character"].includes(unit_type)) return null;
	return (
		<LabelContainer className='unit-page-subpage-settings-item unit-page-subpage-settings-face-image-container' label='Face Image'>
			<EditableContainer isAuthorizedToEdit={isAuthorizedToEdit} onRemove={removeFaceImage} onRevert={revertFaceImage} onSave={saveFaceImage}>
				<div className='unit-page-subpage-settings-face-image-image'>
					{!characterFaceImage ? null : <img src={characterFaceImage} alt='' />}
				</div>
				<div>
					<div className='unit-page-subpage-settings-face-image-image'>
						<ImageInput value={characterFaceImage} onChange={changeFaceImage} isCircular={true} />
					</div>
					<ErrorMessage errors={errors} />
				</div>
			</EditableContainer>
		</LabelContainer>
	);
};
