// Packages

// Components
import { CharactersGroupCharacterCard } from "./CharactersGroupCharacterCard";

// Logic
import { CharactersGroupCharacterCardsLogic } from "./CharactersGroupCharacterCardsLogic";

// Context

// Services

// Styles
import "./CharactersGroupCharacterCards.css";

// Assets

export const CharactersGroupCharacterCards = () => {
	const { groups, openGroup, charactersCards, scrollCharacterCards } = CharactersGroupCharacterCardsLogic();

	return (
		<div className='characters-group-characters-cards-container'>
			{!groups ? null : (
				<div ref={charactersCards} className='characters-group-characters-cards'>
					{groups[openGroup]?.data?.characters.map((character, index) => (
						<CharactersGroupCharacterCard key={index} characterID={character.character_id} />
					))}
				</div>
			)}
			<div
				className={
					charactersCards?.current?.scrollLeft === 0
						? "characters-group-characters-cards-scroll-left characters-group-characters-cards-scroll-hidden"
						: "characters-group-characters-cards-scroll-left"
				}
				onMouseEnter={() => scrollCharacterCards(-1)}
				onMouseLeave={() => scrollCharacterCards(0)}
				onDragEnter={() => scrollCharacterCards(-1)}
				onDragLeave={() => scrollCharacterCards(0)}
			></div>
			<div
				className='characters-group-characters-cards-scroll-right'
				onMouseEnter={() => scrollCharacterCards(1)}
				onMouseLeave={() => scrollCharacterCards(0)}
				onDragEnter={() => scrollCharacterCards(1)}
				onDragLeave={() => scrollCharacterCards(0)}
			></div>
		</div>
	);
};
