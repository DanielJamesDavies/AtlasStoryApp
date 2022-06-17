// Packages

// Components
import { CharacterImageItem } from "./CharacterImageItem";
import { EditableContainer } from "../../../../components/EditableContainer/EditableContainer";

// Logic
import { CharacterImagesLogic } from "./CharacterImagesLogic";

// Context

// Services

// Styles
import "./CharacterImages.css";

// Assets

export const CharacterImages = ({ onAddImage }) => {
	const {
		isAuthorizedToEdit,
		character,
		characterImagesContainerRef,
		addImageInputRef,
		onAddImageToCharacterImages,
		removeCharacterImage,
		revertCharacterImages,
		saveCharacterImages,
	} = CharacterImagesLogic();

	return (
		<EditableContainer
			innerRef={characterImagesContainerRef}
			className='character-images-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onAdd={() => addImageInputRef.current.click()}
			onRevert={revertCharacterImages}
			onSave={saveCharacterImages}
		>
			<div className='character-images'>
				<div className='character-images-title'>All Character Images</div>
				{character?.data?.images?.map((image_id, index) => (
					<CharacterImageItem key={index} image_id={image_id} index={index} onAddImage={onAddImage} />
				))}
			</div>
			<div className='character-images'>
				<div className='character-images-title'>All Character Images</div>
				{character?.data?.images?.map((image_id, index) => (
					<CharacterImageItem
						key={index}
						image_id={image_id}
						index={index}
						onAddImage={onAddImage}
						onRemoveImage={removeCharacterImage}
					/>
				))}
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
};
