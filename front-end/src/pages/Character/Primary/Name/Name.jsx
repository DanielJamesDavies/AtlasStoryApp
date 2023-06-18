// Packages

// Components
import { EditableContainer } from "../../../../components/EditableContainer/EditableContainer";
import { TextInput } from "../../../../components/TextInput/TextInput";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { CharacterPrimaryNameLogic } from "./NameLogic";

// Context

// Services

// Styles
import "./Name.css";

// Assets

export const CharacterPrimaryName = ({ primaryStoryStyles }) => {
	const { isAuthorizedToEdit, character, changeName, revertName, saveName, errors } = CharacterPrimaryNameLogic();

	return (
		<EditableContainer
			className='character-primary-name-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertName}
			onSave={saveName}
			absolutePositionEditBtns={true}
			isLight={primaryStoryStyles["--text-colour-primary"] === "#fff"}
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
