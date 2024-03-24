// Packages

// Components

// Logic
import { DetailsLogic } from "./DetailsLogic";

// Context

// Services

// Styles
import "./Details.css";

// Assets

export const Details = () => {
	const { playerHeight, content } = DetailsLogic();

	return (
		<div className='unit-page-storyboard-editor-multi-tab-pane-content-details' style={{ "--player_height": playerHeight + "px" }}>
			{content}
		</div>
	);
};
