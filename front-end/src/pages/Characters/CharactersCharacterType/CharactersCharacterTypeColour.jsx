// Packages

// Components
import { EditableContainer } from "../../../components/EditableContainer/EditableContainer";
import { TextInput } from "../../../components/TextInput/TextInput";

// Logic
import { CharactersCharacterTypeColourLogic } from "./CharactersCharacterTypeColourLogic";

// Context

// Services

// Styles
import "./CharactersCharacterTypeColour.css";

// Assets

export const CharactersCharacterTypeColour = () => {
	const { isAuthorizedToEdit, characterType, colourBlockStyle, changeCharacterTypeColour, revertCharacterTypeColour, saveCharacterTypeColour } =
		CharactersCharacterTypeColourLogic();

	return (
		<EditableContainer
			className='characters-character-type-colour-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertCharacterTypeColour}
			onSave={saveCharacterTypeColour}
		>
			<div className='characters-character-type-colour'>
				<div className='characters-character-type-colour-block' style={colourBlockStyle} />
				<div className='characters-character-type-colour-text'>{characterType?.data?.colour}</div>
			</div>
			<div className='characters-character-type-colour'>
				<div className='characters-character-type-colour-block' style={colourBlockStyle} />
				<TextInput label='Colour' value={characterType.data.colour} onChange={changeCharacterTypeColour} seamless={true} />
			</div>
		</EditableContainer>
	);
};
