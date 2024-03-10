// Packages

// Components
import { EventsItem } from "./EventsItem";
import { EditableContainer } from "../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../components/DragDropItem/DragDropItem";
import { ErrorMessage } from "../../../../../components/ErrorMessage/ErrorMessage";
import { UnitImages } from "../../UnitImages/UnitImages";

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
		unit,
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
		unitImagesCurrDevItemIndex,
		openUnitImages,
		closeUnitImages,
		addImageToDevItem,
		eventsItemsRef,
		onEventsItemsContainerScroll,
	} = EventsItemsLogic();

	return (
		<EditableContainer
			className='unit-page-subpage-events-items-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onAdd={addEventsItem}
			onReorder={toggleIsReorderingEventsItems}
			onRevert={revertEventsItems}
			onSave={saveEventsItems}
			onScroll={onEventsItemsContainerScroll}
			controlScrollDepth={[1, 2]}
			scrollItemsDepth={[1, 2]}
		>
			<div ref={eventsItemsRef} className='unit-page-subpage-events-items'>
				{unit?.data?.events?.items?.map((eventsItem, index) => (
					<div key={index} className={"unit-page-subpage-events-item-container unit-page-subpage-events-item-container-" + index}>
						<EventsItem index={index} eventsItem={eventsItem} isEditing={false} />
					</div>
				))}
			</div>
			<div>
				<ErrorMessage errors={errors} />
				<DragDropContainer
					innerRef={eventsItemsRef}
					className={
						unitImagesCurrDevItemIndex === -1
							? "unit-page-subpage-events-items"
							: "unit-page-subpage-events-items unit-page-subpage-events-items-unit-page-images-open"
					}
					enableDragDrop={isReorderingEventsItems}
					onDropItem={reorderEventsItems}
					includeVerticalDrag={true}
				>
					{unit?.data?.events?.items?.map((eventsItem, index) => (
						<DragDropItem
							className={"unit-page-subpage-events-item-container unit-page-subpage-events-item-container-" + index}
							key={index}
							index={index}
						>
							<EventsItem
								index={index}
								eventsItem={eventsItem}
								isEditing={true}
								changeEventsItemTitle={changeEventsItemTitle}
								changeEventsItemText={changeEventsItemText}
								removeEventsItem={removeEventsItem}
								isReorderingEventsItems={isReorderingEventsItems}
								unitImagesCurrDevItemIndex={unitImagesCurrDevItemIndex}
								openUnitImages={openUnitImages}
							/>
						</DragDropItem>
					))}
				</DragDropContainer>
				{unitImagesCurrDevItemIndex === -1 ? null : <UnitImages onAddImage={addImageToDevItem} onClose={closeUnitImages} />}
			</div>
		</EditableContainer>
	);
};
