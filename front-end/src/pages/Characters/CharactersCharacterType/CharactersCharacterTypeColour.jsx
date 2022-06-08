// Packages

// Components
import { EditableContainer } from "../../../components/EditableContainer/EditableContainer";
import { ColourPicker } from "../../../components/ColourPicker/ColourPicker";

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
			<div className='characters-character-type-colour'>
				<ColourPicker value={characterType.data.colour} onChange={changeCharacterTypeColour} enableEdit={false} />
			</div>
			<div className='characters-character-type-colour'>
				<ColourPicker value={characterType.data.colour} onChange={changeCharacterTypeColour} enableEdit={true} />
			</div>
		</EditableContainer>
	);
};
