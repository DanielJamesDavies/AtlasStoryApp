// Packages

// Components

// Logic
import { GalleryItemLogic } from "./GalleryItemLogic";

// Context

// Services

// Styles
import "./GalleryItem.css";

// Assets

export const GalleryItem = ({ image }) => {
	const { galleryItemImage } = GalleryItemLogic({ image });

	return <div className='character-subpage-gallery-item'>{!galleryItemImage ? null : <img src={galleryItemImage} alt='' />}</div>;
};
