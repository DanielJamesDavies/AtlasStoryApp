// Packages
import { FaSort } from "react-icons/fa";

// Components
import { ContentItem } from "../../../components/ContentItem/ContentItem";
import { IconBtn } from "../../../components/IconBtn/IconBtn";
import { StoryPrimaryCharacterCards } from "./StoryPrimaryCharacterCards/StoryPrimaryCharacterCards";

// Logic
import { StoryPrimaryCharactersLogic } from "./StoryPrimaryCharactersLogic";

// Context

// Services

// Styles
import "./StoryPrimaryCharacters.css";

// Assets

export const StoryPrimaryCharacters = () => {
	const { isAuthorizedToEdit, primaryCharacters, toggleIsReorderingCharacters } = StoryPrimaryCharactersLogic();

	if (!primaryCharacters) return null;
	return (
		<ContentItem size='s' hasBg={true}>
			<div className='story-primary-characters'>
				<div className='story-primary-characters-primary'>
					<div className='story-primary-characters-primary-title'>Primary Characters</div>
					{!isAuthorizedToEdit ? null : (
						<div className='story-primary-characters-primary-modify-btn-container'>
							<IconBtn
								className='story-primary-characters-primary-modify-btn'
								seamless={true}
								icon={<FaSort />}
								iconName='sort'
								onClick={toggleIsReorderingCharacters}
								label='Reorder Primary Characters'
							/>
						</div>
					)}
				</div>
				<StoryPrimaryCharacterCards />
			</div>
		</ContentItem>
	);
};
