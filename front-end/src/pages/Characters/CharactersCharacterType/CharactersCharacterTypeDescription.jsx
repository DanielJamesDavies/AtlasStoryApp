// Packages

// Components
import { EditableContainer } from "../../../components/EditableContainer/EditableContainer";
import { Text } from "../../../components/Text/Text";
import { MultiLineTextInput } from "../../../components/MultiLineTextInput/MultiLineTextInput";

// Logic
import { CharactersCharacterTypeDescriptionLogic } from "./CharactersCharacterTypeDescriptionLogic";

// Context

// Services

// Styles

// Assets

export const CharactersCharacterTypeDescription = () => {
	const { isAuthorizedToEdit, characterType, changeCharacterTypeDescription, revertCharacterTypeDescription, saveCharacterTypeDescription } =
		CharactersCharacterTypeDescriptionLogic();

	return (
		<EditableContainer
			className='characters-character-type-description-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertCharacterTypeDescription}
			onSave={saveCharacterTypeDescription}
		>
			<div>{!characterType?.data?.description ? null : <Text value={characterType.data.description} />}</div>
			<div>
				{
					<MultiLineTextInput
						label='Description'
						value={characterType.data.description.join("\n")}
						onChange={changeCharacterTypeDescription}
						seamless={true}
					/>
				}
			</div>
		</EditableContainer>
	);
};
