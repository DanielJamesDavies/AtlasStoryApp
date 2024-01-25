// Packages

// Components
import { FollowingStories } from "./FollowingStories/FollowingStories";
import { RecommendedStories } from "./RecommendedStories/RecommendedStories";

// Logic

// Context

// Services

// Styles
import "./Stories.css";

// Assets

export const Stories = ({ isAuthorized }) => {
	return (
		<div className='home-stories-container'>
			<FollowingStories />
			<RecommendedStories isAuthorized={isAuthorized} />
		</div>
	);
};
