// Packages
import { FaPlus } from "react-icons/fa";

// Components
import { CharacterImageItem } from "./CharacterImageItem";
import { EditableContainer } from "../../../../components/EditableContainer/EditableContainer";
import { IconBtn } from "../../../../components/IconBtn/IconBtn";

// Logic
import { CharacterImagesLogic } from "./CharacterImagesLogic";

// Context

// Services

// Styles
import "./CharacterImages.css";

// Assets

export const CharacterImages = ({ onAddImage }) => {
	const { isAuthorizedToEdit, character, characterImagesRef, addImageInputRef, onAddImageInputChange } = CharacterImagesLogic();

	return (
		<EditableContainer className='character-images-container' isAuthorizedToEdit={isAuthorizedToEdit}>
			<div ref={characterImagesRef} className='character-images'>
				{character?.data?.images?.map((image_id, index) => (
					<CharacterImageItem key={index} image_id={image_id} index={index} onAddImage={onAddImage} />
				))}
			</div>
			<div ref={characterImagesRef} className='character-images'>
				{character?.data?.images?.map((image_id, index) => (
					<CharacterImageItem key={index} image_id={image_id} index={index} onAddImage={onAddImage} />
				))}
				<div className='character-images-add-image-container'>
					<input
						ref={addImageInputRef}
						className='character-images-add-image-input'
						type='file'
						accept='image/*'
						onChange={onAddImageInputChange}
					/>
					<IconBtn icon={<FaPlus />} iconName='plus' seamless={true} onClick={() => addImageInputRef.current.click()} />
				</div>
			</div>
		</EditableContainer>
	);
};
