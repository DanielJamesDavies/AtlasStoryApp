// Packages

// Components
import { EventsItem } from "./EventsItem";
import { EditableContainer } from "../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../components/DragDropItem/DragDropItem";
import { LocationImages } from "../../LocationImages/LocationImages";
import { ErrorMessage } from "../../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { EventsItemsLogic } from "./EventsItemsLogic";

// Context

// Services

// Styles
import "./EventsItems.css";

// Assets

export const EventsItems = () => {
	const {
		isAuthorizedToEdit,
		location,
		changeEventsItemTitle,
		changeEventsItemText,
		addEventsItem,
		removeEventsItem,
		isReorderingEventsItems,
		toggleIsReorderingEventsItems,
		reorderEventsItems,
		revertEventsItems,
		saveEventsItems,
		errors,
		locationImagesCurrDevItemIndex,
		openLocationImages,
		closeLocationImages,
		addImageToDevItem,
		eventsItemsRef,
		onEventsItemsContainerScroll,
	} = EventsItemsLogic();

	return (
		<EditableContainer
			className='location-subpage-events-items-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onAdd={addEventsItem}
			onReorder={toggleIsReorderingEventsItems}
			onRevert={revertEventsItems}
			onSave={saveEventsItems}
			onScroll={onEventsItemsContainerScroll}
			controlScrollDepth={[1, 2]}
		>
			<div ref={eventsItemsRef} className='location-subpage-events-items'>
				{location?.data?.events?.items?.map((eventsItem, index) => (
					<div key={index} className='location-subpage-events-item-container'>
						<EventsItem index={index} eventsItem={eventsItem} isEditing={false} />
					</div>
				))}
			</div>
			<div>
				<ErrorMessage errors={errors} />
				<DragDropContainer
					innerRef={eventsItemsRef}
					className={
						locationImagesCurrDevItemIndex === -1
							? "location-subpage-events-items"
							: "location-subpage-events-items location-subpage-events-items-location-images-open"
					}
					enableDragDrop={isReorderingEventsItems}
					onDropItem={reorderEventsItems}
				>
					{location?.data?.events?.items?.map((eventsItem, index) => (
						<DragDropItem className='location-subpage-events-item-container' key={index} index={index}>
							<EventsItem
								index={index}
								eventsItem={eventsItem}
								isEditing={true}
								changeEventsItemTitle={changeEventsItemTitle}
								changeEventsItemText={changeEventsItemText}
								removeEventsItem={removeEventsItem}
								isReorderingEventsItems={isReorderingEventsItems}
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
