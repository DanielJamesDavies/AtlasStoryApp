// Packages
import { FaTimes } from "react-icons/fa";

// Components
import { IconBtn } from "../../../../../../../../components/IconBtn/IconBtn";
import { TextInput } from "../../../../../../../../components/TextInput/TextInput";
import { LoadingCircle } from "../../../../../../../../components/LoadingCircle/LoadingCircle";

// Logic
import { GalleryItemLogic } from "./GalleryItemLogic";

// Context

// Services

// Styles
import "./GalleryItem.css";

// Assets

export const GalleryItem = ({ item, index, isEditing, removeGalleryItem, onClick }) => {
	const { image, changeGalleryItemCaption } = GalleryItemLogic({ item, index });

	return (
		<div className='locations-location-gallery-item'>
			{!image ? (
				<div className='locations-location-gallery-item-placeholder'>
					<LoadingCircle center={true} />
				</div>
			) : (
				<img src={image} alt='' className='lightbox-openable-image' onClick={() => onClick(index)} />
			)}
			{!isEditing ? (
				<>
					{item?.caption.split(" ").join("").length === 0 ? null : (
						<div className='locations-location-gallery-item-caption'>{item?.caption}</div>
					)}
				</>
			) : (
				<TextInput
					className='locations-location-gallery-item-caption'
					seamless={true}
					autoResize={true}
					label='Caption'
					value={item?.caption}
					onChange={changeGalleryItemCaption}
				/>
			)}
			{!isEditing ? null : (
				<div className='locations-location-gallery-item-btns-container'>
					<IconBtn icon={<FaTimes />} iconName='remove' seamless={true} onClick={() => removeGalleryItem(index)} />
				</div>
			)}
		</div>
	);
};
