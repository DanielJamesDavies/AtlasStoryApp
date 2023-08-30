// Packages

// Components
import { ContentItem } from "../../../../../../components/ContentItem/ContentItem";
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { LabelContainer } from "../../../../../../components/LabelContainer/LabelContainer";
import { TextInput } from "../../../../../../components/TextInput/TextInput";
import { ErrorMessage } from "../../../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { SettingsUIDLogic } from "./SettingsUIDLogic";

// Context

// Services

// Styles
import "./SettingsUID.css";

// Assets

export const SettingsUID = () => {
	const { isAuthorizedToEdit, uid, changeUid, revertUid, saveUid, errors } = SettingsUIDLogic();

	return (
		<ContentItem hasBg={true} size='s'>
			<LabelContainer label='Unique Identifier (UID)' isInline={true}>
				<EditableContainer isAuthorizedToEdit={isAuthorizedToEdit} onRevert={revertUid} onSave={saveUid}>
					<div>{uid}</div>
					<div className='substory-settings-uid-editing'>
						<div className='substory-settings-uid-editing-input'>
							<TextInput seamless={true} value={uid} onChange={changeUid} autoResize={true} />
						</div>
						<ErrorMessage errors={errors} />
						<ErrorMessage errors={errors} attribute='uid' />
					</div>
				</EditableContainer>
			</LabelContainer>
		</ContentItem>
	);
};
