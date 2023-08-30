// Packages

// Components
import { DetailsItem } from "./DetailsItem";
import { EditableContainer } from "../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../components/DragDropItem/DragDropItem";
import { LocationImages } from "../../LocationImages/LocationImages";
import { ErrorMessage } from "../../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { DetailsItemsLogic } from "./DetailsItemsLogic";

// Context

// Services

// Styles
import "./DetailsItems.css";

// Assets

export const DetailsItems = () => {
	const {
		isAuthorizedToEdit,
		location,
		changeDetailsItemTitle,
		changeDetailsItemText,
		addDetailsItem,
		removeDetailsItem,
		isReorderingDetailsItems,
		toggleIsReorderingDetailsItems,
		reorderDetailsItems,
		revertDetailsItems,
		saveDetailsItems,
		errors,
		locationImagesCurrDevItemIndex,
		openLocationImages,
		closeLocationImages,
		addImageToDevItem,
		detailsItemsRef,
		onDetailsItemsContainerScroll,
	} = DetailsItemsLogic();

	return (
		<EditableContainer
			className='location-subpage-details-items-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onAdd={addDetailsItem}
			onReorder={toggleIsReorderingDetailsItems}
			onRevert={revertDetailsItems}
			onSave={saveDetailsItems}
			onScroll={onDetailsItemsContainerScroll}
			controlScrollDepth={[1, 2]}
		>
			<div ref={detailsItemsRef} className='location-subpage-details-items'>
				{location?.data?.details?.items?.map((detailsItem, index) => (
					<div key={index} className='location-subpage-details-item-container'>
						<DetailsItem index={index} detailsItem={detailsItem} isEditing={false} />
					</div>
				))}
			</div>
			<div>
				<ErrorMessage errors={errors} />
				<DragDropContainer
					innerRef={detailsItemsRef}
					className={
						locationImagesCurrDevItemIndex === -1
							? "location-subpage-details-items"
							: "location-subpage-details-items location-subpage-details-items-location-images-open"
					}
					enableDragDrop={isReorderingDetailsItems}
					onDropItem={reorderDetailsItems}
				>
					{location?.data?.details?.items?.map((detailsItem, index) => (
						<DragDropItem className='location-subpage-details-item-container' key={index} index={index}>
							<DetailsItem
								index={index}
								detailsItem={detailsItem}
								isEditing={true}
								changeDetailsItemTitle={changeDetailsItemTitle}
								changeDetailsItemText={changeDetailsItemText}
								removeDetailsItem={removeDetailsItem}
								isReorderingDetailsItems={isReorderingDetailsItems}
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
