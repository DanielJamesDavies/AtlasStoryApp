// Packages

// Components
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { TextInput } from "../../../../../../components/TextInput/TextInput";
import { ErrorMessage } from "../../../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { SettingsURLLogic } from "./SettingsURLLogic";

// Context

// Services

// Styles
import "./SettingsURL.css";

// Assets

export const SettingsURL = () => {
	const { isAuthorizedToEdit, url, changeUrl, revertUrl, saveUrl, errors } = SettingsURLLogic();

	return (
		<div className='character-subpage-settings-url'>
			<div className='character-subpage-settings-url-label'>URL</div>
			<EditableContainer
				className='character-subpage-settings-url-value-container'
				isAuthorizedToEdit={isAuthorizedToEdit}
				onRevert={revertUrl}
				onSave={saveUrl}
			>
				<div className='character-subpage-settings-url-value'>
					<div>{url}</div>
					<ErrorMessage errors={errors} />
				</div>
				<div>
					<TextInput
						className='character-subpage-settings-url-value'
						seamless={true}
						value={url}
						onChange={changeUrl}
						autoResize={true}
					/>
					<ErrorMessage errors={errors} />
				</div>
			</EditableContainer>
		</div>
	);
};
