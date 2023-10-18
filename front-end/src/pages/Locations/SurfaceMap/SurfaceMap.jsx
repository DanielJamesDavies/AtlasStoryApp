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
	const {
		surfaceMapContainerRef,
		surfaceMapImageContainerRef,
		surfaceMapImageRef,
		locationMapImage,
		onTouchStart,
		onTouchMove,
		isImagePixelated,
		enterMovementBox,
		leaveMovementBox,
		isPanning,
	} = SurfaceMapLogic();

	return (
		<div ref={surfaceMapContainerRef} className='locations-surface-map-container' onTouchStart={onTouchStart} onTouchMove={onTouchMove}>
			{!locationMapImage ? (
				<div className='locations-surface-map-loading-circle-container'>
					<LoadingCircle />
				</div>
			) : (
				<>
					<div ref={surfaceMapImageContainerRef} className='locations-surface-map-image-container'>
						<div
							className={
								isImagePixelated
									? "locations-surface-map-image locations-surface-map-image-is-pixelated"
									: "locations-surface-map-image"
							}
						>
							<img ref={surfaceMapImageRef} src={locationMapImage} alt='' />
						</div>
					</div>
					{isPanning ? null : (
						<div className='locations-surface-map-movement-boxes-container'>
							{[
								[0, -1],
								[0.5, -0.75],
								[0.75, -0.75],
								[0.75, -0.5],
								[1, 0],
								[0.5, 0.75],
								[0.75, 0.75],
								[0.75, 0.5],
								[0, 1],
								[-0.5, 0.75],
								[-0.75, 0.75],
								[-0.75, 0.5],
								[-1, 0],
								[-0.75, -0.5],
								[-0.75, -0.75],
								[-0.5, -0.75],
								[0.35, -0.35],
								[0.35, 0.35],
								[-0.35, 0.35],
								[-0.35, -0.35],
								[0, -0.5],
								[0.5, 0],
								[0, 0.5],
								[-0.5, 0],
							].map((movement, index) => (
								<div
									key={index}
									className='locations-surface-map-movement-box'
									onMouseEnter={() => enterMovementBox(...movement)}
									onMouseLeave={() => leaveMovementBox()}
								></div>
							))}
						</div>
					)}
				</>
			)}
		</div>
	);
};
