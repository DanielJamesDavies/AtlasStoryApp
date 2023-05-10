// Packages

// Components
import { Item } from "./Item/Item";
import { EditableContainer } from "../../../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../../../components/DragDropItem/DragDropItem";

// Logic
import { ItemsLogic } from "./ItemsLogic";

// Context

// Services

// Styles
import "./Items.css";

// Assets

export const Items = ({ relationship, changeRelationship, relationshipCharacterIndex }) => {
	const {
		isAuthorizedToEdit,
		itemsRef,
		changeItemTitle,
		changeItemDescription,
		addNote,
		removeItem,
		isReorderingRelationshipItems,
		toggleIsReorderingRelationshipItems,
		reorderRelationshipItems,
		revertNotes,
		saveNotes,
		onItemsContainerScroll,
	} = ItemsLogic({
		relationship,
		changeRelationship,
		relationshipCharacterIndex,
	});

	return (
		<EditableContainer
			className='character-subpage-relationships-relationship-items-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onAdd={addNote}
			onReorder={toggleIsReorderingRelationshipItems}
			onRevert={revertNotes}
			onSave={saveNotes}
			onScroll={onItemsContainerScroll}
		>
			<div ref={itemsRef} className='character-subpage-relationships-relationship-items'>
				{!relationshipCharacterIndex ? (
					<div className='character-subpage-relationships-relationship-items'></div>
				) : (
					relationship["character_" + relationshipCharacterIndex + "_items"].map((item, index) => (
						<div key={index} className='character-subpage-relationships-relationship-item-container'>
							<Item item={item} index={index} isEditing={false} />
						</div>
					))
				)}
			</div>
			{!relationshipCharacterIndex ? (
				<div className='character-subpage-relationships-relationship-items'></div>
			) : (
				<DragDropContainer
					innerRef={itemsRef}
					className='character-subpage-relationships-relationship-items'
					enableDragDrop={isReorderingRelationshipItems}
					onDropItem={reorderRelationshipItems}
				>
					{relationship["character_" + relationshipCharacterIndex + "_items"].map((item, index) => (
						<DragDropItem key={index} index={index} className='character-subpage-relationships-relationship-item-container'>
							<Item
								item={item}
								index={index}
								changeItemTitle={changeItemTitle}
								changeItemDescription={changeItemDescription}
								removeItem={removeItem}
								isEditing={true}
							/>
						</DragDropItem>
					))}
				</DragDropContainer>
			)}
		</EditableContainer>
	);
};
