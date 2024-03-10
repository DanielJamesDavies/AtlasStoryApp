// Packages

// Components
import { PhysicalAttributeItem } from "./PhysicalAttributeItem";
import { OpenableComponent } from "../../../../../../components/OpenableComponent/OpenableComponent";
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../../components/DragDropItem/DragDropItem";
import { ErrorMessage } from "../../../../../../components/ErrorMessage/ErrorMessage";
import { UnitImages } from "../../../UnitImages/UnitImages";

// Logic
import { PhysicalAttributeItemsLogic } from "./PhysicalAttributeItemsLogic";

// Context

// Services

// Styles
import "./PhysicalAttributeItems.css";

// Assets

export const PhysicalAttributeItems = ({
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
		unitVersionItemCopying,
		copyVersionValue,
		pasteVersionValue,
	} = PhysicalAttributeItemsLogic();

	return (
		<OpenableComponent
			title='Physical Attributes'
			onlyOnMobile={true}
			isDisplaying={isAuthorizedToEdit || unitVersion?.physical?.attributes?.length !== 0}
		>
			<EditableContainer
				isAuthorizedToEdit={isAuthorizedToEdit}
				onAdd={addPhysicalAttributeItem}
				onDefault={defaultPhysicalAttributeItems}
				onReorder={toggleIsReorderingPhysicalAttributeItems}
				onRevert={revertPhysicalAttributeItems}
				onSave={savePhysicalAttributeItems}
				onScroll={onPhysicalAttributeItemsContainerScroll}
				onCopyVersionValue={copyVersionValue}
				onPasteVersionValue={
					JSON.stringify(unitVersionItemCopying?.item) !== JSON.stringify(["physical", "attributes"]) ? undefined : pasteVersionValue
				}
				controlScrollDepth={[1, 2]}
				scrollItemsDepth={[1, 2]}
			>
				<div ref={physicalAttributeItemsRef} className='unit-page-subpage-physical-attribute-items'>
					{unitVersion?.physical?.attributes?.map((physicalAttributeItem, index) => (
						<div
							key={index}
							className={
								"unit-page-subpage-physical-attribute-item-container unit-page-subpage-physical-attribute-item-container-" + index
							}
						>
							<PhysicalAttributeItem
								index={index}
								physicalAttributeItem={physicalAttributeItem}
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
						innerRef={physicalAttributeItemsRef}
						className='unit-page-subpage-physical-attribute-items'
						enableDragDrop={isReorderingPhysicalAttributeItems}
						onDropItem={reorderPhysicalAttributeItems}
					>
						{unitVersion?.physical?.attributes?.map((physicalAttributeItem, index) => (
							<DragDropItem
								className={
									"unit-page-subpage-physical-attribute-item-container unit-page-subpage-physical-attribute-item-container-" +
									index
								}
								key={index}
								index={index}
							>
								<PhysicalAttributeItem
									index={index}
									physicalAttributeItem={physicalAttributeItem}
									isEditing={true}
									changePhysicalAttributeItemTitle={changePhysicalAttributeItemTitle}
									changePhysicalAttributeItemText={changePhysicalAttributeItemText}
									removePhysicalAttributeItem={removePhysicalAttributeItem}
									openUnitImages={openUnitImages}
									unitImages={unitImages}
									onPhysicalItemImageClick={onPhysicalItemImageClick}
									changePhysicalAttributeItemImageCaption={changePhysicalAttributeItemImageCaption}
									removePhysicalAttributeItemImage={removePhysicalAttributeItemImage}
									isReorderingPhysicalAttributeItems={isReorderingPhysicalAttributeItems}
									reorderPhysicalAttributeItemImages={reorderPhysicalAttributeItemImages}
								/>
							</DragDropItem>
						))}
					</DragDropContainer>
					{unitImagesCurrItem === false || unitImagesCurrItem?.type !== "attributes" ? null : (
						<UnitImages onAddImage={addImageToItem} onClose={closeUnitImages} />
					)}
				</div>
			</EditableContainer>
		</OpenableComponent>
	);
};
