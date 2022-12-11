// Packages

// Components
import { Banner } from "./Banner/Banner";
import { Header } from "./Header/Header";
import { Description } from "./Description/Description";
import { Genres } from "./Genres/Genres";
import { PrimaryCharacters } from "./PrimaryCharacters/PrimaryCharacters";
import { Settings } from "./Settings/Settings";

// Logic
import { StoryLogic } from "./StoryLogic";

// Context

// Services

// Styles
import "./Story.css";

// Assets

export const Story = () => {
	const { storyStyles } = StoryLogic();

	return (
		<div className='story' style={storyStyles}>
			<Banner />
			<Header />
			<div className='story-section-1'>
				<Genres />
				<Description />
			</div>
			<div className='story-section-2'>
				<PrimaryCharacters />
			</div>
			<Settings />
		</div>
	);
};
