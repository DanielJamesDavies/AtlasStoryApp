// Packages

// Components
import { ContentItem } from "../../../../../components/ContentItem/ContentItem";
import { ConfirmDelete } from "../../../../../components/ConfirmDelete/ConfirmDelete";
import { ErrorMessage } from "../../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { DeleteLogic } from "./DeleteLogic";

// Context

// Services

// Styles
import "./Delete.css";

// Assets

export const Delete = () => {
	const { isAuthorizedToEdit, isDisplayingSettings, errors, deleteUser } = DeleteLogic();

	return (
		<ContentItem className='settings-item' size='s' hasBg={true}>
			<div className='settings-item-title'>Delete Account</div>
			<ConfirmDelete
				state={isDisplayingSettings}
				className='user-settings-confirm-delete'
				seamless={true}
				labelContext='your account'
				onDelete={deleteUser}
				isAuthorizedToEdit={isAuthorizedToEdit}
			/>
			<ErrorMessage errors={errors} />
		</ContentItem>
	);
};
