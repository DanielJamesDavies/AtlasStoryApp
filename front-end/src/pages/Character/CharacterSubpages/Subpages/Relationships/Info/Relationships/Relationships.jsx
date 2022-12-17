// Packages

// Components
import { RelationshipItem } from "./RelationshipItem/RelationshipItem";
import { EditableContainer } from "../../../../../../../components/EditableContainer/EditableContainer";

// Logic
import { RelationshipsLogic } from "./RelationshipsLogic";

// Context

// Services

// Styles
import "./Relationships.css";

// Assets

export const Relationships = () => {
	const {
		isAuthorizedToEdit,
		selectedCharacter,
		selectedCharacterRelationships,
		revertRelationships,
		saveRelationships,
		addRelationship,
		selectedCharacterRef,
		onSelectedCharacterContainerScroll,
	} = RelationshipsLogic();

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
								<RelationshipItem relationship={relationship} isEditing={false} />
							</div>
						))}
				</div>
				<div ref={selectedCharacterRef} className='character-relationship-info-home-selected-character-relationships'>
					{selectedCharacterRelationships
						.filter((e) => !e?.isRemoved)
						.map((relationship, index) => (
							<div key={index} className='character-relationship-info-home-selected-character-relationship-item-container'>
								<RelationshipItem
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
