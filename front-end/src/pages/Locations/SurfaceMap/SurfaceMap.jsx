// Packages
import { sanitize } from "dompurify";

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
		locations,
		currentMapLocationId,
		surfaceMapContainerRef,
		surfaceMapImageContainerRef,
		surfaceMapImageRef,
		surfaceMapImageComponentsContainerRef,
		surfaceMapImageRegionsNamesRef,
		surfaceMapImageRegionsNamesTextsRef,
		locationMapImage,
		onTouchStart,
		onTouchMove,
		isImagePixelated,
		enterMovementBox,
		leaveMovementBox,
		isPanning,
		isScrolling,
		isSelectingSurfaceMapComponents,
		surfaceMapImageComponentsStyles,
		onMovementBoxWheel,
		selectedLocationId,
		setSelectedLocationId,
		setIsDisplayingHierarchy,
		regionNamesHTML,
		regionNamesTexts,
	} = SurfaceMapLogic();

	return (
		<div
			ref={surfaceMapContainerRef}
			className='locations-surface-map-container'
			onTouchStart={onTouchStart}
			onTouchMove={onTouchMove}
			// onClick={() => {
			// 	if (isSelectingSurfaceMapComponents) return false;
			// 	if (selectedLocationId) {
			// 		setSelectedLocationId(false);
			// 	} else {
			// 		setIsDisplayingHierarchy(false);
			// 	}
			// }}
		>
			{!locationMapImage ? (
				<div className='locations-surface-map-loading-circle-container'>
					<LoadingCircle center={true} />
					<div className='locations-surface-map-loading-circle-background'></div>
				</div>
			) : (
				<>
					<div className='locations-surface-map-loading-circle-container locations-surface-map-loading-circle-container-loaded'>
						<LoadingCircle center={true} />
						<div className='locations-surface-map-loading-circle-background'></div>
					</div>
					<div ref={surfaceMapImageContainerRef} className='locations-surface-map-image-container'>
						<div
							className={
								isImagePixelated
									? "locations-surface-map-image locations-surface-map-image-is-pixelated"
									: "locations-surface-map-image"
							}
						>
							<img ref={surfaceMapImageRef} src={locationMapImage} alt='' />
							<div
								ref={surfaceMapImageComponentsContainerRef}
								className={
									"locations-surface-map-image-components-container" +
									(isSelectingSurfaceMapComponents ? " locations-surface-map-image-components-container-is-selecting" : "")
								}
								dangerouslySetInnerHTML={{
									__html: sanitize(locations?.find((e) => e._id === currentMapLocationId)?.data?.mapImageComponents),
								}}
								style={surfaceMapImageComponentsStyles}
							></div>
							<div className='locations-surface-map-image-region-names-container'>
								<div
									ref={surfaceMapImageRegionsNamesRef}
									className='locations-surface-map-image-region-names'
									dangerouslySetInnerHTML={{
										__html: sanitize(regionNamesHTML),
									}}
								></div>
								<div
									ref={surfaceMapImageRegionsNamesTextsRef}
									className='locations-surface-map-image-region-names-text'
									dangerouslySetInnerHTML={{
										__html: sanitize(regionNamesTexts),
									}}
								></div>
							</div>
						</div>
					</div>
					{isPanning || isScrolling ? null : (
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
									onWheel={onMovementBoxWheel}
								></div>
							))}
						</div>
					)}
				</>
			)}
		</div>
	);
};
