// Packages

// Components
import { EditableContainer } from "../../../../components/EditableContainer/EditableContainer";
import { TextInput } from "../../../../components/TextInput/TextInput";

// Logic
import { CharactersCharacterTypeNameLogic } from "./CharactersCharacterTypeNameLogic";

// Context

// Services

// Styles
import "./CharactersCharacterTypeName.css";

// Assets

export const CharactersCharacterTypeName = () => {
	const { isAuthorizedToEdit, characterType, changeCharacterTypeName, revertCharacterTypeName, saveCharacterTypeName } =
		CharactersCharacterTypeNameLogic();

	return (
		<EditableContainer
			className='characters-character-type-name-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertCharacterTypeName}
			onSave={saveCharacterTypeName}
		>
			<div className='characters-character-type-primary-name'>{characterType?.data?.name}</div>
			<TextInput label='Name' value={characterType.data.name} onChange={changeCharacterTypeName} seamless={true} />
		</EditableContainer>
	);
};
