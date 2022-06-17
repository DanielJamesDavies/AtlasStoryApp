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

export const CharacterImageItem = ({ image_id, index, onAddImage, onRemoveImage }) => {
	const { image } = CharacterImageItemLogic({ image_id, index });

	return (
		<div className='character-image-item'>
			<div className='character-image-item-image'>{!image ? null : <img src={image} alt='' />}</div>
			<div className='character-image-item-btns-container'>
				<IconBtn icon={<FaPlus />} iconName='plus' seamless={true} onClick={() => onAddImage(image_id)} />
				{!onRemoveImage ? null : <IconBtn icon={<FaTimes />} iconName='times' seamless={true} onClick={() => onRemoveImage(image_id)} />}
			</div>
		</div>
	);
};
