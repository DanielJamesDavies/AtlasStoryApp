// Packages

// Components
import { MiscellaneousItem } from "./MiscellaneousItem";
import { EditableContainer } from "../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../components/DragDropItem/DragDropItem";
import { SubstoryImages } from "../../SubstoryImages/SubstoryImages";
import { ErrorMessage } from "../../../../../components/ErrorMessage/ErrorMessage";

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
		substory,
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
		substoryImagesCurrDevItemIndex,
		openSubstoryImages,
		closeSubstoryImages,
		addImageToDevItem,
		miscellaneousItemsRef,
		onMiscellaneousItemsContainerScroll,
	} = MiscellaneousItemsLogic();

	return (
		<EditableContainer
			className='substory-subpage-miscellaneous-items-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onAdd={addMiscellaneousItem}
			onReorder={toggleIsReorderingMiscellaneousItems}
			onRevert={revertMiscellaneousItems}
			onSave={saveMiscellaneousItems}
			onScroll={onMiscellaneousItemsContainerScroll}
		>
			<div ref={miscellaneousItemsRef} className='substory-subpage-miscellaneous-items'>
				{substory?.data?.miscellaneous?.items?.map((miscellaneousItem, index) => (
					<div key={index} className='substory-subpage-miscellaneous-item-container'>
						<MiscellaneousItem index={index} miscellaneousItem={miscellaneousItem} isEditing={false} />
					</div>
				))}
			</div>
			<div>
				<ErrorMessage errors={errors} />
				<DragDropContainer
					innerRef={miscellaneousItemsRef}
					className={
						substoryImagesCurrDevItemIndex === -1
							? "substory-subpage-miscellaneous-items"
							: "substory-subpage-miscellaneous-items substory-subpage-miscellaneous-items-substory-images-open"
					}
					enableDragDrop={isReorderingMiscellaneousItems}
					onDropItem={reorderMiscellaneousItems}
				>
					{substory?.data?.miscellaneous?.items?.map((miscellaneousItem, index) => (
						<DragDropItem className='substory-subpage-miscellaneous-item-container' key={index} index={index}>
							<MiscellaneousItem
								index={index}
								miscellaneousItem={miscellaneousItem}
								isEditing={true}
								changeMiscellaneousItemTitle={changeMiscellaneousItemTitle}
								changeMiscellaneousItemText={changeMiscellaneousItemText}
								removeMiscellaneousItem={removeMiscellaneousItem}
								isReorderingMiscellaneousItems={isReorderingMiscellaneousItems}
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
