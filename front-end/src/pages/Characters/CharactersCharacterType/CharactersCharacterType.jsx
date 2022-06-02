// Packages

// Components
import { Text } from "../../../components/Text/Text";

// Logic
import { CharactersCharacterTypeLogic } from "./CharactersCharacterTypeLogic";

// Context

// Services

// Styles
import "./CharactersCharacterType.css";
import { MultiLineTextInput } from "../../../components/MultiLineTextInput/MultiLineTextInput";
import { TextInput } from "../../../components/TextInput/TextInput";

// Assets

export const CharactersCharacterType = () => {
	const {
		characterType,
		isEditingCharacterTypeName,
		beginEditingCharacterTypeName,
		changeCharacterTypeName,
		isEditingCharacterTypeDescription,
		beginEditingCharacterTypeDescription,
		changeCharacterTypeDescription,
	} = CharactersCharacterTypeLogic();

	return (
		<div className='characters-character-type'>
			<div className='characters-character-type-primary'>
				{!isEditingCharacterTypeName ? (
					<div className='characters-character-type-primary-title' onDoubleClick={beginEditingCharacterTypeName}>
						{characterType?.data?.name}
					</div>
				) : (
					<TextInput label='Name' value={characterType.data.name} onChange={changeCharacterTypeName} />
				)}
			</div>
			<div className='characters-character-type-description-container' onDoubleClick={beginEditingCharacterTypeDescription}>
				{!isEditingCharacterTypeDescription ? (
					!characterType?.data?.description ? null : (
						<Text value={characterType.data.description} />
					)
				) : (
					<MultiLineTextInput
						label='Description'
						value={characterType.data.description.join("\n")}
						onChange={changeCharacterTypeDescription}
					/>
				)}
			</div>
		</div>
	);
};
