// Packages

// Components

// Logic
import { StoryGenresLogic } from "./StoryGenresLogic";

// Context

// Services

// Styles
import "./StoryGenres.css";

// Assets

export const StoryGenres = () => {
	const { story } = StoryGenresLogic();

	if (story?.genres)
		return (
			<div className='story-genres'>
				<div className='story-genres-label'>Genres</div>
				<p className='story-genres-value'>{story.genres}</p>
			</div>
		);
};
