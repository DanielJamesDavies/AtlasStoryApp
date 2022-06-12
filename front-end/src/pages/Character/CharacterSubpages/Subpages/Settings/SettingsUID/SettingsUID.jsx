// Packages

// Components
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { LabelContainer } from "../../../../../../components/LabelContainer/LabelContainer";
import { TextInput } from "../../../../../../components/TextInput/TextInput";
import { ErrorMessage } from "../../../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { SettingsUIDLogic } from "./SettingsUIDLogic";

// Context

// Services

// Styles

// Assets

export const SettingsUID = () => {
	const { isAuthorizedToEdit, uid, changeUid, revertUid, saveUid, errors } = SettingsUIDLogic();

	return (
		<LabelContainer label='Unique Identifier (UID)'>
			<EditableContainer isAuthorizedToEdit={isAuthorizedToEdit} onRevert={revertUid} onSave={saveUid}>
				<div>
					<div>{uid}</div>
					<ErrorMessage errors={errors} />
				</div>
				<div>
					<TextInput seamless={true} value={uid} onChange={changeUid} autoResize={true} />
					<ErrorMessage errors={errors} />
				</div>
			</EditableContainer>
		</LabelContainer>
	);
};
