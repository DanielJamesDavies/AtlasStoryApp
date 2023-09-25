// Packages

// Components
import { EditableContainer } from "../../../../components/EditableContainer/EditableContainer";
import { DropdownContainer } from "../../../../components/DropdownContainer/DropdownContainer";

// Logic
import { CharacterTypeLogic } from "./CharacterTypeLogic";

// Context

// Services

// Styles
import "./CharacterType.css";

// Assets

export const CharacterType = ({ primaryStoryStyles }) => {
	const { isAuthorizedToEdit, story, storyCharacterTypes, characterType, changeCharacterType, revertCharacterType, saveCharacterType } =
		CharacterTypeLogic();

	return (
		<EditableContainer
			className='unit-page-primary-type-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertCharacterType}
			onSave={saveCharacterType}
			absolutePositionEditBtns={true}
			isLight={primaryStoryStyles["--text-colour-primary"] === "#fff"}
		>
			<div className='unit-page-primary-type' style={characterType?.data?.colour ? { background: characterType.data.colour } : {}}>
				<div className='unit-page-primary-type-text'>{characterType?.data?.name}</div>
			</div>
			<DropdownContainer
				className='unit-page-primary-type-dropdown'
				style={characterType?.data?.colour ? { background: characterType.data.colour } : {}}
				seamless={true}
				value={characterType?.data?.name}
				onChange={changeCharacterType}
				includeUnselectedOption={true}
			>
				{story?.data?.characterTypes.map((characterTypeID, index) => (
					<div key={index} is-active={(characterTypeID === characterType?._id).toString()}>
						{storyCharacterTypes.find((e) => e._id === characterTypeID)?.data?.name}
					</div>
				))}
			</DropdownContainer>
		</EditableContainer>
	);
};
