// Packages

// Components
import { LoadingCircle } from "../../../components/LoadingCircle/LoadingCircle";

// Logic
import { SurfaceMapLogic } from "./SurfaceMapLogic";

// Context

// Services

// Styles
import "./SurfaceMap.css";

// Assets

export const SurfaceMap = () => {
	const { surfaceMapContainerRef, surfaceMapImageContainerRef, surfaceMapImageRef, locationMapImage, onTouchStart, onTouchMove, isImagePixelated } =
		SurfaceMapLogic();

	return (
		<div ref={surfaceMapContainerRef} className='locations-surface-map-container' onTouchStart={onTouchStart} onTouchMove={onTouchMove}>
			{!locationMapImage ? (
				<div className='locations-surface-map-loading-circle-container'>
					<LoadingCircle />
				</div>
			) : (
				<div ref={surfaceMapImageContainerRef} className='locations-surface-map-image-container'>
					<div
					 ref={surfaceMapImageRef}
						className={
							isImagePixelated
								? "locations-surface-map-image locations-surface-map-image-is-pixelated"
								: "locations-surface-map-image"
						}
					>
						<img src={locationMapImage} alt='' />
					</div>
				</div>
			)}
		</div>
	);
};
