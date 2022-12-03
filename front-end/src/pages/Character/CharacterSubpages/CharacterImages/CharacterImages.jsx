// Packages

// Components
import { CharacterImageItem } from "./CharacterImageItem";
import { EditableContainer } from "../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../components/DragDropItem/DragDropItem";
import { PopUpContainer } from "../../../../components/PopUpContainer/PopUpContainer";

// Logic
import { CharacterImagesLogic } from "./CharacterImagesLogic";

// Context

// Services

// Styles
import "./CharacterImages.css";

// Assets

export const CharacterImages = ({ onAddImage, onClose }) => {
	const {
		isAuthorizedToEdit,
		character,
		characterImagesContainerRef,
		addImageInputRef,
		onAddImageToCharacterImages,
		removeCharacterImage,
		isReorderingCharacterImages,
		toggleIsReorderingCharacterImages,
		reorderCharacterImages,
		revertCharacterImages,
		saveCharacterImages,
	} = CharacterImagesLogic();

	if (document.body.clientWidth > 1000)
		return (
			<EditableContainer
				innerRef={characterImagesContainerRef}
				className='character-images-container'
				isAuthorizedToEdit={isAuthorizedToEdit}
				onClose={onClose}
				onAdd={() => addImageInputRef.current.click()}
				onReorder={toggleIsReorderingCharacterImages}
				onRevert={revertCharacterImages}
				onSave={saveCharacterImages}
				onScroll={(e) => e.stopPropagation()}
			>
				<div className='character-images'>
					<div className='character-images-title'>All Character Images</div>
					{character?.data?.images?.map((image_id, index) => (
						<div key={index} className='character-image-item-container'>
							<CharacterImageItem image_id={image_id} onAddImage={onAddImage} />
						</div>
					))}
				</div>
				<div className='character-images'>
					<div className='character-images-title'>All Character Images</div>
					<DragDropContainer onDropItem={reorderCharacterImages} enableDragDrop={isReorderingCharacterImages}>
						{character?.data?.images?.map((image_id, index) => (
							<DragDropItem key={index} index={index} className='character-image-item-container'>
								<CharacterImageItem image_id={image_id} onAddImage={onAddImage} onRemoveImage={removeCharacterImage} />
							</DragDropItem>
						))}
					</DragDropContainer>
					<input
						ref={addImageInputRef}
						className='character-images-add-image-input'
						type='file'
						accept='image/*'
						onChange={onAddImageToCharacterImages}
					/>
				</div>
			</EditableContainer>
		);

	return (
		<PopUpContainer className='character-images-container-container' title='All Character Images' isDisplaying={true} onClosePopUp={onClose}>
			<EditableContainer
				innerRef={characterImagesContainerRef}
				className='character-images-container'
				isAuthorizedToEdit={isAuthorizedToEdit}
				onAdd={() => addImageInputRef.current.click()}
				onReorder={toggleIsReorderingCharacterImages}
				onRevert={revertCharacterImages}
				onSave={saveCharacterImages}
				onScroll={(e) => e.stopPropagation()}
			>
				<div className='character-images'>
					{character?.data?.images?.map((image_id, index) => (
						<div key={index} className='character-image-item-container'>
							<CharacterImageItem image_id={image_id} onAddImage={onAddImage} />
						</div>
					))}
				</div>
				<div className='character-images'>
					<DragDropContainer onDropItem={reorderCharacterImages} enableDragDrop={isReorderingCharacterImages}>
						{character?.data?.images?.map((image_id, index) => (
							<DragDropItem key={index} index={index} className='character-image-item-container'>
								<CharacterImageItem image_id={image_id} onAddImage={onAddImage} onRemoveImage={removeCharacterImage} />
							</DragDropItem>
						))}
					</DragDropContainer>
					<input
						ref={addImageInputRef}
						className='character-images-add-image-input'
						type='file'
						accept='image/*'
						onChange={onAddImageToCharacterImages}
					/>
				</div>
			</EditableContainer>
		</PopUpContainer>
	);
};
