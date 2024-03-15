// Packages

// Components
import { RelationshipsInfoHomeRelationshipTypeItem } from "./RelationshipTypeItem/RelationshipsInfoHomeRelationshipTypeItem";
import { EditableContainer } from "../../../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../../../components/DragDropItem/DragDropItem";

// Logic
import { RelationshipsInfoRelationshipTypesLogic } from "./RelationshipsInfoRelationshipTypesLogic";

// Context

// Services

// Styles
import "./RelationshipsInfoRelationshipTypes.css";

// Assets

export const RelationshipsInfoRelationshipTypes = () => {
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
	} = RelationshipsInfoRelationshipTypesLogic();

	return (
		<div className='unit-page-relationship-info-home-relationship-types-container'>
			<div className='unit-page-relationship-info-home-relationship-types-title'>Relationship Types</div>
			<EditableContainer
				isAuthorizedToEdit={isAuthorizedToEdit}
				onAdd={addRelationshipType}
				onReorder={toggleIsReorderingRelationshipTypes}
				onRevert={revertRelationshipTypes}
				onSave={saveRelationshipTypes}
				onScroll={onRelationshipTypesScroll}
			>
				<div ref={relationshipTypesRef} className='unit-page-relationship-info-home-relationship-types'>
					{story?.data?.characterRelationshipTypes.map((relationship, index) => (
						<div key={index} className='unit-page-relationship-info-home-relationship-type-item-container'>
							<RelationshipsInfoHomeRelationshipTypeItem relationship={relationship} isEditing={false} />
						</div>
					))}
				</div>
				<DragDropContainer
					innerRef={relationshipTypesRef}
					className='unit-page-relationship-info-home-relationship-types'
					enableDragDrop={isReorderingRelationshipTypes}
					onDropItem={changeRelationshipTypesOrder}
				>
					{story?.data?.characterRelationshipTypes.map((relationship, index) => (
						<DragDropItem key={index} index={index} className='unit-page-relationship-info-home-relationship-type-item-container'>
							<RelationshipsInfoHomeRelationshipTypeItem relationship={relationship} isEditing={true} />
						</DragDropItem>
					))}
				</DragDropContainer>
			</EditableContainer>
		</div>
	);
};
