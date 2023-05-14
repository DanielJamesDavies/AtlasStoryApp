// Packages

// Components
import { MiscellaneousItem } from "./MiscellaneousItem";
import { EditableContainer } from "../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../components/DragDropItem/DragDropItem";
import { ErrorMessage } from "../../../../../components/ErrorMessage/ErrorMessage";
import { GroupImages } from "../../GroupImages/GroupImages";

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
		group,
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
		groupImagesCurrDevItemIndex,
		openGroupImages,
		closeGroupImages,
		addImageToDevItem,
		miscellaneousItemsRef,
		onMiscellaneousItemsContainerScroll,
	} = MiscellaneousItemsLogic();

	return (
		<EditableContainer
			className='group-subpage-miscellaneous-items-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onAdd={addMiscellaneousItem}
			onReorder={toggleIsReorderingMiscellaneousItems}
			onRevert={revertMiscellaneousItems}
			onSave={saveMiscellaneousItems}
			onScroll={onMiscellaneousItemsContainerScroll}
		>
			<div ref={miscellaneousItemsRef} className='group-subpage-miscellaneous-items'>
				{group?.data?.miscellaneous?.items?.map((miscellaneousItem, index) => (
					<div key={index} className='group-subpage-miscellaneous-item-container'>
						<MiscellaneousItem index={index} miscellaneousItem={miscellaneousItem} isEditing={false} />
					</div>
				))}
			</div>
			<div>
				<ErrorMessage errors={errors} />
				<DragDropContainer
					innerRef={miscellaneousItemsRef}
					className={
						groupImagesCurrDevItemIndex === -1
							? "group-subpage-miscellaneous-items"
							: "group-subpage-miscellaneous-items group-subpage-miscellaneous-items-group-images-open"
					}
					enableDragDrop={isReorderingMiscellaneousItems}
					onDropItem={reorderMiscellaneousItems}
					includeVerticalDrag={true}
				>
					{group?.data?.miscellaneous?.items?.map((miscellaneousItem, index) => (
						<DragDropItem className='group-subpage-miscellaneous-item-container' key={index} index={index}>
							<MiscellaneousItem
								index={index}
								miscellaneousItem={miscellaneousItem}
								isEditing={true}
								changeMiscellaneousItemTitle={changeMiscellaneousItemTitle}
								changeMiscellaneousItemText={changeMiscellaneousItemText}
								removeMiscellaneousItem={removeMiscellaneousItem}
								isReorderingMiscellaneousItems={isReorderingMiscellaneousItems}
								groupImagesCurrDevItemIndex={groupImagesCurrDevItemIndex}
								openGroupImages={openGroupImages}
							/>
						</DragDropItem>
					))}
				</DragDropContainer>
				{groupImagesCurrDevItemIndex === -1 ? null : <GroupImages onAddImage={addImageToDevItem} onClose={closeGroupImages} />}
			</div>
		</EditableContainer>
	);
};
