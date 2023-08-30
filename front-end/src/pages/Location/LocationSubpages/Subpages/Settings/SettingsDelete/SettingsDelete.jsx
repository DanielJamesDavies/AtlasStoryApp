// Packages

// Components
import { ContentItem } from "../../../../../../components/ContentItem/ContentItem";
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
	const { isAuthorizedToEdit, deleteLocation, errors } = SettingsDeleteLogic();

	return (
		<ContentItem hasBg={true} size='s'>
			<LabelContainer label='Delete Location' isInline={true}>
				<ConfirmDelete onDelete={deleteLocation} seamless={true} isAuthorizedToEdit={isAuthorizedToEdit} labelContext='this location' />
				<ErrorMessage errors={errors} />
			</LabelContainer>
		</ContentItem>
	);
};
