// Packages

// Components
import { StoryPrimaryCharacterCard } from "./StoryPrimaryCharacterCard";
import { DragDropContainer } from "../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../components/DragDropItem/DragDropItem";

// Logic
import { StoryPrimaryCharacterCardsLogic } from "./StoryPrimaryCharacterCardsLogic";

// Context

// Services

// Styles
import "./StoryPrimaryCharacterCards.css";

// Assets

export const StoryPrimaryCharacterCards = () => {
	const {
		primaryCharacters,
		isReorderingCharacters,
		charactersCards,
		scrollCharacterCards,
		changePrimaryCharactersOrder,
		afterOnTouchMove,
		afterOnTouchEnd,
	} = StoryPrimaryCharacterCardsLogic();

	if (!primaryCharacters) return null;
	return (
		<div
			className='story-primary-characters-cards-container'
			onMouseEnter={() => scrollCharacterCards(0)}
			onMouseLeave={() => scrollCharacterCards(-0.75)}
		>
			<DragDropContainer
				innerRef={charactersCards}
				className='story-primary-characters-cards'
				inlineItems={true}
				enableDragDrop={isReorderingCharacters}
				onDropItem={changePrimaryCharactersOrder}
				afterOnTouchMove={afterOnTouchMove}
				afterOnTouchEnd={afterOnTouchEnd}
			>
				{primaryCharacters.map((character, index) => (
					<DragDropItem key={index} index={index} className='story-primary-character-card-container'>
						<StoryPrimaryCharacterCard character={character} />
					</DragDropItem>
				))}
			</DragDropContainer>
			<div
				className={
					charactersCards?.current?.scrollLeft === 0
						? "story-primary-characters-cards-scroll-left story-primary-characters-cards-scroll-hidden"
						: "story-primary-characters-cards-scroll-left"
				}
				onMouseEnter={() => scrollCharacterCards(-1)}
				onMouseLeave={() => scrollCharacterCards(0)}
				onDragEnter={() => scrollCharacterCards(-1)}
				onDragLeave={() => scrollCharacterCards(0)}
			></div>
			<div
				className='story-primary-characters-cards-scroll-right'
				onMouseEnter={() => scrollCharacterCards(1)}
				onMouseLeave={() => scrollCharacterCards(0)}
				onDragEnter={() => scrollCharacterCards(1)}
				onDragLeave={() => scrollCharacterCards(0)}
			></div>
		</div>
	);
};
