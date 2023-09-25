// Packages

// Components
import { DetailsItem } from "./DetailsItem";
import { EditableContainer } from "../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../components/DragDropItem/DragDropItem";
import { ErrorMessage } from "../../../../../components/ErrorMessage/ErrorMessage";
import { UnitImages } from "../../UnitImages/UnitImages";

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
		unit,
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
		unitImagesCurrDevItemIndex,
		openUnitImages,
		closeUnitImages,
		addImageToDevItem,
		detailsItemsRef,
		onDetailsItemsContainerScroll,
	} = DetailsItemsLogic();

	return (
		<EditableContainer
			className='unit-page-subpage-details-items-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onAdd={addDetailsItem}
			onReorder={toggleIsReorderingDetailsItems}
			onRevert={revertDetailsItems}
			onSave={saveDetailsItems}
			onScroll={onDetailsItemsContainerScroll}
			controlScrollDepth={[1, 2]}
		>
			<div ref={detailsItemsRef} className='unit-page-subpage-details-items'>
				{unit?.data?.details?.items?.map((detailsItem, index) => (
					<div key={index} className='unit-page-subpage-details-item-container'>
						<DetailsItem index={index} detailsItem={detailsItem} isEditing={false} />
					</div>
				))}
			</div>
			<div>
				<ErrorMessage errors={errors} />
				<DragDropContainer
					innerRef={detailsItemsRef}
					className={
						unitImagesCurrDevItemIndex === -1
							? "unit-page-subpage-details-items"
							: "unit-page-subpage-details-items unit-page-subpage-details-items-unit-page-images-open"
					}
					enableDragDrop={isReorderingDetailsItems}
					onDropItem={reorderDetailsItems}
					includeVerticalDrag={true}
				>
					{unit?.data?.details?.items?.map((detailsItem, index) => (
						<DragDropItem className='unit-page-subpage-details-item-container' key={index} index={index}>
							<DetailsItem
								index={index}
								detailsItem={detailsItem}
								isEditing={true}
								changeDetailsItemTitle={changeDetailsItemTitle}
								changeDetailsItemText={changeDetailsItemText}
								removeDetailsItem={removeDetailsItem}
								isReorderingDetailsItems={isReorderingDetailsItems}
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
