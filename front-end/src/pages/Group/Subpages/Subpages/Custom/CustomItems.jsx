// Packages

// Components
import { CustomItem } from "./CustomItem";
import { EditableContainer } from "../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../components/DragDropItem/DragDropItem";
import { ErrorMessage } from "../../../../../components/ErrorMessage/ErrorMessage";
import { GroupImages } from "../../GroupImages/GroupImages";

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
		group,
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
		groupImagesCurrDevItemIndex,
		openGroupImages,
		closeGroupImages,
		addImageToDevItem,
		customItemsRef,
		onCustomItemsContainerScroll,
	} = CustomItemsLogic();

	return (
		<EditableContainer
			className='group-subpage-custom-items-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onAdd={addCustomItem}
			onReorder={toggleIsReorderingCustomItems}
			onRevert={revertCustomItems}
			onSave={saveCustomItems}
			onScroll={onCustomItemsContainerScroll}
		>
			<div ref={customItemsRef} className='group-subpage-custom-items'>
				{group?.data?.custom_subpages
					.find((e) => e.id === openSubpageID)
					?.items?.map((customItem, index) => (
						<div key={index} className='group-subpage-custom-item-container'>
							<CustomItem index={index} customItem={customItem} isEditing={false} />
						</div>
					))}
			</div>
			<div>
				<ErrorMessage errors={errors} />
				<DragDropContainer
					innerRef={customItemsRef}
					className={
						groupImagesCurrDevItemIndex === -1
							? "group-subpage-custom-items"
							: "group-subpage-custom-items group-subpage-custom-items-group-images-open"
					}
					enableDragDrop={isReorderingCustomItems}
					onDropItem={reorderCustomItems}
					includeVerticalDrag={true}
				>
					{group?.data?.custom_subpages
						.find((e) => e.id === openSubpageID)
						?.items?.map((customItem, index) => (
							<DragDropItem className='group-subpage-custom-item-container' key={index} index={index}>
								<CustomItem
									index={index}
									customItem={customItem}
									isEditing={true}
									changeCustomItemTitle={changeCustomItemTitle}
									changeCustomItemText={changeCustomItemText}
									removeCustomItem={removeCustomItem}
									isReorderingCustomItems={isReorderingCustomItems}
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
