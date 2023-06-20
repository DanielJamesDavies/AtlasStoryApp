// Packages

// Components
import { ContentItem } from "../../../../../../components/ContentItem/ContentItem";
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
	const { isAuthorizedToEdit, characterFaceImage, changeFaceImage, removeFaceImage, revertFaceImage, saveFaceImage, errors } =
		SettingsFaceImageLogic();

	return (
		<ContentItem hasBg={true} size='s'>
			<LabelContainer className='character-subpage-settings-face-image-container' label='Face Image'>
				<EditableContainer
					isAuthorizedToEdit={isAuthorizedToEdit}
					onRemove={removeFaceImage}
					onRevert={revertFaceImage}
					onSave={saveFaceImage}
				>
					<div className='character-subpage-settings-face-image-image'>
						{!characterFaceImage ? null : <img src={characterFaceImage} alt='' />}
					</div>
					<div>
						<div className='character-subpage-settings-face-image-image'>
							<ImageInput value={characterFaceImage} onChange={changeFaceImage} isCircular={true} />
						</div>
						<ErrorMessage errors={errors} />
					</div>
				</EditableContainer>
			</LabelContainer>
		</ContentItem>
	);
};
