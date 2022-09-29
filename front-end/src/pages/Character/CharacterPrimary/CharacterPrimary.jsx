// Packages

// Components
import { CharacterPrimaryName } from "./CharacterPrimaryName/CharacterPrimaryName";
import { CharacterPrimaryType } from "./CharacterPrimaryType/CharacterPrimaryType";
import { CharacterPrimaryVersion } from "./CharacterPrimaryVersion/CharacterPrimaryVersion";

// Logic
import { CharacterPrimaryLogic } from "./CharacterPrimaryLogic";

// Context

// Services

// Styles
import "./CharacterPrimary.css";

// Assets

export const CharacterPrimary = ({ characterPrimaryRef }) => {
	const { story, storyIcon, primaryStoryNameStyles } = CharacterPrimaryLogic({ characterPrimaryRef });

	return (
		<div ref={characterPrimaryRef} className='character-primary'>
			<div className='character-primary-story'>
				<div className='character-primary-story-icon'>{!storyIcon ? null : <img src={storyIcon} alt='' />}</div>
				<div className='character-primary-story-name' style={primaryStoryNameStyles}>
					{story?.data?.title}
				</div>
			</div>
			<CharacterPrimaryName />
			<CharacterPrimaryType />
			<CharacterPrimaryVersion />
		</div>
	);
};
