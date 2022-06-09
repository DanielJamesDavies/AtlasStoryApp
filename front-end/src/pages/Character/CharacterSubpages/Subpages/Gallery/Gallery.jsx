// Packages

// Components
import { GalleryItem } from "./GalleryItem";

// Logic
import { GalleryLogic } from "./GalleryLogic";

// Context

// Services

// Styles
import "./Gallery.css";

// Assets

export const Gallery = () => {
	const { characterVersion } = GalleryLogic();

	return (
		<div className='character-subpage-gallery'>
			<div className='character-subpage-gallery-items-container'>
				{!characterVersion ? null : characterVersion.gallery.map((image, index) => <GalleryItem key={index} image={image} />)}
			</div>
		</div>
	);
};
