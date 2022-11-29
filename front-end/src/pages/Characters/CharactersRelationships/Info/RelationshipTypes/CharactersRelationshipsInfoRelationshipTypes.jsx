// Packages

// Components
import { CharactersRelationshipsInfoHomeRelationshipTypeItem } from "./RelationshipTypeItem/CharactersRelationshipsInfoHomeRelationshipTypeItem";
import { EditableContainer } from "../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../components/DragDropItem/DragDropItem";

// Logic
import { CharactersRelationshipsInfoRelationshipTypesLogic } from "./CharactersRelationshipsInfoRelationshipTypesLogic";

// Context

// Services

// Styles
import "./CharactersRelationshipsInfoRelationshipTypes.css";

// Assets

export const CharactersRelationshipsInfoRelationshipTypes = () => {
	const {
		isAuthorizedToEdit,
		story,
		revertRelationshipTypes,
		saveRelationshipTypes,
		addRelationshipType,
		isReorderingRelationshipTypes,
		toggleIsReorderingRelationshipTypes,
		changeRelationshipTypesOrder,
	} = CharactersRelationshipsInfoRelationshipTypesLogic();

	return (
		<div className='characters-relationship-info-home-relationship-types-container'>
			<div className='characters-relationship-info-home-relationship-types-title'>Relationship Types</div>
			<EditableContainer
				isAuthorizedToEdit={isAuthorizedToEdit}
				onAdd={addRelationshipType}
				onReorder={toggleIsReorderingRelationshipTypes}
				onRevert={revertRelationshipTypes}
				onSave={saveRelationshipTypes}
			>
				<div className='characters-relationship-info-home-relationship-types'>
					{story?.data?.characterRelationshipTypes.map((relationship, index) => (
						<div key={index} className='characters-relationship-info-home-relationship-type-item-container'>
							<CharactersRelationshipsInfoHomeRelationshipTypeItem relationship={relationship} isEditing={false} />
						</div>
					))}
				</div>
				<DragDropContainer
					className='characters-relationship-info-home-relationship-types'
					enableDragDrop={isReorderingRelationshipTypes}
					onDropItem={changeRelationshipTypesOrder}
				>
					{story?.data?.characterRelationshipTypes.map((relationship, index) => (
						<DragDropItem key={index} index={index} className='characters-relationship-info-home-relationship-type-item-container'>
							<CharactersRelationshipsInfoHomeRelationshipTypeItem relationship={relationship} isEditing={true} />
						</DragDropItem>
					))}
				</DragDropContainer>
			</EditableContainer>
		</div>
	);
};
