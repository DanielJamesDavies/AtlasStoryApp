// Packages

// Components
import { Content } from "./Content/Content";
import { Controls } from "./Controls/Controls";

// Logic
import { PlayerLogic } from "./PlayerLogic";

// Context

// Services

// Styles
import "./Player.css";

// Assets

export const Player = ({ isEditorPlayer }) => {
	const {
		unitPageStoryboardPlayerContainerRef,
		playerScale,
		isPlayerFullScreen,
		togglePlayerFullScreen,
		hideControls,
		isPlaying,
		areBlackBarsOnSide,
	} = PlayerLogic();

	return (
		<div
			ref={unitPageStoryboardPlayerContainerRef}
			className={
				"unit-page-storyboard-player-container" +
				(isPlayerFullScreen ? " unit-page-storyboard-player-container-is-fullscreen" : "") +
				(hideControls ? " unit-page-storyboard-player-container-hide-controls" : "") +
				(isPlaying ? " unit-page-storyboard-player-container-is-playing" : "") +
				(areBlackBarsOnSide ? " unit-page-storyboard-player-container-are-black-bars-on-side" : "") +
				(isEditorPlayer ? " unit-page-storyboard-player-container-is-editor-player" : "")
			}
			style={{ "--player_scale": playerScale, "--player_width": playerScale * 1920 + "px", "--player_height": playerScale * 1080 + "px" }}
		>
			<div className='unit-page-storyboard-player-wrapper'>
				<div className='unit-page-storyboard-player'>
					<Content />
					<Controls isPlayerFullScreen={isPlayerFullScreen} togglePlayerFullScreen={togglePlayerFullScreen} />
				</div>
			</div>
		</div>
	);
};
