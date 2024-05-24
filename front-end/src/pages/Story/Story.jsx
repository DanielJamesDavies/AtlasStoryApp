// Packages

// Components
import { Banner } from "./Banner/Banner";
import { Header } from "./Header/Header";
import { NavigationBar } from "./NavigationBar/NavigationBar";
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
	const { isAuthorizedToEdit, story, storyStyles } = StoryLogic();

	return (
		<div className={!story ? "story story-loading" : "story"} style={storyStyles}>
			<Banner />
			<Header />
			<NavigationBar />
			<div className='story-content'>
				{!isAuthorizedToEdit &&
				(!story?.data?.genres || story?.data?.genres.length === 0) &&
				(!story?.data?.description || story?.data?.description.join("").split(" ").join("").split("").length === 0) ? null : (
					<div className='story-section-1'>
						<Genres />
						<Description />
					</div>
				)}
				<div
					className={
						"story-section-2" +
						(!isAuthorizedToEdit && story?.data?.description?.join("")?.trim()?.length === 0 && story?.data?.genres?.length === 0
							? " story-section-2-full-width"
							: "")
					}
				>
					<PrimaryCharacters />
				</div>
				<Settings />
			</div>
		</div>
	);
};
