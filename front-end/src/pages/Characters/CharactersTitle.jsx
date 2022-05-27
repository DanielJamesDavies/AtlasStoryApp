// Packages

// Components

// Logic
import { CharactersTitleLogic } from "./CharactersTitleLogic";

// Context

// Services

// Styles
import "./CharactersTitle.css";

// Assets

export const CharactersTitle = () => {
	const { story, storyIcon } = CharactersTitleLogic();

	return (
		<div className='characters-title'>
			<div className='characters-title-story-icon'>{!storyIcon ? null : <img src={storyIcon} alt='' />}</div>
			{!story?.data?.title ? null : (
				<>
					<div className='characters-title-story-title'>{story?.data?.title}</div>
					<div className='characters-title-divider'>|</div>
					<div className='characters-title-characters-label'>Characters</div>
				</>
			)}
		</div>
	);
};
