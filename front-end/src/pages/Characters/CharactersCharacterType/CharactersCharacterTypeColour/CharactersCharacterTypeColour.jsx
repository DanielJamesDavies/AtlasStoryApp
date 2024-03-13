// Packages

// Components
import { EditableContainer } from "../../../../components/EditableContainer/EditableContainer";
import { ContentItem } from "../../../../components/ContentItem/ContentItem";
import { ColourPicker } from "../../../../components/ColourPicker/ColourPicker";

// Logic
import { CharactersCharacterTypeColourLogic } from "./CharactersCharacterTypeColourLogic";

// Context

// Services

// Styles
import "./CharactersCharacterTypeColour.css";

// Assets

export const CharactersCharacterTypeColour = () => {
	const { isAuthorizedToEdit, characterType, changeCharacterTypeColour, revertCharacterTypeColour, saveCharacterTypeColour } =
		CharactersCharacterTypeColourLogic();

	return (
		<EditableContainer
			className='characters-character-type-colour-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertCharacterTypeColour}
			onSave={saveCharacterTypeColour}
		>
			<ContentItem className='characters-character-type-colour'>
				<ColourPicker value={characterType.data.colour} onChange={changeCharacterTypeColour} enableEdit={false} />
			</ContentItem>
			<ContentItem className='characters-character-type-colour'>
				<ColourPicker value={characterType.data.colour} onChange={changeCharacterTypeColour} enableEdit={true} />
			</ContentItem>
		</EditableContainer>
	);
};
