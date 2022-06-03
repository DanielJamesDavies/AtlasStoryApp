// Packages

// Components
import { EditableContainer } from "../../../components/EditableContainer/EditableContainer";
import { Text } from "../../../components/Text/Text";
import { MultiLineTextInput } from "../../../components/MultiLineTextInput/MultiLineTextInput";
import { TextInput } from "../../../components/TextInput/TextInput";

// Logic
import { CharactersCharacterTypeLogic } from "./CharactersCharacterTypeLogic";

// Context

// Services

// Styles
import "./CharactersCharacterType.css";
import { ConfirmDelete } from "../../../components/ConfirmDelete/ConfirmDelete";

// Assets

export const CharactersCharacterType = () => {
	const {
		isAuthorizedToEdit,
		characterType,
		changeCharacterTypeName,
		revertCharacterTypeName,
		saveCharacterTypeName,
		changeCharacterTypeDescription,
		revertCharacterTypeDescription,
		saveCharacterTypeDescription,
		deleteCharacterType,
	} = CharactersCharacterTypeLogic();

	return (
		<div className='characters-character-type'>
			{!characterType ? null : (
				<>
					<div className='characters-character-type-primary'>
						<EditableContainer
							className='characters-character-type-title-container'
							isAuthorizedToEdit={isAuthorizedToEdit}
							onRevert={revertCharacterTypeName}
							onSave={saveCharacterTypeName}
						>
							<div className='characters-character-type-primary-title'>{characterType?.data?.name}</div>
							<TextInput label='Name' value={characterType.data.name} onChange={changeCharacterTypeName} seamless={true} />
						</EditableContainer>
					</div>
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
		</div>
	);
};
