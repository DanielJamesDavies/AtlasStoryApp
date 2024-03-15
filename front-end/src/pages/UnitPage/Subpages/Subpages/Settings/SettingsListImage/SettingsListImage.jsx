// Packages

// Components
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { LabelContainer } from "../../../../../../components/LabelContainer/LabelContainer";
import { ImageInput } from "../../../../../../components/ImageInput/ImageInput";
import { ErrorMessage } from "../../../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { SettingsListImageLogic } from "./SettingsListImageLogic";

// Context

// Services

// Styles
import "./SettingsListImage.css";

// Assets

export const SettingsListImage = () => {
	const { unit_type, isAuthorizedToEdit, unitListImage, changeListImage, removeListImage, revertListImage, saveListImage, errors } =
		SettingsListImageLogic();

	if (!["object", "lore"].includes(unit_type)) return null;
	return (
		<LabelContainer className='unit-page-subpage-settings-item unit-page-subpage-settings-list-image-container' label='List Image'>
			<EditableContainer isAuthorizedToEdit={isAuthorizedToEdit} onRemove={removeListImage} onRevert={revertListImage} onSave={saveListImage}>
				<div className='unit-page-subpage-settings-list-image-image'>
					{!unitListImage || unitListImage === "NO_IMAGE" ? null : <img src={unitListImage} alt='' />}
				</div>
				<div>
					<div className='unit-page-subpage-settings-list-image-image'>
						<ImageInput value={unitListImage} onChange={changeListImage} maxFileSizeInKBs={50} />
					</div>
					<ErrorMessage errors={errors} />
				</div>
			</EditableContainer>
		</LabelContainer>
	);
};
