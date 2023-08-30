// Packages
import { FaPlus, FaTimes } from "react-icons/fa";

// Components
import { IconBtn } from "../../../../components/IconBtn/IconBtn";

// Logic
import { LocationImageItemLogic } from "./LocationImageItemLogic";

// Context

// Services

// Styles
import "./LocationImageItem.css";

// Assets

export const LocationImageItem = ({ image_id, onAddImage, onRemoveImage }) => {
	const { image } = LocationImageItemLogic({ image_id });

	return (
		<div className='location-image-item'>
			<div className='location-image-item-image'>{!image?.image ? null : <img src={image.image} alt='' />}</div>
			<div className='location-image-item-btns-container'>
				{image?.isUnsaved ? null : <IconBtn icon={<FaPlus />} iconName='plus' onClick={() => onAddImage(image_id)} />}
				{!onRemoveImage ? null : <IconBtn icon={<FaTimes />} iconName='times' onClick={() => onRemoveImage(image_id)} />}
			</div>
		</div>
	);
};
