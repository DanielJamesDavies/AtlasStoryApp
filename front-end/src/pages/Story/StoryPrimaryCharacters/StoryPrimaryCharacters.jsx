// Packages
import { FaSort } from "react-icons/fa";

// Components
import { IconBtn } from "../../../components/IconBtn/IconBtn";
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
					<div className='story-primary-characters-primary-modify-btn-container'>
						<IconBtn className='story-primary-characters-primary-modify-btn' icon={<FaSort />} onClick={toggleIsReorderingCharacters} />
					</div>
				)}
			</div>
			<StoryPrimaryCharacterCards />
		</div>
	);
};
