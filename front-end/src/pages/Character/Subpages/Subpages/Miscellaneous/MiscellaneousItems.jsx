// Packages

// Components
import { MiscellaneousItem } from "./MiscellaneousItem";
import { EditableContainer } from "../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../components/DragDropItem/DragDropItem";
import { ErrorMessage } from "../../../../../components/ErrorMessage/ErrorMessage";
import { CharacterImages } from "../../CharacterImages/CharacterImages";

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
		character,
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
		characterImagesCurrDevItemIndex,
		openCharacterImages,
		closeCharacterImages,
		addImageToDevItem,
		miscellaneousItemsRef,
		onMiscellaneousItemsContainerScroll,
	} = MiscellaneousItemsLogic();

	return (
		<EditableContainer
			className='character-subpage-miscellaneous-items-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onAdd={addMiscellaneousItem}
			onReorder={toggleIsReorderingMiscellaneousItems}
			onRevert={revertMiscellaneousItems}
			onSave={saveMiscellaneousItems}
			onScroll={onMiscellaneousItemsContainerScroll}
			controlScrollDepth={[1, 2]}
		>
			<div ref={miscellaneousItemsRef} className='character-subpage-miscellaneous-items'>
				{character?.data?.miscellaneous?.items?.map((miscellaneousItem, index) => (
					<div key={index} className='character-subpage-miscellaneous-item-container'>
						<MiscellaneousItem index={index} miscellaneousItem={miscellaneousItem} isEditing={false} />
					</div>
				))}
			</div>
			<div>
				<ErrorMessage errors={errors} />
				<DragDropContainer
					innerRef={miscellaneousItemsRef}
					className={
						characterImagesCurrDevItemIndex === -1
							? "character-subpage-miscellaneous-items"
							: "character-subpage-miscellaneous-items character-subpage-miscellaneous-items-character-images-open"
					}
					enableDragDrop={isReorderingMiscellaneousItems}
					onDropItem={reorderMiscellaneousItems}
					includeVerticalDrag={true}
				>
					{character?.data?.miscellaneous?.items?.map((miscellaneousItem, index) => (
						<DragDropItem className='character-subpage-miscellaneous-item-container' key={index} index={index}>
							<MiscellaneousItem
								index={index}
								miscellaneousItem={miscellaneousItem}
								isEditing={true}
								changeMiscellaneousItemTitle={changeMiscellaneousItemTitle}
								changeMiscellaneousItemText={changeMiscellaneousItemText}
								removeMiscellaneousItem={removeMiscellaneousItem}
								isReorderingMiscellaneousItems={isReorderingMiscellaneousItems}
								characterImagesCurrDevItemIndex={characterImagesCurrDevItemIndex}
								openCharacterImages={openCharacterImages}
							/>
						</DragDropItem>
					))}
				</DragDropContainer>
				{characterImagesCurrDevItemIndex === -1 ? null : <CharacterImages onAddImage={addImageToDevItem} onClose={closeCharacterImages} />}
			</div>
		</EditableContainer>
	);
};
