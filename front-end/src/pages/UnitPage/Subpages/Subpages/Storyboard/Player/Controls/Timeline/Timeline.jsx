// Packages

// Components

// Logic
import { TimelineLogic } from "./TimelineLogic";

// Context

// Services

// Styles
import "./Timeline.css";

// Assets

export const Timeline = () => {
	const { elapsedTime, fullDuration, timelineContainerRef, handleMouseDown, handleTouchStart } = TimelineLogic();

	return (
		<div
			ref={timelineContainerRef}
			className='unit-page-storyboard-player-timeline-container'
			onMouseDown={handleMouseDown}
			onTouchStart={handleTouchStart}
		>
			<div className='unit-page-storyboard-player-timeline'>
				<div
					className='unit-page-storyboard-player-timeline-progress'
					style={{ "--player_percent_watched": (elapsedTime / fullDuration) * 100 + "%" }}
				></div>
			</div>
		</div>
	);
};
