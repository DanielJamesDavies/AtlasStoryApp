// Packages

// Components
import { TextInput } from "../../../components/TextInput/TextInput";
import { ToggleInput } from "../../../components/ToggleInput/ToggleInput";
import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";
import { SubmitBtn } from "../../../components/SubmitBtn/SubmitBtn";

// Logic
import { CharactersCreateCharacterLogic } from "./CharactersCreateCharacterLogic";

// Context

// Services

// Styles
import "./CharactersCreateCharacter.css";

// Assets

export const CharactersCreateCharacter = () => {
	const {
		isDisplayingCreateCharacterForm,
		closeCreateCharacterForm,
		characterName,
		changeCharacterName,
		characterURL,
		changeCharacterURL,
		characterIsPrimaryCharacter,
		toggleCharacterIsPrimaryCharacter,
		errors,
		submitCreateCharacter,
	} = CharactersCreateCharacterLogic();

	if (!isDisplayingCreateCharacterForm) return null;
	return (
		<div className='characters-create-character-container'>
			<div className='characters-create-character-form'>
				<div className='characters-create-character-form-title'>Create Character</div>
				<div className='characters-create-character-form-input-container'>
					<TextInput label='Name' value={characterName} onChange={changeCharacterName} isDark={true} />
					<ErrorMessage errors={errors} attribute='name' />
				</div>
				<div className='characters-create-character-form-input-container'>
					<TextInput label='URL' value={characterURL} onChange={changeCharacterURL} isDark={true} />
					<ErrorMessage errors={errors} attribute='url' />
				</div>
				<div className='user-stories-create-story-form-input-container'>
					<ToggleInput label='Primary Character' value={characterIsPrimaryCharacter} onToggle={toggleCharacterIsPrimaryCharacter} />
					<ErrorMessage errors={errors} attribute='isPrimaryCharacter' />
				</div>
				<div className='characters-create-character-form-submit-container'>
					<SubmitBtn label='Create Character' onSubmit={submitCreateCharacter} />
				</div>
			</div>
			<div className='characters-create-character-background' onClick={closeCreateCharacterForm} />
		</div>
	);
};
