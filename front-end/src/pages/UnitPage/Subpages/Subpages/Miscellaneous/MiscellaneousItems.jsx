// Packages

// Components
import { MiscellaneousItem } from "./MiscellaneousItem";
import { EditableContainer } from "../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../components/DragDropItem/DragDropItem";
import { ErrorMessage } from "../../../../../components/ErrorMessage/ErrorMessage";
import { UnitImages } from "../../UnitImages/UnitImages";

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
		unit,
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
		UnitImagesCurrDevItemIndex,
		openUnitImages,
		closeUnitImages,
		addImageToDevItem,
		miscellaneousItemsRef,
		onMiscellaneousItemsContainerScroll,
	} = MiscellaneousItemsLogic();

	return (
		<EditableContainer
			className='unit-page-subpage-miscellaneous-items-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onAdd={addMiscellaneousItem}
			onReorder={toggleIsReorderingMiscellaneousItems}
			onRevert={revertMiscellaneousItems}
			onSave={saveMiscellaneousItems}
			onScroll={onMiscellaneousItemsContainerScroll}
			controlScrollDepth={[1, 2]}
			scrollItemsDepth={[1, 2]}
		>
			<div ref={miscellaneousItemsRef} className='unit-page-subpage-miscellaneous-items'>
				{unit?.data?.miscellaneous?.items?.map((miscellaneousItem, index) => (
					<div
						key={index}
						className={"unit-page-subpage-miscellaneous-item-container unit-page-subpage-miscellaneous-item-container-" + index}
					>
						<MiscellaneousItem index={index} miscellaneousItem={miscellaneousItem} isEditing={false} />
					</div>
				))}
			</div>
			<div>
				<ErrorMessage errors={errors} />
				<DragDropContainer
					innerRef={miscellaneousItemsRef}
					className={
						UnitImagesCurrDevItemIndex === -1
							? "unit-page-subpage-miscellaneous-items"
							: "unit-page-subpage-miscellaneous-items unit-page-subpage-miscellaneous-items-unit-page-images-open"
					}
					enableDragDrop={isReorderingMiscellaneousItems}
					onDropItem={reorderMiscellaneousItems}
					includeVerticalDrag={true}
				>
					{unit?.data?.miscellaneous?.items?.map((miscellaneousItem, index) => (
						<DragDropItem
							className={"unit-page-subpage-miscellaneous-item-container unit-page-subpage-miscellaneous-item-container-" + index}
							key={index}
							index={index}
						>
							<MiscellaneousItem
								index={index}
								miscellaneousItem={miscellaneousItem}
								isEditing={true}
								changeMiscellaneousItemTitle={changeMiscellaneousItemTitle}
								changeMiscellaneousItemText={changeMiscellaneousItemText}
								removeMiscellaneousItem={removeMiscellaneousItem}
								isReorderingMiscellaneousItems={isReorderingMiscellaneousItems}
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
