// Packages
import { FaPlus, FaTimes } from "react-icons/fa";

// Components
import { IconBtn } from "../../../../components/IconBtn/IconBtn";

// Logic
import { GroupImageItemLogic } from "./GroupImageItemLogic";

// Context

// Services

// Styles
import "./GroupImageItem.css";

// Assets

export const GroupImageItem = ({ image_id, onAddImage, onRemoveImage }) => {
	const { image } = GroupImageItemLogic({ image_id });

	return (
		<div className='group-image-item'>
			<div className='group-image-item-image'>{!image?.image ? null : <img src={image.image} alt='' />}</div>
			<div className='group-image-item-btns-container'>
				{image?.isUnsaved ? null : <IconBtn icon={<FaPlus />} iconName='plus' onClick={() => onAddImage(image_id)} />}
				{!onRemoveImage ? null : <IconBtn icon={<FaTimes />} iconName='times' onClick={() => onRemoveImage(image_id)} />}
			</div>
		</div>
	);
};
