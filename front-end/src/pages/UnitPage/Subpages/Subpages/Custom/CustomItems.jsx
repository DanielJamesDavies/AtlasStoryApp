// Packages

// Components
import { CustomItem } from "./CustomItem";
import { EditableContainer } from "../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../components/DragDropItem/DragDropItem";
import { ErrorMessage } from "../../../../../components/ErrorMessage/ErrorMessage";
import { UnitImages } from "../../UnitImages/UnitImages";

// Logic
import { CustomItemsLogic } from "./CustomItemsLogic";

// Context

// Services

// Styles
import "./CustomItems.css";

// Assets

export const CustomItems = () => {
	const {
		isAuthorizedToEdit,
		unit,
		openSubpageID,
		changeCustomItemTitle,
		changeCustomItemText,
		addCustomItem,
		removeCustomItem,
		isReorderingCustomItems,
		toggleIsReorderingCustomItems,
		reorderCustomItems,
		revertCustomItems,
		saveCustomItems,
		errors,
		UnitImagesCurrDevItemIndex,
		openUnitImages,
		closeUnitImages,
		addImageToDevItem,
		customItemsRef,
		onCustomItemsContainerScroll,
	} = CustomItemsLogic();

	return (
		<EditableContainer
			className='unit-page-subpage-custom-items-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onAdd={addCustomItem}
			onReorder={toggleIsReorderingCustomItems}
			onRevert={revertCustomItems}
			onSave={saveCustomItems}
			onScroll={onCustomItemsContainerScroll}
		>
			<div ref={customItemsRef} className='unit-page-subpage-custom-items'>
				{unit?.data?.custom_subpages
					.find((e) => e.id === openSubpageID)
					?.items?.map((customItem, index) => (
						<div key={index} className='unit-page-subpage-custom-item-container'>
							<CustomItem index={index} customItem={customItem} isEditing={false} />
						</div>
					))}
			</div>
			<div>
				<ErrorMessage errors={errors} />
				<DragDropContainer
					innerRef={customItemsRef}
					className={
						UnitImagesCurrDevItemIndex === -1
							? "unit-page-subpage-custom-items"
							: "unit-page-subpage-custom-items unit-page-subpage-custom-items-unit-page-images-open"
					}
					enableDragDrop={isReorderingCustomItems}
					onDropItem={reorderCustomItems}
					includeVerticalDrag={true}
				>
					{unit?.data?.custom_subpages
						.find((e) => e.id === openSubpageID)
						?.items?.map((customItem, index) => (
							<DragDropItem className='unit-page-subpage-custom-item-container' key={index} index={index}>
								<CustomItem
									index={index}
									customItem={customItem}
									isEditing={true}
									changeCustomItemTitle={changeCustomItemTitle}
									changeCustomItemText={changeCustomItemText}
									removeCustomItem={removeCustomItem}
									isReorderingCustomItems={isReorderingCustomItems}
									UnitImagesCurrDevItemIndex={UnitImagesCurrDevItemIndex}
									openUnitImages={openUnitImages}
								/>
							</DragDropItem>
						))}
				</DragDropContainer>
				{UnitImagesCurrDevItemIndex === -1 ? null : <UnitImages onAddImage={addImageToDevItem} onClose={closeUnitImages} />}
			</div>
		</EditableContainer>
	);
};
