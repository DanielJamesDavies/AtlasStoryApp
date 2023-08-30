// Packages

// Components
import { CustomItem } from "./CustomItem";
import { EditableContainer } from "../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../components/DragDropItem/DragDropItem";
import { ErrorMessage } from "../../../../../components/ErrorMessage/ErrorMessage";
import { LocationImages } from "../../LocationImages/LocationImages";

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
		location,
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
		locationImagesCurrDevItemIndex,
		openLocationImages,
		closeLocationImages,
		addImageToDevItem,
		customItemsRef,
		onCustomItemsContainerScroll,
	} = CustomItemsLogic();

	return (
		<EditableContainer
			className='location-subpage-custom-items-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onAdd={addCustomItem}
			onReorder={toggleIsReorderingCustomItems}
			onRevert={revertCustomItems}
			onSave={saveCustomItems}
			onScroll={onCustomItemsContainerScroll}
		>
			<div ref={customItemsRef} className='location-subpage-custom-items'>
				{location?.data?.custom_subpages
					.find((e) => e.id === openSubpageID)
					?.items?.map((customItem, index) => (
						<div key={index} className='location-subpage-custom-item-container'>
							<CustomItem index={index} customItem={customItem} isEditing={false} />
						</div>
					))}
			</div>
			<div>
				<ErrorMessage errors={errors} />
				<DragDropContainer
					innerRef={customItemsRef}
					className={
						locationImagesCurrDevItemIndex === -1
							? "location-subpage-custom-items"
							: "location-subpage-custom-items location-subpage-custom-items-location-images-open"
					}
					enableDragDrop={isReorderingCustomItems}
					onDropItem={reorderCustomItems}
					includeVerticalDrag={true}
				>
					{location?.data?.custom_subpages
						.find((e) => e.id === openSubpageID)
						?.items?.map((customItem, index) => (
							<DragDropItem className='location-subpage-custom-item-container' key={index} index={index}>
								<CustomItem
									index={index}
									customItem={customItem}
									isEditing={true}
									changeCustomItemTitle={changeCustomItemTitle}
									changeCustomItemText={changeCustomItemText}
									removeCustomItem={removeCustomItem}
									isReorderingCustomItems={isReorderingCustomItems}
									locationImagesCurrDevItemIndex={locationImagesCurrDevItemIndex}
									openLocationImages={openLocationImages}
								/>
							</DragDropItem>
						))}
				</DragDropContainer>
				{locationImagesCurrDevItemIndex === -1 ? null : <LocationImages onAddImage={addImageToDevItem} onClose={closeLocationImages} />}
			</div>
		</EditableContainer>
	);
};
