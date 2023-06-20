// Packages

// Components
import { CustomItem } from "./CustomItem";
import { EditableContainer } from "../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../components/DragDropItem/DragDropItem";
import { ErrorMessage } from "../../../../../components/ErrorMessage/ErrorMessage";
import { SubstoryImages } from "../../SubstoryImages/SubstoryImages";

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
		substory,
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
		substoryImagesCurrDevItemIndex,
		openSubstoryImages,
		closeSubstoryImages,
		addImageToDevItem,
		customItemsRef,
		onCustomItemsContainerScroll,
	} = CustomItemsLogic();

	return (
		<EditableContainer
			className='substory-subpage-custom-items-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onAdd={addCustomItem}
			onReorder={toggleIsReorderingCustomItems}
			onRevert={revertCustomItems}
			onSave={saveCustomItems}
			onScroll={onCustomItemsContainerScroll}
		>
			<div ref={customItemsRef} className='substory-subpage-custom-items'>
				{substory?.data?.custom_subpages
					.find((e) => e.id === openSubpageID)
					?.items?.map((customItem, index) => (
						<div key={index} className='substory-subpage-custom-item-container'>
							<CustomItem index={index} customItem={customItem} isEditing={false} />
						</div>
					))}
			</div>
			<div>
				<ErrorMessage errors={errors} />
				<DragDropContainer
					innerRef={customItemsRef}
					className={
						substoryImagesCurrDevItemIndex === -1
							? "substory-subpage-custom-items"
							: "substory-subpage-custom-items substory-subpage-custom-items-substory-images-open"
					}
					enableDragDrop={isReorderingCustomItems}
					onDropItem={reorderCustomItems}
					includeVerticalDrag={true}
				>
					{substory?.data?.custom_subpages
						.find((e) => e.id === openSubpageID)
						?.items?.map((customItem, index) => (
							<DragDropItem className='substory-subpage-custom-item-container' key={index} index={index}>
								<CustomItem
									index={index}
									customItem={customItem}
									isEditing={true}
									changeCustomItemTitle={changeCustomItemTitle}
									changeCustomItemText={changeCustomItemText}
									removeCustomItem={removeCustomItem}
									isReorderingCustomItems={isReorderingCustomItems}
									substoryImagesCurrDevItemIndex={substoryImagesCurrDevItemIndex}
									openSubstoryImages={openSubstoryImages}
								/>
							</DragDropItem>
						))}
				</DragDropContainer>
				{substoryImagesCurrDevItemIndex === -1 ? null : <SubstoryImages onAddImage={addImageToDevItem} onClose={closeSubstoryImages} />}
			</div>
		</EditableContainer>
	);
};
