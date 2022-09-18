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
	const { isAuthorizedToEdit, deleteSubstory, errors } = SettingsDeleteLogic();

	return (
		<LabelContainer label='Delete Substory' isInline={true}>
			<ConfirmDelete onDelete={deleteSubstory} seamless={true} isAuthorizedToEdit={isAuthorizedToEdit} labelContext='this substory' />
			<ErrorMessage errors={errors} />
		</LabelContainer>
	);
};
