// Packages

// Components
import { CharacterPrimaryName } from "./CharacterPrimaryName";
import { CharacterPrimaryType } from "./CharacterPrimaryType";

// Logic
import { CharacterPrimaryLogic } from "./CharacterPrimaryLogic";

// Context

// Services

// Styles
import "./CharacterPrimary.css";

// Assets

export const CharacterPrimary = () => {
	const { story, storyIcon } = CharacterPrimaryLogic();

	return (
		<div className='character-primary'>
			<div className='character-primary-name-and-story-container'>
				<CharacterPrimaryName />
				<div className='character-primary-story'>
					<div className='character-primary-story-icon'>{!storyIcon ? null : <img src={storyIcon} alt='' />}</div>
					<div className='character-primary-story-name'>{story?.data?.title}</div>
				</div>
			</div>
			<CharacterPrimaryType />
		</div>
	);
};
