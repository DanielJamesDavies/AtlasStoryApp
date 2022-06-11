// Packages

// Components
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { LabelContainer } from "../../../../../../components/LabelContainer/LabelContainer";
import { TextInput } from "../../../../../../components/TextInput/TextInput";
import { ErrorMessage } from "../../../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { SettingsURLLogic } from "./SettingsURLLogic";

// Context

// Services

// Styles

// Assets

export const SettingsURL = () => {
	const { isAuthorizedToEdit, url, changeUrl, revertUrl, saveUrl, errors } = SettingsURLLogic();

	return (
		<LabelContainer label='URL'>
			<EditableContainer isAuthorizedToEdit={isAuthorizedToEdit} onRevert={revertUrl} onSave={saveUrl}>
				<div>
					<div>{url}</div>
					<ErrorMessage errors={errors} />
				</div>
				<div>
					<TextInput seamless={true} value={url} onChange={changeUrl} autoResize={true} />
					<ErrorMessage errors={errors} />
				</div>
			</EditableContainer>
		</LabelContainer>
	);
};
