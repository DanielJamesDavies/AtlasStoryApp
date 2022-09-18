// Packages

// Components
import { PhysicalOutfitItem } from "./PhysicalOutfitItem";
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../../components/DragDropItem/DragDropItem";
import { ErrorMessage } from "../../../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { PhysicalOutfitItemsLogic } from "./PhysicalOutfitItemsLogic";

// Context

// Services

// Styles
import "./PhysicalOutfitItems.css";

// Assets

export const PhysicalOutfitItems = () => {
	const {
		isAuthorizedToEdit,
		characterVersion,
		changePhysicalOutfitItemTitle,
		changePhysicalOutfitItemValue,
		addPhysicalOutfitItem,
		removePhysicalOutfitItem,
		isReorderingPhysicalOutfitItems,
		toggleIsReorderingPhysicalOutfitItems,
		reorderPhysicalOutfitItems,
		revertPhysicalOutfitItems,
		savePhysicalOutfitItems,
		errors,
		physicalOutfitItemsRef,
		onPhysicalOutfitItemsContainerScroll,
	} = PhysicalOutfitItemsLogic();

	return (
		<EditableContainer
			className='character-subpage-physical-outfit-items-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onAdd={addPhysicalOutfitItem}
			onReorder={toggleIsReorderingPhysicalOutfitItems}
			onRevert={revertPhysicalOutfitItems}
			onSave={savePhysicalOutfitItems}
			onScroll={onPhysicalOutfitItemsContainerScroll}
		>
			<div>
				<div className='character-subpage-physical-outfit-items-title'>Outfits</div>
				<div ref={physicalOutfitItemsRef} className='character-subpage-physical-outfit-items'>
					{characterVersion?.physical?.outfits?.map((physicalOutfitItem, index) => (
						<div key={index} className='character-subpage-physical-outfit-item-container'>
							<PhysicalOutfitItem index={index} physicalOutfitItem={physicalOutfitItem} isEditing={false} />
						</div>
					))}
				</div>
			</div>
			<div>
				<div className='character-subpage-physical-outfit-items-title'>Outfits</div>
				<DragDropContainer
					innerRef={physicalOutfitItemsRef}
					className='character-subpage-physical-outfit-items'
					enableDragDrop={isReorderingPhysicalOutfitItems}
					onDropItem={reorderPhysicalOutfitItems}
				>
					{characterVersion?.physical?.outfits?.map((physicalOutfitItem, index) => (
						<DragDropItem className='character-subpage-physical-outfit-item-container' key={index} index={index}>
							<PhysicalOutfitItem
								index={index}
								physicalOutfitItem={physicalOutfitItem}
								isEditing={true}
								changePhysicalOutfitItemTitle={changePhysicalOutfitItemTitle}
								changePhysicalOutfitItemValue={changePhysicalOutfitItemValue}
								removePhysicalOutfitItem={removePhysicalOutfitItem}
							/>
						</DragDropItem>
					))}
				</DragDropContainer>
				<ErrorMessage errors={errors} />
			</div>
		</EditableContainer>
	);
};
