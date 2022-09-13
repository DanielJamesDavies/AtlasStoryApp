// Packages
import { FaPlus, FaTimes } from "react-icons/fa";

// Components
import { IconBtn } from "../../../../components/IconBtn/IconBtn";

// Logic
import { SubstoryImageItemLogic } from "./SubstoryImageItemLogic";

// Context

// Services

// Styles
import "./SubstoryImageItem.css";

// Assets

export const SubstoryImageItem = ({ image_id, onAddImage, onRemoveImage }) => {
	const { image } = SubstoryImageItemLogic({ image_id });

	return (
		<div className='substory-image-item'>
			<div className='substory-image-item-image'>{!image?.image ? null : <img src={image.image} alt='' />}</div>
			<div className='substory-image-item-btns-container'>
				{image?.isUnsaved ? null : <IconBtn icon={<FaPlus />} iconName='plus' onClick={() => onAddImage(image_id)} />}
				{!onRemoveImage ? null : <IconBtn icon={<FaTimes />} iconName='times' onClick={() => onRemoveImage(image_id)} />}
			</div>
		</div>
	);
};
