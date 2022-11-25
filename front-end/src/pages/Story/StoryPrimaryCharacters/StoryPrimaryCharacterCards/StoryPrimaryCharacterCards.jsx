// Packages

// Components
import { StoryPrimaryCharacterCard } from "./StoryPrimaryCharacterCard/StoryPrimaryCharacterCard";
import { CarouselContainer } from "../../../../components/CarouselContainer/CarouselContainer";
import { DragDropContainer } from "../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../components/DragDropItem/DragDropItem";

// Logic
import { StoryPrimaryCharacterCardsLogic } from "./StoryPrimaryCharacterCardsLogic";

// Context

// Services

// Styles
import "./StoryPrimaryCharacterCards.css";

// Assets

export const StoryPrimaryCharacterCards = () => {
	const { primaryCharacters, primaryCharactersCardBackgrounds, isReorderingCharacters, changePrimaryCharactersOrder } =
		StoryPrimaryCharacterCardsLogic();

	if (!primaryCharacters) return null;
	return (
		<div className='story-primary-characters-cards-container'>
			<CarouselContainer speed={1.1} fallback={true}>
				{!primaryCharactersCardBackgrounds ? (
					<div className='story-primary-characters-cards'>
						{primaryCharacters.map((character, index) => (
							<div key={index} className='story-primary-character-card-container'>
								<StoryPrimaryCharacterCard />
							</div>
						))}
					</div>
				) : (
					<DragDropContainer
						className='story-primary-characters-cards'
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
				)}
			</CarouselContainer>
		</div>
	);
};
