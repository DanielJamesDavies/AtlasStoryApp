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
	const { isAuthorizedToEdit, group, deleteGroup, errors } = SettingsDeleteLogic();

	return (
		<ContentItem hasBg={true} size='s'>
			<LabelContainer label='Delete Group' isInline={true}>
				{group?.data?.characters?.length !== 0 ? (
					"You Cannot Delete a Group Containing Characters"
				) : (
					<ConfirmDelete onDelete={deleteGroup} seamless={true} isAuthorizedToEdit={isAuthorizedToEdit} labelContext='this group' />
				)}
				<ErrorMessage errors={errors} />
			</LabelContainer>
		</ContentItem>
	);
};
