// Packages

// Components
import { CharacterRelationshipsInfoSelectedCharacterRelationshipItem } from "./RelationshipItem/CharacterRelationshipsInfoSelectedCharacterRelationshipItem";
import { EditableContainer } from "../../../../../../../components/EditableContainer/EditableContainer";

// Logic
import { CharacterRelationshipsInfoSelectedCharacterLogic } from "./CharacterRelationshipsInfoSelectedCharacterLogic";

// Context

// Services

// Styles
import "./CharacterRelationshipsInfoSelectedCharacter.css";

// Assets

export const CharacterRelationshipsInfoSelectedCharacter = () => {
	const {
		isAuthorizedToEdit,
		selectedCharacter,
		selectedCharacterRelationships,
		revertRelationships,
		saveRelationships,
		addRelationship,
		selectedCharacterRef,
		onSelectedCharacterContainerScroll,
	} = CharacterRelationshipsInfoSelectedCharacterLogic();

	if (!selectedCharacter) return null;
	return (
		<div className='character-relationship-info-home-selected-character-container'>
			<div className='character-relationship-info-home-selected-character-title'>
				{selectedCharacter?.data?.name}
				{selectedCharacter?.data?.name.substring(selectedCharacter?.data?.name.length - 1) === "s" ? "' " : "'s "}
				Relationships
			</div>
			<EditableContainer
				className='character-relationship-info-home-selected-character-relationships-container'
				isAuthorizedToEdit={isAuthorizedToEdit}
				onAdd={addRelationship}
				onRevert={revertRelationships}
				onSave={saveRelationships}
				onScroll={onSelectedCharacterContainerScroll}
			>
				<div ref={selectedCharacterRef} className='character-relationship-info-home-selected-character-relationships'>
					{selectedCharacterRelationships
						.filter((e) => !e?.isRemoved)
						.map((relationship, index) => (
							<div key={index} className='character-relationship-info-home-selected-character-relationship-item-container'>
								<CharacterRelationshipsInfoSelectedCharacterRelationshipItem relationship={relationship} isEditing={false} />
							</div>
						))}
				</div>
				<div ref={selectedCharacterRef} className='character-relationship-info-home-selected-character-relationships'>
					{selectedCharacterRelationships
						.filter((e) => !e?.isRemoved)
						.map((relationship, index) => (
							<div key={index} className='character-relationship-info-home-selected-character-relationship-item-container'>
								<CharacterRelationshipsInfoSelectedCharacterRelationshipItem
									relationship={relationship}
									isEditing={true}
									selectedCharacterRelationships={selectedCharacterRelationships}
								/>
							</div>
						))}
				</div>
			</EditableContainer>
			<div className='character-relationship-info-home-selected-character-divider' />
		</div>
	);
};
