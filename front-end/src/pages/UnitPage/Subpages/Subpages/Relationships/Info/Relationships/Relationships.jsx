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
		selectedRelationships,
		revertRelationships,
		saveRelationships,
		addRelationship,
		selectedCharacterRef,
		onSelectedCharacterContainerScroll,
	} = RelationshipsLogic();

	if (!selectedCharacter) return null;
	return (
		<div className='unit-page-relationship-info-home-selected-unit-page-container'>
			<div className='unit-page-relationship-info-home-selected-unit-page-title'>
				{selectedCharacter?.data?.name}
				{selectedCharacter?.data?.name.substring(selectedCharacter?.data?.name.length - 1) === "s" ? "' " : "'s "}
				Relationships
			</div>
			<EditableContainer
				className='unit-page-relationship-info-home-selected-unit-page-relationships-container'
				isAuthorizedToEdit={isAuthorizedToEdit}
				onAdd={addRelationship}
				onRevert={revertRelationships}
				onSave={saveRelationships}
				onScroll={onSelectedCharacterContainerScroll}
			>
				<div ref={selectedCharacterRef} className='unit-page-relationship-info-home-selected-unit-page-relationships'>
					{selectedRelationships
						.filter((e) => !e?.isRemoved)
						.map((relationship, index) => (
							<div key={index} className='unit-page-relationship-info-home-selected-unit-page-relationship-item-container'>
								<RelationshipItem relationship={relationship} isEditing={false} />
							</div>
						))}
				</div>
				<div ref={selectedCharacterRef} className='unit-page-relationship-info-home-selected-unit-page-relationships'>
					{selectedRelationships
						.filter((e) => !e?.isRemoved)
						.map((relationship, index) => (
							<div key={index} className='unit-page-relationship-info-home-selected-unit-page-relationship-item-container'>
								<RelationshipItem relationship={relationship} isEditing={true} selectedRelationships={selectedRelationships} />
							</div>
						))}
				</div>
			</EditableContainer>
		</div>
	);
};
