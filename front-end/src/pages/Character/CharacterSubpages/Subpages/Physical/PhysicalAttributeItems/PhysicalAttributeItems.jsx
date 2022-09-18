// Packages

// Components
import { PhysicalAttributeItem } from "./PhysicalAttributeItem";
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../../components/DragDropItem/DragDropItem";
import { ErrorMessage } from "../../../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { PhysicalAttributeItemsLogic } from "./PhysicalAttributeItemsLogic";

// Context

// Services

// Styles
import "./PhysicalAttributeItems.css";

// Assets

export const PhysicalAttributeItems = () => {
	const {
		isAuthorizedToEdit,
		characterVersion,
		changePhysicalAttributeItemTitle,
		changePhysicalAttributeItemValue,
		addPhysicalAttributeItem,
		removePhysicalAttributeItem,
		defaultPhysicalAttributeItems,
		isReorderingPhysicalAttributeItems,
		toggleIsReorderingPhysicalAttributeItems,
		reorderPhysicalAttributeItems,
		revertPhysicalAttributeItems,
		savePhysicalAttributeItems,
		errors,
		physicalAttributeItemsRef,
		onPhysicalAttributeItemsContainerScroll,
	} = PhysicalAttributeItemsLogic();

	return (
		<EditableContainer
			className='character-subpage-physical-attribute-items-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onAdd={addPhysicalAttributeItem}
			onDefault={defaultPhysicalAttributeItems}
			onReorder={toggleIsReorderingPhysicalAttributeItems}
			onRevert={revertPhysicalAttributeItems}
			onSave={savePhysicalAttributeItems}
			onScroll={onPhysicalAttributeItemsContainerScroll}
		>
			<div>
				<div className='character-subpage-physical-attribute-items-title'>Physical Attributes</div>
				<div ref={physicalAttributeItemsRef} className='character-subpage-physical-attribute-items'>
					{characterVersion?.physical?.attributes?.map((physicalAttributeItem, index) => (
						<div key={index} className='character-subpage-physical-attribute-item-container'>
							<PhysicalAttributeItem index={index} physicalAttributeItem={physicalAttributeItem} isEditing={false} />
						</div>
					))}
				</div>
			</div>
			<div>
				<div className='character-subpage-physical-attribute-items-title'>Physical Attributes</div>
				<DragDropContainer
					innerRef={physicalAttributeItemsRef}
					className='character-subpage-physical-attribute-items'
					enableDragDrop={isReorderingPhysicalAttributeItems}
					onDropItem={reorderPhysicalAttributeItems}
				>
					{characterVersion?.physical?.attributes?.map((physicalAttributeItem, index) => (
						<DragDropItem className='character-subpage-physical-attribute-item-container' key={index} index={index}>
							<PhysicalAttributeItem
								index={index}
								physicalAttributeItem={physicalAttributeItem}
								isEditing={true}
								changePhysicalAttributeItemTitle={changePhysicalAttributeItemTitle}
								changePhysicalAttributeItemValue={changePhysicalAttributeItemValue}
								removePhysicalAttributeItem={removePhysicalAttributeItem}
							/>
						</DragDropItem>
					))}
				</DragDropContainer>
				<ErrorMessage errors={errors} />
			</div>
		</EditableContainer>
	);
};
