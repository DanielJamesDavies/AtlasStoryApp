// Packages
import { FaSort } from "react-icons/fa";

// Components
import { StoryPrimaryCharacterCards } from "./StoryPrimaryCharacterCards";

// Logic
import { StoryPrimaryCharactersLogic } from "./StoryPrimaryCharactersLogic";

// Context

// Services

// Styles
import "./StoryPrimaryCharacters.css";

// Assets

export const StoryPrimaryCharacters = () => {
	const { isAuthorizedToModify, primaryCharacters, toggleIsReorderingCharacters } = StoryPrimaryCharactersLogic();

	if (!primaryCharacters) return null;
	return (
		<div className='story-primary-characters'>
			<div className='story-primary-characters-primary'>
				<div className='story-primary-characters-primary-title'>Primary Characters</div>
				{!isAuthorizedToModify ? null : (
					<>
						<button
							className='story-primary-characters-primary-modify-btn story-primary-characters-primary-btn-reorder-characters'
							onClick={toggleIsReorderingCharacters}
						>
							<FaSort />
						</button>
					</>
				)}
			</div>
			<StoryPrimaryCharacterCards />
		</div>
	);
};
