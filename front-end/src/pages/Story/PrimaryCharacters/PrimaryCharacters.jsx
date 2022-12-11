// Packages
import { FaSort } from "react-icons/fa";

// Components
import { ContentItem } from "../../../components/ContentItem/ContentItem";
import { IconBtn } from "../../../components/IconBtn/IconBtn";
import { CharacterCards } from "./CharacterCards/CharacterCards";

// Logic
import { PrimaryCharactersLogic } from "./PrimaryCharactersLogic";

// Context

// Services

// Styles
import "./PrimaryCharacters.css";

// Assets

export const PrimaryCharacters = () => {
	const { isAuthorizedToEdit, primaryCharacters, toggleIsReorderingCharacters } = PrimaryCharactersLogic();

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
				<CharacterCards />
			</div>
		</ContentItem>
	);
};
