// Packages

// Components
import { DevelopmentItem } from "./DevelopmentItem";
import { EditableContainer } from "../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../components/DragDropItem/DragDropItem";
import { ErrorMessage } from "../../../../../components/ErrorMessage/ErrorMessage";
import { GroupImages } from "../../GroupImages/GroupImages";

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
		group,
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
		groupImagesCurrDevItemIndex,
		openGroupImages,
		closeGroupImages,
		addImageToDevItem,
		developmentItemsRef,
		onDevelopmentItemsContainerScroll,
	} = DevelopmentItemsLogic();

	return (
		<EditableContainer
			className='group-subpage-development-items-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onAdd={addDevelopmentItem}
			onReorder={toggleIsReorderingDevelopmentItems}
			onRevert={revertDevelopmentItems}
			onSave={saveDevelopmentItems}
			onScroll={onDevelopmentItemsContainerScroll}
		>
			<div ref={developmentItemsRef} className='group-subpage-development-items'>
				{group?.data?.development?.items?.map((developmentItem, index) => (
					<div key={index} className='group-subpage-development-item-container'>
						<DevelopmentItem index={index} developmentItem={developmentItem} isEditing={false} />
					</div>
				))}
			</div>
			<div>
				<ErrorMessage errors={errors} />
				<DragDropContainer
					innerRef={developmentItemsRef}
					className={
						groupImagesCurrDevItemIndex === -1
							? "group-subpage-development-items"
							: "group-subpage-development-items group-subpage-development-items-group-images-open"
					}
					enableDragDrop={isReorderingDevelopmentItems}
					onDropItem={reorderDevelopmentItems}
					includeVerticalDrag={true}
				>
					{group?.data?.development?.items?.map((developmentItem, index) => (
						<DragDropItem className='group-subpage-development-item-container' key={index} index={index}>
							<DevelopmentItem
								index={index}
								developmentItem={developmentItem}
								isEditing={true}
								changeDevelopmentItemTitle={changeDevelopmentItemTitle}
								changeDevelopmentItemText={changeDevelopmentItemText}
								removeDevelopmentItem={removeDevelopmentItem}
								isReorderingDevelopmentItems={isReorderingDevelopmentItems}
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
