// Packages
import { FaTimes } from "react-icons/fa";

// Components
import { IconBtn } from "../../../../../components/IconBtn/IconBtn";
import { TextInput } from "../../../../../components/TextInput/TextInput";
import { LoadingCircle } from "../../../../../components/LoadingCircle/LoadingCircle";

// Logic
import { GalleryItemLogic } from "./GalleryItemLogic";

// Context

// Services

// Styles
import "./GalleryItem.css";

// Assets

export const GalleryItem = ({ image, index, isEditing, removeGalleryItem, onClick }) => {
	const { galleryItemImage, changeGalleryItemCaption } = GalleryItemLogic({ image, index });

	return (
		<div className='character-subpage-gallery-item'>
			{!galleryItemImage ? (
				<div className='character-subpage-gallery-item-placeholder'>
					<LoadingCircle center={true} />
				</div>
			) : (
				<img src={galleryItemImage} alt='' className='lightbox-openable-image' onClick={() => onClick(index)} />
			)}
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
