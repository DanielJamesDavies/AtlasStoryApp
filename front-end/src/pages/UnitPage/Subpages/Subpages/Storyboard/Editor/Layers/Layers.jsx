// Packages

// Components
import { Piece } from "./Piece/Piece";

// Logic
import { LayersLogic } from "./LayersLogic";

// Context

// Services

// Styles
import "./Layers.css";

// Assets

export const Layers = () => {
	const {
		layers,
		pieces,
		elapsedTime,
		fullDuration,
		layersContainerRef,
		timeSliderRef,
		handleMouseDown,
		handleTouchStart,
		secondsToFormattedTime,
		onLayerDragOver,
		onLayerMouseOver,
		onLayerMouseUp,
	} = LayersLogic();

	return (
		<div ref={layersContainerRef} className='unit-page-storyboard-editor-layers-container'>
			<div className='unit-page-storyboard-editor-layers'>
				<div
					ref={timeSliderRef}
					className='unit-page-storyboard-editor-layers-time-slider'
					onMouseDown={handleMouseDown}
					onTouchStart={handleTouchStart}
				></div>
				<div
					className='unit-page-storyboard-editor-layers-playhead'
					style={{ "--position_left": (elapsedTime / fullDuration) * fullDuration * 32 + "px" }}
					onMouseDown={(e) => e?.preventDefault()}
					onTouchStart={(e) => e?.preventDefault()}
				>
					<div
						className='unit-page-storyboard-editor-layers-playhead-top'
						onMouseDown={(e) => e?.preventDefault()}
						onTouchStart={(e) => e?.preventDefault()}
					></div>
					<div
						className='unit-page-storyboard-editor-layers-playhead-line'
						onMouseDown={(e) => e?.preventDefault()}
						onTouchStart={(e) => e?.preventDefault()}
					></div>
				</div>
				<div
					className='unit-page-storyboard-editor-layers-timeruler'
					onMouseDown={(e) => e?.preventDefault()}
					onTouchStart={(e) => e?.preventDefault()}
				>
					{Array(fullDuration + 5)
						.fill(0)
						?.map((_, index) => (
							<div
								key={index}
								className={
									"unit-page-storyboard-editor-layers-timeruler-item" +
									(index % 5 === 0 ? " unit-page-storyboard-editor-layers-timeruler-item-text-visible" : "")
								}
								onMouseDown={(e) => e?.preventDefault()}
								onTouchStart={(e) => e?.preventDefault()}
							>
								<span onMouseDown={(e) => e?.preventDefault()} onTouchStart={(e) => e?.preventDefault()}>
									{index % 5 === 0 ? secondsToFormattedTime(index) : ""}
								</span>
							</div>
						))}
				</div>
				<div className='unit-page-storyboard-editor-layers-list'>
					<div
						className='unit-page-storyboard-editor-layer unit-page-storyboard-editor-layer-new'
						onMouseOver={() => onLayerMouseOver(-1)}
						onMouseUp={onLayerMouseUp}
					></div>
					{layers?.map((layer, index) => (
						<div
							key={index}
							className='unit-page-storyboard-editor-layer'
							onDragOver={() => onLayerDragOver(index)}
							onMouseOver={() => onLayerMouseOver(index)}
							onMouseUp={onLayerMouseUp}
						>
							<div className='unit-page-storyboard-editor-layer-pieces'>
								{layer?.pieces?.map((piece_id, index) => (
									<Piece key={index} piece={pieces?.find((e) => e.id === piece_id)} />
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
