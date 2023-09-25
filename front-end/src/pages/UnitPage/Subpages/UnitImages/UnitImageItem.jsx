// Packages
import { FaPlus, FaTimes } from "react-icons/fa";

// Components
import { IconBtn } from "../../../../components/IconBtn/IconBtn";

// Logic
import { UnitImageItemLogic } from "./UnitImageItemLogic";

// Context

// Services

// Styles
import "./UnitImageItem.css";

// Assets

export const UnitImageItem = ({ image_id, onAddImage, onRemoveImage }) => {
	const { image } = UnitImageItemLogic({ image_id });

	return (
		<div className='unit-page-image-item'>
			<div className='unit-page-image-item-image'>{!image?.image ? null : <img src={image.image} alt='' />}</div>
			<div className='unit-page-image-item-btns-container'>
				{image?.isUnsaved ? null : <IconBtn icon={<FaPlus />} iconName='plus' onClick={() => onAddImage(image_id)} />}
				{!onRemoveImage ? null : <IconBtn icon={<FaTimes />} iconName='times' onClick={() => onRemoveImage(image_id)} />}
			</div>
		</div>
	);
};
