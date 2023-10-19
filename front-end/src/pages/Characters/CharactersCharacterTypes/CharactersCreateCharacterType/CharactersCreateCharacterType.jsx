// Packages

// Components
import { PopUpContainer } from "../../../../components/PopUpContainer/PopUpContainer";
import { TextInput } from "../../../../components/TextInput/TextInput";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";
import { SubmitBtn } from "../../../../components/SubmitBtn/SubmitBtn";

// Logic
import { CharactersCreateCharacterTypeLogic } from "./CharactersCreateCharacterTypeLogic";

// Context

// Services

// Styles
import "./CharactersCreateCharacterType.css";
import { ColourPicker } from "../../../../components/ColourPicker/ColourPicker";

// Assets

export const CharactersCreateCharacterType = () => {
	const {
		isDisplayingCreateCharacterTypeForm,
		closeCreateCharacterTypeForm,
		characterTypeName,
		changeCharacterTypeName,
		characterTypeColour,
		changeCharacterTypeColour,
		errors,
		submitCreateCharacterType,
	} = CharactersCreateCharacterTypeLogic();

	return (
		<PopUpContainer
			className='characters-create-character-type-container'
			title='Create Character Type'
			isDisplaying={isDisplayingCreateCharacterTypeForm}
			onClosePopUp={closeCreateCharacterTypeForm}
		>
			<div className='characters-create-character-type-form'>
				<div className='characters-create-character-type-form-input-container'>
					<TextInput label='Name' value={characterTypeName} onChange={changeCharacterTypeName} isDark={true} />
					<ErrorMessage errors={errors} attribute='name' />
				</div>
				<div className='characters-create-character-type-form-input-container'>
					<div className='characters-create-character-type-form-input-label'>Colour</div>
					<ColourPicker
						value={characterTypeColour}
						onChange={changeCharacterTypeColour}
						enableEdit={true}
						pickerVerticalPlacement='bottom'
					/>
					<ErrorMessage errors={errors} attribute='colour' />
				</div>
				<ErrorMessage errors={errors} />
				<div className='characters-create-character-type-form-submit-container'>
					<SubmitBtn label='Create Character Type' onSubmit={submitCreateCharacterType} />
				</div>
			</div>
		</PopUpContainer>
	);
};
