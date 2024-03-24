// Packages
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";

// Components

// Logic
import { VolumeControlLogic } from "./VolumeControlLogic";

// Context

// Services

// Styles
import "./VolumeControl.css";

// Assets

export const VolumeControl = () => {
	const { isMuted, toggleIsMuted, volume, volumeControlSliderContainerRef, handleMouseDown, handleTouchStart } = VolumeControlLogic();

	return (
		<div className='unit-page-storyboard-player-volume-control-container'>
			<button className='unit-page-storyboard-player-volume-control-button' onClick={toggleIsMuted}>
				<FontAwesomeIcon icon={isMuted ? faVolumeXmark : faVolumeHigh} />
			</button>
			<div
				ref={volumeControlSliderContainerRef}
				className='unit-page-storyboard-player-volume-control-slider-container'
				onMouseDown={handleMouseDown}
				onTouchStart={handleTouchStart}
			>
				<div className='unit-page-storyboard-player-volume-control-slider'>
					<div
						className='unit-page-storyboard-player-volume-control-slider-progress'
						style={{ "--player_percent_volume": volume * 100 + "%" }}
					></div>
				</div>
			</div>
		</div>
	);
};
