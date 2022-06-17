// Packages

// Components

// Logic
import { GalleryItemLogic } from "./GalleryItemLogic";

// Context

// Services

// Styles
import "./GalleryItem.css";
import { IconBtn } from "../../../../../components/IconBtn/IconBtn";
import { FaTimes } from "react-icons/fa";

// Assets

export const GalleryItem = ({ image, index, isEditing, removeGalleryItem }) => {
	const { galleryItemImage } = GalleryItemLogic({ image, index });

	return (
		<div className='character-subpage-gallery-item'>
			{!galleryItemImage ? null : <img src={galleryItemImage} alt='' />}
			{!isEditing ? null : (
				<div className='character-subpage-gallery-item-btns-container'>
					<IconBtn icon={<FaTimes />} iconName='remove' seamless={true} onClick={() => removeGalleryItem(index)} />
				</div>
			)}
		</div>
	);
};
