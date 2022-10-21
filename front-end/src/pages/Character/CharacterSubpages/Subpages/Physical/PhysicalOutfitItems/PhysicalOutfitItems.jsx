// Packages

// Components
import { PhysicalOutfitItem } from "./PhysicalOutfitItem";
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../../components/DragDropItem/DragDropItem";
import { ErrorMessage } from "../../../../../../components/ErrorMessage/ErrorMessage";
import { CharacterImages } from "../../../CharacterImages/CharacterImages";

// Logic
import { PhysicalOutfitItemsLogic } from "./PhysicalOutfitItemsLogic";

// Context

// Services

// Styles
import "./PhysicalOutfitItems.css";

// Assets

export const PhysicalOutfitItems = ({
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
		changePhysicalOutfitItemTitle,
		changePhysicalOutfitItemText,
		changePhysicalOutfitItemImageCaption,
		removePhysicalOutfitItemImage,
		addPhysicalOutfitItem,
		removePhysicalOutfitItem,
		isReorderingPhysicalOutfitItems,
		toggleIsReorderingPhysicalOutfitItems,
		reorderPhysicalOutfitItems,
		reorderPhysicalOutfitItemImages,
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
				{characterVersion?.physical?.outfits.length === 0 ? null : (
					<div className='character-subpage-physical-outfit-items-title'>Outfits</div>
				)}
				<div ref={physicalOutfitItemsRef} className='character-subpage-physical-outfit-items'>
					{characterVersion?.physical?.outfits?.map((physicalOutfitItem, index) => (
						<div key={index} className='character-subpage-physical-outfit-item-container'>
							<PhysicalOutfitItem
								index={index}
								physicalOutfitItem={physicalOutfitItem}
								isEditing={false}
								characterImages={characterImages}
								onPhysicalItemImageClick={onPhysicalItemImageClick}
							/>
						</div>
					))}
				</div>
			</div>
			<div>
				<div className='character-subpage-physical-outfit-items-title'>Outfits</div>
				<ErrorMessage errors={errors} />
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
								changePhysicalOutfitItemText={changePhysicalOutfitItemText}
								removePhysicalOutfitItem={removePhysicalOutfitItem}
								openCharacterImages={openCharacterImages}
								characterImages={characterImages}
								onPhysicalItemImageClick={onPhysicalItemImageClick}
								changePhysicalOutfitItemImageCaption={changePhysicalOutfitItemImageCaption}
								removePhysicalOutfitItemImage={removePhysicalOutfitItemImage}
								isReorderingPhysicalOutfitItems={isReorderingPhysicalOutfitItems}
								reorderPhysicalOutfitItemImages={reorderPhysicalOutfitItemImages}
							/>
						</DragDropItem>
					))}
				</DragDropContainer>
				{characterImagesCurrItem === false || characterImagesCurrItem?.type !== "outfits" ? null : (
					<CharacterImages onAddImage={addImageToItem} onClose={closeCharacterImages} />
				)}
			</div>
		</EditableContainer>
	);
};
