// Packages

// Components
import { CharactersRelationshipsInfoSelectedCharacterRelationshipItem } from "./RelationshipItem/CharactersRelationshipsInfoSelectedCharacterRelationshipItem";
import { EditableContainer } from "../../../../../components/EditableContainer/EditableContainer";

// Logic
import { CharactersRelationshipsInfoSelectedCharacterLogic } from "./CharactersRelationshipsInfoSelectedCharacterLogic";

// Context

// Services

// Styles
import "./CharactersRelationshipsInfoSelectedCharacter.css";

// Assets

export const CharactersRelationshipsInfoSelectedCharacter = () => {
	const {
		isAuthorizedToEdit,
		selectedCharacterRelationshipsCharacterId,
		selectedCharacter,
		selectedCharacterRelationships,
		revertRelationships,
		saveRelationships,
		addRelationship,
	} = CharactersRelationshipsInfoSelectedCharacterLogic();

	if (!selectedCharacterRelationshipsCharacterId || !selectedCharacter) return null;
	return (
		<div className='characters-relationship-info-home-selected-character-container'>
			<div className='characters-relationship-info-home-selected-character-title'>
				{selectedCharacter?.data?.name}
				{selectedCharacter?.data?.name.substring(selectedCharacter?.data?.name.length - 1) === "s" ? "' " : "'s "}
				Relationships
			</div>
			<EditableContainer
				className='characters-relationship-info-home-selected-character-relationships-container'
				isAuthorizedToEdit={isAuthorizedToEdit}
				onAdd={addRelationship}
				onRevert={revertRelationships}
				onSave={saveRelationships}
			>
				<div className='characters-relationship-info-home-selected-character-relationships'>
					{selectedCharacterRelationships
						.filter((e) => !e?.isRemoved)
						.map((relationship, index) => (
							<div key={index} className='characters-relationship-info-home-selected-character-relationship-item-container'>
								<CharactersRelationshipsInfoSelectedCharacterRelationshipItem relationship={relationship} isEditing={false} />
							</div>
						))}
				</div>
				<div className='characters-relationship-info-home-selected-character-relationships'>
					{selectedCharacterRelationships
						.filter((e) => !e?.isRemoved)
						.map((relationship, index) => (
							<div key={index} className='characters-relationship-info-home-selected-character-relationship-item-container'>
								<CharactersRelationshipsInfoSelectedCharacterRelationshipItem relationship={relationship} isEditing={true} />
							</div>
						))}
				</div>
			</EditableContainer>
			<div className='characters-relationship-info-home-selected-character-divider' />
		</div>
	);
};
