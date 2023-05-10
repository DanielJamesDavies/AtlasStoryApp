// Packages
import { FaPlus, FaTimes } from "react-icons/fa";

// Components
import { IconBtn } from "../../../../components/IconBtn/IconBtn";

// Logic
import { CharacterImageItemLogic } from "./CharacterImageItemLogic";

// Context

// Services

// Styles
import "./CharacterImageItem.css";

// Assets

export const CharacterImageItem = ({ image_id, onAddImage, onRemoveImage }) => {
	const { image } = CharacterImageItemLogic({ image_id });

	return (
		<div className='character-image-item'>
			<div className='character-image-item-image'>{!image?.image ? null : <img src={image.image} alt='' />}</div>
			<div className='character-image-item-btns-container'>
				{image?.isUnsaved ? null : <IconBtn icon={<FaPlus />} iconName='plus' onClick={() => onAddImage(image_id)} />}
				{!onRemoveImage ? null : <IconBtn icon={<FaTimes />} iconName='times' onClick={() => onRemoveImage(image_id)} />}
			</div>
		</div>
	);
};
