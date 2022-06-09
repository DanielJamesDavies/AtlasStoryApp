// Packages

// Components
import { EditableContainer } from "../../../../components/EditableContainer/EditableContainer";
import { DropdownContainer } from "../../../../components/DropdownContainer/DropdownContainer";

// Logic
import { CharacterPrimaryTypeLogic } from "./CharacterPrimaryTypeLogic";

// Context

// Services

// Styles
import "./CharacterPrimaryType.css";

// Assets

export const CharacterPrimaryType = () => {
	const { isAuthorizedToEdit, story, characterTypes, characterType, changeCharacterType, revertCharacterType, saveCharacterType } =
		CharacterPrimaryTypeLogic();

	return (
		<EditableContainer
			className='character-primary-type-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertCharacterType}
			onSave={saveCharacterType}
		>
			<div className='character-primary-type' style={characterType?.data?.colour ? { background: characterType.data.colour } : {}}>
				<div className='character-primary-type-text'>{characterType?.data?.name}</div>
			</div>
			<DropdownContainer
				className='character-primary-type-dropdown'
				style={characterType?.data?.colour ? { background: characterType.data.colour } : {}}
				seamless={true}
				value={characterType?.data?.name}
				onChange={changeCharacterType}
				includeUnselectedOption={true}
			>
				{story?.data?.characterTypes.map((characterTypeID, index) => (
					<div key={index} is-active={(characterTypeID === characterType?._id).toString()}>
						{characterTypes.find((e) => e._id === characterTypeID)?.data?.name}
					</div>
				))}
			</DropdownContainer>
		</EditableContainer>
	);
};
