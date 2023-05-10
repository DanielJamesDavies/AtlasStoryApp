// Packages

// Components
import { DevelopmentItem } from "./DevelopmentItem";
import { EditableContainer } from "../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../components/DragDropItem/DragDropItem";
import { ErrorMessage } from "../../../../../components/ErrorMessage/ErrorMessage";
import { CharacterImages } from "../../CharacterImages/CharacterImages";

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
		character,
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
		characterImagesCurrDevItemIndex,
		openCharacterImages,
		closeCharacterImages,
		addImageToDevItem,
		developmentItemsRef,
		onDevelopmentItemsContainerScroll,
	} = DevelopmentItemsLogic();

	return (
		<EditableContainer
			className='character-subpage-development-items-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onAdd={addDevelopmentItem}
			onReorder={toggleIsReorderingDevelopmentItems}
			onRevert={revertDevelopmentItems}
			onSave={saveDevelopmentItems}
			onScroll={onDevelopmentItemsContainerScroll}
		>
			<div ref={developmentItemsRef} className='character-subpage-development-items'>
				{character?.data?.development?.items?.map((developmentItem, index) => (
					<div key={index} className='character-subpage-development-item-container'>
						<DevelopmentItem index={index} developmentItem={developmentItem} isEditing={false} />
					</div>
				))}
			</div>
			<div>
				<ErrorMessage errors={errors} />
				<DragDropContainer
					innerRef={developmentItemsRef}
					className={
						characterImagesCurrDevItemIndex === -1
							? "character-subpage-development-items"
							: "character-subpage-development-items character-subpage-development-items-character-images-open"
					}
					enableDragDrop={isReorderingDevelopmentItems}
					onDropItem={reorderDevelopmentItems}
					includeVerticalDrag={true}
				>
					{character?.data?.development?.items?.map((developmentItem, index) => (
						<DragDropItem className='character-subpage-development-item-container' key={index} index={index}>
							<DevelopmentItem
								index={index}
								developmentItem={developmentItem}
								isEditing={true}
								changeDevelopmentItemTitle={changeDevelopmentItemTitle}
								changeDevelopmentItemText={changeDevelopmentItemText}
								removeDevelopmentItem={removeDevelopmentItem}
								isReorderingDevelopmentItems={isReorderingDevelopmentItems}
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
