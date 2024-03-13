// Packages

// Components
import { PopUpContainer } from "../../../../components/PopUpContainer/PopUpContainer";
import { TextInput } from "../../../../components/TextInput/TextInput";
import { ToggleInput } from "../../../../components/ToggleInput/ToggleInput";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";
import { SuggestionsMessage } from "../../../../components/SuggestionsMessage/SuggestionsMessage";
import { URLPreviewMessage } from "../../../../components/URLPreviewMessage/URLPreviewMessage";
import { SubmitBtn } from "../../../../components/SubmitBtn/SubmitBtn";

// Logic
import { CharactersCreateCharacterLogic } from "./CharactersCreateCharacterLogic";

// Context

// Services

// Styles
import "./CharactersCreateCharacter.css";

// Assets

export const CharactersCreateCharacter = () => {
	const {
		story_uid,
		isDisplayingCreateCharacterForm,
		closeCreateCharacterForm,
		characterName,
		changeCharacterName,
		characterUID,
		changeCharacterUID,
		characterUIDSuggestions,
		characterIsPrimaryCharacter,
		toggleCharacterIsPrimaryCharacter,
		errors,
		submitCreateCharacter,
	} = CharactersCreateCharacterLogic();

	return (
		<PopUpContainer
			className='characters-create-character-container'
			title='Create Character'
			isDisplaying={isDisplayingCreateCharacterForm}
			onClosePopUp={closeCreateCharacterForm}
		>
			<div className='characters-create-character-form'>
				<div className='characters-create-character-form-input-container'>
					<TextInput label='Name' value={characterName} onChange={changeCharacterName} isDark={true} />
					<ErrorMessage errors={errors} attribute='name' />
				</div>
				<div className='characters-create-character-form-input-container'>
					<TextInput label='Unique Identifier (UID)' value={characterUID} onChange={changeCharacterUID} isDark={true} />
					<ErrorMessage errors={errors} attribute='uid' />
					<SuggestionsMessage suggestions={characterUIDSuggestions} labelContext={"for UID"} />
					{characterUID.length === 0 ? null : (
						<URLPreviewMessage
							path={"s/" + story_uid + "/c/" + characterUID}
							label='With this UID, your character will be accessable on the following URL:'
						/>
					)}
					<ErrorMessage errors={errors} attribute='uid' />
				</div>
				<div className='characters-create-character-form-input-container'>
					<ToggleInput
						label='Primary Character'
						value={characterIsPrimaryCharacter}
						onToggle={toggleCharacterIsPrimaryCharacter}
						enableEdit={true}
					/>
					<ErrorMessage errors={errors} attribute='isPrimaryCharacter' />
				</div>
				<ErrorMessage errors={errors} />
				<div className='characters-create-character-form-submit-container'>
					<SubmitBtn label='Create Character' onSubmit={() => submitCreateCharacter()} />
				</div>
			</div>
		</PopUpContainer>
	);
};
