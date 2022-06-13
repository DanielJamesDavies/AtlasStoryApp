// Packages

// Components
import { EditableContainer } from "../../../../components/EditableContainer/EditableContainer";
import { TextInput } from "../../../../components/TextInput/TextInput";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { StorySettingsUIDLogic } from "./StorySettingsUIDLogic";

// Context

// Services

// Styles

// Assets

export const StorySettingsUID = () => {
	const { isAuthorizedToEdit, uid, changeUid, revertUid, saveUid, errors } = StorySettingsUIDLogic();

	return (
		<EditableContainer className='story-settings-input-container' isAuthorizedToEdit={isAuthorizedToEdit} onRevert={revertUid} onSave={saveUid}>
			<div className='story-settings-input-value'>{uid}</div>
			<div>
				<TextInput className='story-settings-input-value' seamless={true} value={uid} onChange={changeUid} autoResize={true} />
				<ErrorMessage errors={errors} />
			</div>
		</EditableContainer>
	);
};
