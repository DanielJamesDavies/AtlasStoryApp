// Packages

// Components
import { MiscellaneousItem } from "./MiscellaneousItem";
import { EditableContainer } from "../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../components/DragDropItem/DragDropItem";
import { LocationImages } from "../../LocationImages/LocationImages";
import { ErrorMessage } from "../../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { MiscellaneousItemsLogic } from "./MiscellaneousItemsLogic";

// Context

// Services

// Styles
import "./MiscellaneousItems.css";

// Assets

export const MiscellaneousItems = () => {
	const {
		isAuthorizedToEdit,
		location,
		changeMiscellaneousItemTitle,
		changeMiscellaneousItemText,
		addMiscellaneousItem,
		removeMiscellaneousItem,
		isReorderingMiscellaneousItems,
		toggleIsReorderingMiscellaneousItems,
		reorderMiscellaneousItems,
		revertMiscellaneousItems,
		saveMiscellaneousItems,
		errors,
		locationImagesCurrDevItemIndex,
		openLocationImages,
		closeLocationImages,
		addImageToDevItem,
		miscellaneousItemsRef,
		onMiscellaneousItemsContainerScroll,
	} = MiscellaneousItemsLogic();

	return (
		<EditableContainer
			className='location-subpage-miscellaneous-items-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onAdd={addMiscellaneousItem}
			onReorder={toggleIsReorderingMiscellaneousItems}
			onRevert={revertMiscellaneousItems}
			onSave={saveMiscellaneousItems}
			onScroll={onMiscellaneousItemsContainerScroll}
			controlScrollDepth={[1, 2]}
		>
			<div ref={miscellaneousItemsRef} className='location-subpage-miscellaneous-items'>
				{location?.data?.miscellaneous?.items?.map((miscellaneousItem, index) => (
					<div key={index} className='location-subpage-miscellaneous-item-container'>
						<MiscellaneousItem index={index} miscellaneousItem={miscellaneousItem} isEditing={false} />
					</div>
				))}
			</div>
			<div>
				<ErrorMessage errors={errors} />
				<DragDropContainer
					innerRef={miscellaneousItemsRef}
					className={
						locationImagesCurrDevItemIndex === -1
							? "location-subpage-miscellaneous-items"
							: "location-subpage-miscellaneous-items location-subpage-miscellaneous-items-location-images-open"
					}
					enableDragDrop={isReorderingMiscellaneousItems}
					onDropItem={reorderMiscellaneousItems}
				>
					{location?.data?.miscellaneous?.items?.map((miscellaneousItem, index) => (
						<DragDropItem className='location-subpage-miscellaneous-item-container' key={index} index={index}>
							<MiscellaneousItem
								index={index}
								miscellaneousItem={miscellaneousItem}
								isEditing={true}
								changeMiscellaneousItemTitle={changeMiscellaneousItemTitle}
								changeMiscellaneousItemText={changeMiscellaneousItemText}
								removeMiscellaneousItem={removeMiscellaneousItem}
								isReorderingMiscellaneousItems={isReorderingMiscellaneousItems}
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
