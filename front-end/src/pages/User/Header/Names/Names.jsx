// Packages

// Components
import { EditableContainer } from "../../../../components/EditableContainer/EditableContainer";
import { TextInput } from "../../../../components/TextInput/TextInput";

// Logic
import { NamesLogic } from "./NamesLogic";

// Context

// Services

// Styles
import "./Names.css";

// Assets

export const Names = () => {
	const { isAuthorizedToEdit, user, changeNickname, revertNickname, saveNickname } = NamesLogic();

	return (
		<div className={isAuthorizedToEdit ? "user-header-names user-header-names-is-authorized" : "user-header-names"}>
			<EditableContainer
				absolutePositionEditBtns={true}
				className='user-header-names-nickname-container'
				isAuthorizedToEdit={isAuthorizedToEdit}
				onRevert={revertNickname}
				onSave={saveNickname}
				higherEditBtns={true}
			>
				<div className='user-header-names-nickname'>{user?.data?.nickname}</div>
				<TextInput
					className='user-header-names-nickname'
					seamless={true}
					autoResize={true}
					value={user?.data?.nickname}
					onChange={changeNickname}
				/>
			</EditableContainer>
			<div className='user-header-names-username'>{!user?.username ? null : "@" + user?.username}</div>
		</div>
	);
};
