// Packages
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Components
import { LoadingCircle } from "../LoadingCircle/LoadingCircle";

// Logic
import { LightboxLogic } from "./LightboxLogic";

// Context

// Services

// Styles
import "./Lightbox.css";

// Assets

export const Lightbox = () => {
	const {
		lightboxImageIDs,
		lightboxImages,
		lightboxIndex,
		incrementLightboxIndex,
		decrementLightboxIndex,
		closeLightbox,
		lightBoxImageContainerRef,
	} = LightboxLogic();

	if (lightboxImages.length === 0 && lightboxImageIDs.length === 0) return null;
	if (lightboxImages.length === 0 && lightboxImageIDs.length !== 0)
		return (
			<div className='lightbox-container' onClick={closeLightbox}>
				<div className='lightbox-loading-circle-container'>
					<LoadingCircle />
				</div>
				<div className='lightbox-background' />
			</div>
		);
	return (
		<div className='lightbox-container' onClick={closeLightbox}>
			<button className='lightbox-switch-btn lightbox-switch-btn-decrement' onClick={incrementLightboxIndex}>
				<FaChevronLeft />
			</button>
			<div ref={lightBoxImageContainerRef} className='lightbox-image-container'>
				<div className='lightbox-image'>
					<img src={lightboxImages[lightboxIndex]?.image} alt='' onClick={(e) => e.stopPropagation()} />
				</div>
			</div>
			{lightboxImages[lightboxIndex]?.caption === undefined ||
			lightboxImages[lightboxIndex]?.caption.split(" ").join("").length === 0 ? null : (
				<div className='lightbox-caption-container'>
					<div className='lightbox-caption'>{lightboxImages[lightboxIndex]?.caption}</div>
				</div>
			)}
			<button className='lightbox-switch-btn lightbox-switch-btn-increment' onClick={decrementLightboxIndex}>
				<FaChevronRight />
			</button>
			<div className='lightbox-background' />
		</div>
	);
};
