// Packages

// Components
import { SubstoryImageItem } from "./SubstoryImageItem";
import { EditableContainer } from "../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../components/DragDropItem/DragDropItem";

// Logic
import { SubstoryImagesLogic } from "./SubstoryImagesLogic";

// Context

// Services

// Styles
import "./SubstoryImages.css";

// Assets

export const SubstoryImages = ({ onAddImage, onClose }) => {
	const {
		isAuthorizedToEdit,
		substory,
		substoryImagesContainerRef,
		addImageInputRef,
		onAddImageToSubstoryImages,
		removeSubstoryImage,
		isReorderingSubstoryImages,
		toggleIsReorderingSubstoryImages,
		reorderSubstoryImages,
		revertSubstoryImages,
		saveSubstoryImages,
	} = SubstoryImagesLogic();

	return (
		<EditableContainer
			innerRef={substoryImagesContainerRef}
			className='substory-images-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onClose={onClose}
			onAdd={() => addImageInputRef.current.click()}
			onReorder={toggleIsReorderingSubstoryImages}
			onRevert={revertSubstoryImages}
			onSave={saveSubstoryImages}
			onScroll={(e) => e.stopPropagation()}
		>
			<div className='substory-images'>
				<div className='substory-images-title'>All Substory Images</div>
				{substory?.data?.images?.map((image_id, index) => (
					<div key={index} className='substory-image-item-container'>
						<SubstoryImageItem image_id={image_id} onAddImage={onAddImage} />
					</div>
				))}
			</div>
			<div className='substory-images'>
				<div className='substory-images-title'>All Substory Images</div>
				<DragDropContainer onDropItem={reorderSubstoryImages} enableDragDrop={isReorderingSubstoryImages}>
					{substory?.data?.images?.map((image_id, index) => (
						<DragDropItem key={index} index={index} className='substory-image-item-container'>
							<SubstoryImageItem image_id={image_id} onAddImage={onAddImage} onRemoveImage={removeSubstoryImage} />
						</DragDropItem>
					))}
				</DragDropContainer>
				<input
					ref={addImageInputRef}
					className='substory-images-add-image-input'
					type='file'
					accept='image/*'
					onChange={onAddImageToSubstoryImages}
				/>
			</div>
		</EditableContainer>
	);
};
