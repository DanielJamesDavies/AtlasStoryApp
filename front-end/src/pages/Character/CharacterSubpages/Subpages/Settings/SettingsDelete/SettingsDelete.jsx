// Packages

// Components
import { LabelContainer } from "../../../../../../components/LabelContainer/LabelContainer";
import { ConfirmDelete } from "../../../../../../components/ConfirmDelete/ConfirmDelete";
import { ErrorMessage } from "../../../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { SettingsDeleteLogic } from "./SettingsDeleteLogic";

// Context

// Services

// Styles

// Assets

export const SettingsDelete = () => {
	const { isAuthorizedToEdit, deleteCharacter, errors } = SettingsDeleteLogic();

	return (
		<LabelContainer label='Delete Character' isInline={true}>
			<ConfirmDelete onDelete={deleteCharacter} seamless={true} isAuthorizedToEdit={isAuthorizedToEdit} labelContext='this character' />
			<ErrorMessage errors={errors} />
		</LabelContainer>
	);
};
