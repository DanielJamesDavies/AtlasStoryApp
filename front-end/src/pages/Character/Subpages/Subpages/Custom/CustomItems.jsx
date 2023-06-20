// Packages

// Components
import { CustomItem } from "./CustomItem";
import { EditableContainer } from "../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../components/DragDropItem/DragDropItem";
import { ErrorMessage } from "../../../../../components/ErrorMessage/ErrorMessage";
import { CharacterImages } from "../../CharacterImages/CharacterImages";

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
		character,
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
		characterImagesCurrDevItemIndex,
		openCharacterImages,
		closeCharacterImages,
		addImageToDevItem,
		customItemsRef,
		onCustomItemsContainerScroll,
	} = CustomItemsLogic();

	return (
		<EditableContainer
			className='character-subpage-custom-items-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onAdd={addCustomItem}
			onReorder={toggleIsReorderingCustomItems}
			onRevert={revertCustomItems}
			onSave={saveCustomItems}
			onScroll={onCustomItemsContainerScroll}
		>
			<div ref={customItemsRef} className='character-subpage-custom-items'>
				{character?.data?.custom_subpages
					.find((e) => e.id === openSubpageID)
					?.items?.map((customItem, index) => (
						<div key={index} className='character-subpage-custom-item-container'>
							<CustomItem index={index} customItem={customItem} isEditing={false} />
						</div>
					))}
			</div>
			<div>
				<ErrorMessage errors={errors} />
				<DragDropContainer
					innerRef={customItemsRef}
					className={
						characterImagesCurrDevItemIndex === -1
							? "character-subpage-custom-items"
							: "character-subpage-custom-items character-subpage-custom-items-character-images-open"
					}
					enableDragDrop={isReorderingCustomItems}
					onDropItem={reorderCustomItems}
					includeVerticalDrag={true}
				>
					{character?.data?.custom_subpages
						.find((e) => e.id === openSubpageID)
						?.items?.map((customItem, index) => (
							<DragDropItem className='character-subpage-custom-item-container' key={index} index={index}>
								<CustomItem
									index={index}
									customItem={customItem}
									isEditing={true}
									changeCustomItemTitle={changeCustomItemTitle}
									changeCustomItemText={changeCustomItemText}
									removeCustomItem={removeCustomItem}
									isReorderingCustomItems={isReorderingCustomItems}
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
