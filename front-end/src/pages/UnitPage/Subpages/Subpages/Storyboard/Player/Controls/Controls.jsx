// Packages
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompress, faExpand, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

// Components
import { Timeline } from "./Timeline/Timeline";
import { VolumeControl } from "./VolumeControl/VolumeControl";

// Logic
import { ControlsLogic } from "./ControlsLogic";

// Context

// Services

// Styles
import "./Controls.css";

// Assets

export const Controls = ({ isPlayerFullScreen, togglePlayerFullScreen }) => {
	const { controlsContainerRef, onMouseDown, isPlaying, toggleIsPlaying, elapsedTime, fullDuration, secondsToFormattedTime, onKeyDown } =
		ControlsLogic();

	return (
		<div
			ref={controlsContainerRef}
			className={
				"unit-page-storyboard-player-controls-container" + (isPlaying ? " unit-page-storyboard-player-controls-container-is-playing" : "")
			}
			tabIndex={0}
			onMouseDown={onMouseDown}
			onKeyDown={onKeyDown}
		>
			<div className='unit-page-storyboard-player-control-view' onClick={toggleIsPlaying} onMouseDown={(e) => e?.preventDefault()}></div>
			<div className='unit-page-storyboard-player-controls' onMouseDown={(e) => e?.preventDefault()}>
				<Timeline />
				<div className='unit-page-storyboard-player-controls-row'>
					<button
						className={
							"unit-page-storyboard-player-controls-btn unit-page-storyboard-player-controls-btn-state" +
							(isPlaying
								? " unit-page-storyboard-player-controls-btn-state-is-playing"
								: " unit-page-storyboard-player-controls-btn-state-is-paused")
						}
						onClick={toggleIsPlaying}
					>
						<div className='unit-page-storyboard-player-controls-btn-icon-container'>
							{isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
						</div>
					</button>
					<VolumeControl />
					<div className='unit-page-storyboard-player-controls-duration-text'>
						{secondsToFormattedTime(elapsedTime) + " / " + secondsToFormattedTime(fullDuration)}
					</div>
					<button
						className='unit-page-storyboard-player-controls-btn unit-page-storyboard-player-controls-btn-full-screen'
						onClick={togglePlayerFullScreen}
					>
						<FontAwesomeIcon icon={isPlayerFullScreen ? faCompress : faExpand} />
					</button>
				</div>
			</div>
		</div>
	);
};
