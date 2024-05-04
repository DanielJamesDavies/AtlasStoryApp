// Packages

// Components
import { Hero } from "./Hero/Hero";
import { StoryIcons } from "./StoryIcons/StoryIcons";
import { Description } from "./Description/Description";

// Logic

// Context

// Services

// Styles
import "./Landing.css";

// Assets

export const Landing = () => {
	return (
		<div className='landing'>
			<Hero />
			<StoryIcons />
			<Description />
		</div>
	);
};
