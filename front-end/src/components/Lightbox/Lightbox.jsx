// Packages
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";

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
		decrementLightboxIndex,
		incrementLightboxIndex,
		closeLightbox,
		lightBoxImageContainerRef,
		lightboxContainerRef,
		onTouchStart,
		onTouchMove,
		isImagePixelated,
		lightboxImageSizes,
	} = LightboxLogic();

	return (
		<div
			ref={lightboxContainerRef}
			className={
				lightboxImages.length === 0 && lightboxImageIDs.length === 0 ? "lightbox-container lightbox-container-hidden" : "lightbox-container"
			}
			onClick={closeLightbox}
			onTouchStart={onTouchStart}
			onTouchMove={onTouchMove}
		>
			{lightboxImages.length === 0 && lightboxImageIDs.length !== 0 ? (
				<div className='lightbox-loading-circle-container'>
					<LoadingCircle />
				</div>
			) : (
				<>
					<button
						className={
							lightboxIndex === 0
								? "lightbox-switch-btn lightbox-switch-btn-decrement lightbox-switch-btn-inactive"
								: "lightbox-switch-btn lightbox-switch-btn-decrement"
						}
						onClick={decrementLightboxIndex}
					>
						<FaArrowLeft />
					</button>
					<div ref={lightBoxImageContainerRef} className='lightbox-image-container'>
						<div className={isImagePixelated ? "lightbox-image lightbox-image-is-pixelated" : "lightbox-image"}>
							<img src={lightboxImages[lightboxIndex]?.image} alt='' onClick={(e) => e.stopPropagation()} />
						</div>
					</div>
					<div className='lightbox-text-container'>
						{lightboxImages[lightboxIndex]?.caption === undefined ||
						lightboxImages[lightboxIndex]?.caption.split(" ").join("").length === 0 ? null : (
							<div className='lightbox-caption-container'>
								<div className='lightbox-caption'>{lightboxImages[lightboxIndex]?.caption}</div>
							</div>
						)}
						<div className='lightbox-text-image-file-size'>
							{lightboxImages[lightboxIndex]?.image?.split("ata:image/").length >= 2
								? Math.floor(
										(lightboxImages[lightboxIndex]?.image.length * (3 / 4) -
											(lightboxImages[lightboxIndex]?.image.slice(-2) === "==" ? 2 : 1)) /
											1000
								  ) + "KB"
								: isNaN(Math.floor(lightboxImageSizes[lightboxIndex]?.size / 1000))
								? ""
								: Math.floor(lightboxImageSizes[lightboxIndex]?.size / 1000) + "KB"}
						</div>
					</div>
					<button
						className={
							lightboxIndex === lightboxImages.length - 1
								? "lightbox-switch-btn lightbox-switch-btn-increment lightbox-switch-btn-inactive"
								: "lightbox-switch-btn lightbox-switch-btn-increment"
						}
						onClick={incrementLightboxIndex}
					>
						<FaArrowRight />
					</button>
					<button className='lightbox-close-btn' onClick={closeLightbox}>
						<FaTimes />
					</button>
				</>
			)}
			<div className='lightbox-background' />
		</div>
	);
};
