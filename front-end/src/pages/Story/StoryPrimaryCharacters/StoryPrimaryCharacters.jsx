// Packages
import { FaSort } from "react-icons/fa";

// Components
import { StoryPrimaryCharacterCard } from "./StoryPrimaryCharacterCard";
import { DragDropContainer } from "../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../components/DragDropItem/DragDropItem";

// Logic
import { StoryPrimaryCharactersLogic } from "./StoryPrimaryCharactersLogic";

// Context

// Services

// Styles
import "./StoryPrimaryCharacters.css";

// Assets

export const StoryPrimaryCharacters = () => {
	const { isAuthorizedToModify, primaryCharacters, isReorderingCharacters, toggleIsReorderingCharacters, changePrimaryCharactersOrder } =
		StoryPrimaryCharactersLogic();

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
			<DragDropContainer
				className='story-primary-character-cards-container'
				inlineItems={true}
				enableDragDrop={isReorderingCharacters}
				onDropItem={changePrimaryCharactersOrder}
			>
				{primaryCharacters.map((character, index) => (
					<DragDropItem key={index} index={index} className='story-primary-character-card-container'>
						<StoryPrimaryCharacterCard character={character} />
					</DragDropItem>
				))}
			</DragDropContainer>
		</div>
	);
};
