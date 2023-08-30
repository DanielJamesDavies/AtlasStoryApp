// Packages

// Components
import { DevelopmentItem } from "./DevelopmentItem";
import { EditableContainer } from "../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../components/DragDropItem/DragDropItem";
import { LocationImages } from "../../LocationImages/LocationImages";
import { ErrorMessage } from "../../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { DevelopmentItemsLogic } from "./DevelopmentItemsLogic";

// Context

// Services

// Styles
import "./DevelopmentItems.css";

// Assets

export const DevelopmentItems = () => {
	const {
		isAuthorizedToEdit,
		location,
		changeDevelopmentItemTitle,
		changeDevelopmentItemText,
		addDevelopmentItem,
		removeDevelopmentItem,
		isReorderingDevelopmentItems,
		toggleIsReorderingDevelopmentItems,
		reorderDevelopmentItems,
		revertDevelopmentItems,
		saveDevelopmentItems,
		errors,
		locationImagesCurrDevItemIndex,
		openLocationImages,
		closeLocationImages,
		addImageToDevItem,
		developmentItemsRef,
		onDevelopmentItemsContainerScroll,
	} = DevelopmentItemsLogic();

	return (
		<EditableContainer
			className='location-subpage-development-items-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onAdd={addDevelopmentItem}
			onReorder={toggleIsReorderingDevelopmentItems}
			onRevert={revertDevelopmentItems}
			onSave={saveDevelopmentItems}
			onScroll={onDevelopmentItemsContainerScroll}
			controlScrollDepth={[1, 2]}
		>
			<div ref={developmentItemsRef} className='location-subpage-development-items'>
				{location?.data?.development?.items?.map((developmentItem, index) => (
					<div key={index} className='location-subpage-development-item-container'>
						<DevelopmentItem index={index} developmentItem={developmentItem} isEditing={false} />
					</div>
				))}
			</div>
			<div>
				<ErrorMessage errors={errors} />
				<DragDropContainer
					innerRef={developmentItemsRef}
					className={
						locationImagesCurrDevItemIndex === -1
							? "location-subpage-development-items"
							: "location-subpage-development-items location-subpage-development-items-location-images-open"
					}
					enableDragDrop={isReorderingDevelopmentItems}
					onDropItem={reorderDevelopmentItems}
				>
					{location?.data?.development?.items?.map((developmentItem, index) => (
						<DragDropItem className='location-subpage-development-item-container' key={index} index={index}>
							<DevelopmentItem
								index={index}
								developmentItem={developmentItem}
								isEditing={true}
								changeDevelopmentItemTitle={changeDevelopmentItemTitle}
								changeDevelopmentItemText={changeDevelopmentItemText}
								removeDevelopmentItem={removeDevelopmentItem}
								isReorderingDevelopmentItems={isReorderingDevelopmentItems}
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
