// Packages
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
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
		surfaceMapImageDisplayComponentsContainerRef,
		surfaceMapImageRegionsNamesRef,
		surfaceMapImageRegionsNamesTextsRef,
		surfaceMapDrawingShapeRef,
		surfaceMapImageNewComponentsRef,
		locationMapImage,
		onTouchStart,
		onTouchMove,
		isImagePixelated,
		enterMovementBox,
		leaveMovementBox,
		isPanning,
		isScrolling,
		isSelectingSurfaceMapComponents,
		isDeletingSurfaceMapComponents,
		surfaceMapImageDisplayComponents,
		surfaceMapImageComponentsStyles,
		onMovementBoxWheel,
		regionNamesHTML,
		regionNamesTexts,
		surfaceMapPositioningPlaceRef,
		surfaceMapPlaces,
		isPositioningSurfaceMapPlace,
		mapVersionID,
		decrementMapVersion,
		incrementMapVersion,
		locationsSurfaceMapLoadingCircleContainerRef,
		locationMapComponentsImage,
	} = SurfaceMapLogic();

	return (
		<>
			<div
				ref={surfaceMapContainerRef}
				className={
					"locations-surface-map-container" +
					(isSelectingSurfaceMapComponents ? " locations-surface-map-container-is-selecting-components" : "") +
					(isDeletingSurfaceMapComponents ? " locations-surface-map-container-is-deleting-components" : "") +
					(isPositioningSurfaceMapPlace ? " locations-surface-map-container-is-positioning-place" : "")
				}
				onTouchStart={onTouchStart}
				onTouchMove={onTouchMove}
			>
				<div ref={locationsSurfaceMapLoadingCircleContainerRef} className='locations-surface-map-loading-circle-container'>
					<LoadingCircle center={true} />
					<div className='locations-surface-map-loading-circle-background'></div>
				</div>
				{!locationMapImage ? null : (
					<>
						<div className='locations-surface-map-versions-container'>
							<button onClick={decrementMapVersion}>
								<FaChevronLeft />
							</button>
							<div>
								<div className='locations-surface-map-versions-label'>Version</div>
								<div className='locations-surface-map-versions-value'>
									{
										locations
											?.find((e) => e?._id === currentMapLocationId)
											?.data?.mapVersions?.find((e) => e?._id === mapVersionID)?.title
									}
								</div>
							</div>
							<button onClick={incrementMapVersion}>
								<FaChevronRight />
							</button>
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
									className={"locations-surface-map-image-components-container"}
									dangerouslySetInnerHTML={{
										__html: sanitize(locationMapComponentsImage),
									}}
									style={surfaceMapImageComponentsStyles}
								></div>
								<div
									ref={surfaceMapImageDisplayComponentsContainerRef}
									className={
										"locations-surface-map-image-components-container locations-surface-map-image-display-components-container" +
										(isSelectingSurfaceMapComponents ? " locations-surface-map-image-components-container-is-selecting" : "")
									}
									dangerouslySetInnerHTML={{
										__html: sanitize(surfaceMapImageDisplayComponents),
									}}
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
								<div ref={surfaceMapDrawingShapeRef} className='locations-surface-map-drawing-shape-container'></div>
								<div className='locations-surface-map-image-new-components-container'>
									<svg version='1.1' ref={surfaceMapImageNewComponentsRef}></svg>
								</div>
								<div className='locations-surface-map-places-container'>{surfaceMapPlaces}</div>
								<div ref={surfaceMapPositioningPlaceRef} className='locations-surface-map-positioning-place-container'></div>
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
		</>
	);
};
