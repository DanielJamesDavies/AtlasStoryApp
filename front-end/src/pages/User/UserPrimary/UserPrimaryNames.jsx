// Packages

// Components
import { EditableContainer } from "../../../components/EditableContainer/EditableContainer";
import { TextInput } from "../../../components/TextInput/TextInput";

// Logic
import { UserPrimaryNamesLogic } from "./UserPrimaryNamesLogic";

// Context

// Services

// Styles
import "./UserPrimaryNames.css";

// Assets

export const UserPrimaryNames = () => {
	const { isAuthorizedToEdit, user, changeNickname, revertNickname, saveNickname } = UserPrimaryNamesLogic();

	return (
		<div className={isAuthorizedToEdit ? "user-primary-names user-primary-names-is-authorized" : "user-primary-names"}>
			<EditableContainer
				absolutePositionEditBtns={true}
				className='user-primary-names-nickname-container'
				isAuthorizedToEdit={isAuthorizedToEdit}
				onRevert={revertNickname}
				onSave={saveNickname}
			>
				<div className='user-primary-names-nickname'>{user?.data?.nickname}</div>
				<TextInput
					className='user-primary-names-nickname'
					seamless={true}
					autoResize={true}
					value={user?.data?.nickname}
					onChange={changeNickname}
				/>
			</EditableContainer>
			<div className='user-primary-names-username'>{!user?.username ? null : "@" + user?.username}</div>
		</div>
	);
};
