// Packages

// Components
import { EditableContainer } from "../../../components/EditableContainer/EditableContainer";
import { ContentItem } from "../../../components/ContentItem/ContentItem";
import { Text } from "../../../components/Text/Text";
import { MultiLineTextInput } from "../../../components/MultiLineTextInput/MultiLineTextInput";

// Logic
import { CharactersCharacterTypeDescriptionLogic } from "./CharactersCharacterTypeDescriptionLogic";

// Context

// Services

// Styles
import "./CharactersCharacterTypeDescription.css";

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
			<ContentItem className='characters-character-type-description' hasBg={true}>
				{!characterType?.data?.description ? null : <Text value={characterType.data.description} />}
			</ContentItem>
			<ContentItem className='characters-character-type-description' hasBg={true}>
				{
					<MultiLineTextInput
						label='Description'
						value={characterType.data.description.join("\n")}
						onChange={changeCharacterTypeDescription}
						seamless={true}
					/>
				}
			</ContentItem>
		</EditableContainer>
	);
};
