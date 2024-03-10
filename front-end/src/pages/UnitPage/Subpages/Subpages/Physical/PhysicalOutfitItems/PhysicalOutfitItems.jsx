// Packages

// Components
import { PhysicalOutfitItem } from "./PhysicalOutfitItem";
import { OpenableComponent } from "../../../../../../components/OpenableComponent/OpenableComponent";
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../../components/DragDropItem/DragDropItem";
import { ErrorMessage } from "../../../../../../components/ErrorMessage/ErrorMessage";
import { UnitImages } from "../../../UnitImages/UnitImages";

// Logic
import { PhysicalOutfitItemsLogic } from "./PhysicalOutfitItemsLogic";

// Context

// Services

// Styles
import "./PhysicalOutfitItems.css";

// Assets

export const PhysicalOutfitItems = ({
	unitImagesCurrItem,
	unitImages,
	openUnitImages,
	closeUnitImages,
	addImageToItem,
	onPhysicalItemImageClick,
}) => {
	const {
		isAuthorizedToEdit,
		unitVersion,
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
		unitVersionItemCopying,
		copyVersionValue,
		pasteVersionValue,
	} = PhysicalOutfitItemsLogic();

	return (
		<OpenableComponent title='Outfits' onlyOnMobile={true} isDisplaying={isAuthorizedToEdit || unitVersion?.physical?.outfits?.length !== 0}>
			<EditableContainer
				isAuthorizedToEdit={isAuthorizedToEdit}
				onAdd={addPhysicalOutfitItem}
				onReorder={toggleIsReorderingPhysicalOutfitItems}
				onRevert={revertPhysicalOutfitItems}
				onSave={savePhysicalOutfitItems}
				onScroll={onPhysicalOutfitItemsContainerScroll}
				onCopyVersionValue={copyVersionValue}
				onPasteVersionValue={
					JSON.stringify(unitVersionItemCopying?.item) !== JSON.stringify(["physical", "outfits"]) ? undefined : pasteVersionValue
				}
				controlScrollDepth={[1, 2]}
				scrollItemsDepth={[1, 2]}
			>
				<div ref={physicalOutfitItemsRef} className='unit-page-subpage-physical-outfit-items'>
					{unitVersion?.physical?.outfits?.map((physicalOutfitItem, index) => (
						<div
							key={index}
							className={"unit-page-subpage-physical-outfit-item-container unit-page-subpage-physical-outfit-item-container-" + index}
						>
							<PhysicalOutfitItem
								index={index}
								physicalOutfitItem={physicalOutfitItem}
								isEditing={false}
								unitImages={unitImages}
								onPhysicalItemImageClick={onPhysicalItemImageClick}
							/>
						</div>
					))}
				</div>
				<div>
					<ErrorMessage errors={errors} />
					<DragDropContainer
						innerRef={physicalOutfitItemsRef}
						className='unit-page-subpage-physical-outfit-items'
						enableDragDrop={isReorderingPhysicalOutfitItems}
						onDropItem={reorderPhysicalOutfitItems}
					>
						{unitVersion?.physical?.outfits?.map((physicalOutfitItem, index) => (
							<DragDropItem
								className={
									"unit-page-subpage-physical-outfit-item-container unit-page-subpage-physical-outfit-item-container-" + index
								}
								key={index}
								index={index}
							>
								<PhysicalOutfitItem
									index={index}
									physicalOutfitItem={physicalOutfitItem}
									isEditing={true}
									changePhysicalOutfitItemTitle={changePhysicalOutfitItemTitle}
									changePhysicalOutfitItemText={changePhysicalOutfitItemText}
									removePhysicalOutfitItem={removePhysicalOutfitItem}
									openUnitImages={openUnitImages}
									unitImages={unitImages}
									onPhysicalItemImageClick={onPhysicalItemImageClick}
									changePhysicalOutfitItemImageCaption={changePhysicalOutfitItemImageCaption}
									removePhysicalOutfitItemImage={removePhysicalOutfitItemImage}
									isReorderingPhysicalOutfitItems={isReorderingPhysicalOutfitItems}
									reorderPhysicalOutfitItemImages={reorderPhysicalOutfitItemImages}
								/>
							</DragDropItem>
						))}
					</DragDropContainer>
					{unitImagesCurrItem === false || unitImagesCurrItem?.type !== "outfits" ? null : (
						<UnitImages onAddImage={addImageToItem} onClose={closeUnitImages} />
					)}
				</div>
			</EditableContainer>
		</OpenableComponent>
	);
};
