// Packages

// Components
import { DevelopmentItem } from "./DevelopmentItem";
import { EditableContainer } from "../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../components/DragDropItem/DragDropItem";
import { SubstoryImages } from "../../SubstoryImages/SubstoryImages";
import { ErrorMessage } from "../../../../../components/ErrorMessage/ErrorMessage";

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
		substory,
		changeDevelopmentItemTitle,
		changeDevelopmentItemValue,
		addDevelopmentItem,
		removeDevelopmentItem,
		isReorderingDevelopmentItems,
		toggleIsReorderingDevelopmentItems,
		reorderDevelopmentItems,
		revertDevelopmentItems,
		saveDevelopmentItems,
		errors,
		substoryImagesCurrDevItemIndex,
		openSubstoryImages,
		closeSubstoryImages,
		addImageToDevItem,
		developmentItemsRef,
		onDevelopmentItemsContainerScroll,
	} = DevelopmentItemsLogic();

	return (
		<EditableContainer
			className='substory-subpage-development-items-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onAdd={addDevelopmentItem}
			onReorder={toggleIsReorderingDevelopmentItems}
			onRevert={revertDevelopmentItems}
			onSave={saveDevelopmentItems}
			onScroll={onDevelopmentItemsContainerScroll}
		>
			<div ref={developmentItemsRef} className='substory-subpage-development-items'>
				{substory?.data?.development?.items?.map((developmentItem, index) => (
					<div key={index} className='substory-subpage-development-item-container'>
						<DevelopmentItem index={index} developmentItem={developmentItem} isEditing={false} />
					</div>
				))}
			</div>
			<div>
				<ErrorMessage errors={errors} />
				<DragDropContainer
					innerRef={developmentItemsRef}
					className={
						substoryImagesCurrDevItemIndex === -1
							? "substory-subpage-development-items"
							: "substory-subpage-development-items substory-subpage-development-items-substory-images-open"
					}
					enableDragDrop={isReorderingDevelopmentItems}
					onDropItem={reorderDevelopmentItems}
				>
					{substory?.data?.development?.items?.map((developmentItem, index) => (
						<DragDropItem className='substory-subpage-development-item-container' key={index} index={index}>
							<DevelopmentItem
								index={index}
								developmentItem={developmentItem}
								isEditing={true}
								changeDevelopmentItemTitle={changeDevelopmentItemTitle}
								changeDevelopmentItemValue={changeDevelopmentItemValue}
								removeDevelopmentItem={removeDevelopmentItem}
								isReorderingDevelopmentItems={isReorderingDevelopmentItems}
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
