// Packages

// Components
import { StoryPrimaryCharacterCard } from "./StoryPrimaryCharacterCard";

// Logic
import { StoryPrimaryCharactersLogic } from "./StoryPrimaryCharactersLogic";

// Context

// Services

// Styles
import "./StoryPrimaryCharacters.css";

// Assets

export const StoryPrimaryCharacters = () => {
	const { primaryCharacters } = StoryPrimaryCharactersLogic();

	if (!primaryCharacters) return null;
	return (
		<div className='story-primary-characters'>
			<div className='story-primary-characters-title'>Primary Characters</div>
			<div className='story-primary-character-cards-container'>
				{primaryCharacters.map((character, index) => (
					<StoryPrimaryCharacterCard key={index} character={character} />
				))}
			</div>
		</div>
	);
};
