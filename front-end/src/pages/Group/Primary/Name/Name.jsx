// Packages

// Components
import { EditableContainer } from "../../../../components/EditableContainer/EditableContainer";
import { TextInput } from "../../../../components/TextInput/TextInput";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { GroupPrimaryNameLogic } from "./NameLogic";

// Context

// Services

// Styles
import "./Name.css";

// Assets

export const GroupPrimaryName = ({ primaryStoryStyles }) => {
	const { isAuthorizedToEdit, group, changeName, revertName, saveName, errors } = GroupPrimaryNameLogic();

	return (
		<EditableContainer
			className='group-primary-name-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertName}
			onSave={saveName}
			absolutePositionEditBtns={true}
			isLight={primaryStoryStyles["--text-colour-primary"] === "#fff"}
		>
			<div className='group-primary-name'>{group?.data?.name}</div>
			<div>
				<TextInput className='group-primary-name' seamless={true} value={group?.data?.name} onChange={changeName} autoResize={true} />
				<ErrorMessage errors={errors} />
			</div>
		</EditableContainer>
	);
};
