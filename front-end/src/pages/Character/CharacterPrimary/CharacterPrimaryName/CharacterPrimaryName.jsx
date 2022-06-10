// Packages

// Components
import { EditableContainer } from "../../../../components/EditableContainer/EditableContainer";
import { TextInput } from "../../../../components/TextInput/TextInput";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { CharacterPrimaryNameLogic } from "./CharacterPrimaryNameLogic";

// Context

// Services

// Styles
import "./CharacterPrimaryName.css";

// Assets

export const CharacterPrimaryName = () => {
	const { isAuthorizedToEdit, character, changeName, revertName, saveName, errors } = CharacterPrimaryNameLogic();

	return (
		<EditableContainer
			className='character-primary-name-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertName}
			onSave={saveName}
		>
			<div className='character-primary-name'>{character?.data?.name}</div>
			<div>
				<TextInput
					className='character-primary-name'
					seamless={true}
					value={character?.data?.name}
					onChange={changeName}
					autoResize={true}
				/>
				<ErrorMessage errors={errors} />
			</div>
		</EditableContainer>
	);
};
