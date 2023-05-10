// Packages

// Components
import { CharacterRelationshipsInfoHomeRelationshipTypeItem } from "./RelationshipTypeItem/CharacterRelationshipsInfoHomeRelationshipTypeItem";
import { EditableContainer } from "../../../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../../../components/DragDropItem/DragDropItem";

// Logic
import { CharacterRelationshipsInfoRelationshipTypesLogic } from "./CharacterRelationshipsInfoRelationshipTypesLogic";

// Context

// Services

// Styles
import "./CharacterRelationshipsInfoRelationshipTypes.css";

// Assets

export const CharacterRelationshipsInfoRelationshipTypes = () => {
	const {
		isAuthorizedToEdit,
		story,
		revertRelationshipTypes,
		saveRelationshipTypes,
		addRelationshipType,
		isReorderingRelationshipTypes,
		toggleIsReorderingRelationshipTypes,
		changeRelationshipTypesOrder,
		relationshipTypesRef,
		onRelationshipTypesScroll,
	} = CharacterRelationshipsInfoRelationshipTypesLogic();

	return (
		<div className='characters-relationship-info-home-relationship-types-container'>
			<div className='characters-relationship-info-home-relationship-types-title'>Relationship Types</div>
			<EditableContainer
				isAuthorizedToEdit={isAuthorizedToEdit}
				onAdd={addRelationshipType}
				onReorder={toggleIsReorderingRelationshipTypes}
				onRevert={revertRelationshipTypes}
				onSave={saveRelationshipTypes}
				onScroll={onRelationshipTypesScroll}
			>
				<div ref={relationshipTypesRef} className='characters-relationship-info-home-relationship-types'>
					{story?.data?.characterRelationshipTypes.map((relationship, index) => (
						<div key={index} className='characters-relationship-info-home-relationship-type-item-container'>
							<CharacterRelationshipsInfoHomeRelationshipTypeItem relationship={relationship} isEditing={false} />
						</div>
					))}
				</div>
				<DragDropContainer
					innerRef={relationshipTypesRef}
					className='characters-relationship-info-home-relationship-types'
					enableDragDrop={isReorderingRelationshipTypes}
					onDropItem={changeRelationshipTypesOrder}
				>
					{story?.data?.characterRelationshipTypes.map((relationship, index) => (
						<DragDropItem key={index} index={index} className='characters-relationship-info-home-relationship-type-item-container'>
							<CharacterRelationshipsInfoHomeRelationshipTypeItem relationship={relationship} isEditing={true} />
						</DragDropItem>
					))}
				</DragDropContainer>
			</EditableContainer>
		</div>
	);
};
