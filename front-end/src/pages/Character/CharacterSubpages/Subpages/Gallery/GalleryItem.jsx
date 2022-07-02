// Packages
import { FaTimes } from "react-icons/fa";

// Components
import { IconBtn } from "../../../../../components/IconBtn/IconBtn";
import { TextInput } from "../../../../../components/TextInput/TextInput";

// Logic
import { GalleryItemLogic } from "./GalleryItemLogic";

// Context

// Services

// Styles
import "./GalleryItem.css";

// Assets

export const GalleryItem = ({ image, index, isEditing, removeGalleryItem }) => {
	const { galleryItemImage, changeGalleryItemCaption } = GalleryItemLogic({ image, index });

	return (
		<div className='character-subpage-gallery-item'>
			{!galleryItemImage ? null : <img src={galleryItemImage} alt='' />}
			{!isEditing ? (
				<>
					{image.caption.split(" ").join("").length === 0 ? null : (
						<div className='character-subpage-gallery-item-caption'>{image.caption}</div>
					)}
				</>
			) : (
				<TextInput
					className='character-subpage-gallery-item-caption'
					seamless={true}
					autoResize={true}
					label='Caption'
					value={image.caption}
					onChange={changeGalleryItemCaption}
				/>
			)}
			{!isEditing ? null : (
				<div className='character-subpage-gallery-item-btns-container'>
					<IconBtn icon={<FaTimes />} iconName='remove' seamless={true} onClick={() => removeGalleryItem(index)} />
				</div>
			)}
		</div>
	);
};
