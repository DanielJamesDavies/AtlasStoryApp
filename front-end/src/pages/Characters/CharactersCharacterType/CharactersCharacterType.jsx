// Packages

// Components
import { CharactersCharacterTypeName } from "./CharactersCharacterTypeName/CharactersCharacterTypeName";
import { CharactersCharacterTypeDescription } from "./CharactersCharacterTypeDescription/CharactersCharacterTypeDescription";
import { CharactersCharacterTypeColour } from "./CharactersCharacterTypeColour/CharactersCharacterTypeColour";
import { ContentItem } from "../../../components/ContentItem/ContentItem";
import { ConfirmDelete } from "../../../components/ConfirmDelete/ConfirmDelete";

// Logic
import { CharactersCharacterTypeLogic } from "./CharactersCharacterTypeLogic";

// Context

// Services

// Styles
import "./CharactersCharacterType.css";

// Assets

export const CharactersCharacterType = () => {
	const { isAuthorizedToEdit, story, characterType, deleteCharacterType } = CharactersCharacterTypeLogic();

	if (!isAuthorizedToEdit && (!story?.data?.characterTypes || story?.data?.characterTypes.length === 0)) return null;
	return (
		<div className='characters-character-type-container'>
			<ContentItem className='characters-character-type'>
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
			</ContentItem>
		</div>
	);
};
