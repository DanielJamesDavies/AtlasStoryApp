// Packages

// Components
import { CharactersCharacterTypeName } from "./CharactersCharacterTypeName";
import { CharactersCharacterTypeDescription } from "./CharactersCharacterTypeDescription";
import { CharactersCharacterTypeColour } from "./CharactersCharacterTypeColour";
import { ConfirmDelete } from "../../../components/ConfirmDelete/ConfirmDelete";

// Logic
import { CharactersCharacterTypeLogic } from "./CharactersCharacterTypeLogic";

// Context

// Services

// Styles
import "./CharactersCharacterType.css";

// Assets

export const CharactersCharacterType = () => {
	const { isAuthorizedToEdit, characterType, deleteCharacterType } = CharactersCharacterTypeLogic();

	return (
		<div className='characters-character-type'>
			{!characterType ? null : (
				<>
					<div className='characters-character-type-primary'>
						<CharactersCharacterTypeName />
					</div>
					<CharactersCharacterTypeDescription />
					<CharactersCharacterTypeColour />
					<ConfirmDelete
						className='characters-character-type-delete-container'
						seamless={true}
						labelContext='this character type'
						onDelete={deleteCharacterType}
						state={characterType._id}
						isAuthorizedToEdit={isAuthorizedToEdit}
					/>
				</>
			)}
		</div>
	);
};
