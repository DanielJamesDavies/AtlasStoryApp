// Packages

// Components
import { CharacterCard } from "./CharacterCard/CharacterCard";
import { CarouselContainer } from "../../../../components/CarouselContainer/CarouselContainer";
import { DragDropContainer } from "../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../components/DragDropItem/DragDropItem";

// Logic
import { CharacterCardsLogic } from "./CharacterCardsLogic";

// Context

// Services

// Styles
import "./CharacterCards.css";

// Assets

export const CharacterCards = () => {
	const { primaryCharacters, primaryCharactersCardBackgrounds, isReorderingCharacters, changePrimaryCharactersOrder } = CharacterCardsLogic();

	if (!primaryCharacters) return null;
	return (
		<div className='story-primary-characters-cards-container'>
			<CarouselContainer speed={1.1} fallback={true}>
				{!primaryCharactersCardBackgrounds ? (
					<div className='story-primary-characters-cards'>
						{primaryCharacters.map((character, index) => (
							<div key={index} className='story-primary-character-card-container'>
								<CharacterCard />
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
								<CharacterCard character={character} />
							</DragDropItem>
						))}
					</DragDropContainer>
				)}
			</CarouselContainer>
		</div>
	);
};
