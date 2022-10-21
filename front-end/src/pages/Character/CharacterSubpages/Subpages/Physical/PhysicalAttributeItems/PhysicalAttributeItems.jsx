// Packages

// Components
import { PhysicalAttributeItem } from "./PhysicalAttributeItem";
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../../components/DragDropItem/DragDropItem";
import { ErrorMessage } from "../../../../../../components/ErrorMessage/ErrorMessage";
import { CharacterImages } from "../../../CharacterImages/CharacterImages";

// Logic
import { PhysicalAttributeItemsLogic } from "./PhysicalAttributeItemsLogic";

// Context

// Services

// Styles
import "./PhysicalAttributeItems.css";

// Assets

export const PhysicalAttributeItems = ({
	characterImagesCurrItem,
	characterImages,
	openCharacterImages,
	closeCharacterImages,
	addImageToItem,
	onPhysicalItemImageClick,
}) => {
	const {
		isAuthorizedToEdit,
		characterVersion,
		changePhysicalAttributeItemTitle,
		changePhysicalAttributeItemText,
		changePhysicalAttributeItemImageCaption,
		removePhysicalAttributeItemImage,
		addPhysicalAttributeItem,
		removePhysicalAttributeItem,
		defaultPhysicalAttributeItems,
		isReorderingPhysicalAttributeItems,
		toggleIsReorderingPhysicalAttributeItems,
		reorderPhysicalAttributeItems,
		reorderPhysicalAttributeItemImages,
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
				{characterVersion?.physical?.attributes?.length === 0 ? null : (
					<div className='character-subpage-physical-attribute-items-title'>Physical Attributes</div>
				)}
				<div ref={physicalAttributeItemsRef} className='character-subpage-physical-attribute-items'>
					{characterVersion?.physical?.attributes?.map((physicalAttributeItem, index) => (
						<div key={index} className='character-subpage-physical-attribute-item-container'>
							<PhysicalAttributeItem
								index={index}
								physicalAttributeItem={physicalAttributeItem}
								isEditing={false}
								characterImages={characterImages}
								onPhysicalItemImageClick={onPhysicalItemImageClick}
							/>
						</div>
					))}
				</div>
			</div>
			<div>
				<div className='character-subpage-physical-attribute-items-title'>Physical Attributes</div>
				<ErrorMessage errors={errors} />
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
								changePhysicalAttributeItemText={changePhysicalAttributeItemText}
								removePhysicalAttributeItem={removePhysicalAttributeItem}
								openCharacterImages={openCharacterImages}
								characterImages={characterImages}
								onPhysicalItemImageClick={onPhysicalItemImageClick}
								changePhysicalAttributeItemImageCaption={changePhysicalAttributeItemImageCaption}
								removePhysicalAttributeItemImage={removePhysicalAttributeItemImage}
								isReorderingPhysicalAttributeItems={isReorderingPhysicalAttributeItems}
								reorderPhysicalAttributeItemImages={reorderPhysicalAttributeItemImages}
							/>
						</DragDropItem>
					))}
				</DragDropContainer>
				{characterImagesCurrItem === false || characterImagesCurrItem?.type !== "attributes" ? null : (
					<CharacterImages onAddImage={addImageToItem} onClose={closeCharacterImages} />
				)}
			</div>
		</EditableContainer>
	);
};
