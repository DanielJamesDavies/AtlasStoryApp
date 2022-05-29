// Packages

// Components
import { CharactersGroupCharacterCard } from "./CharactersGroupCharacterCard";
import { DragDropContainer } from "../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../components/DragDropItem/DragDropItem";

// Logic
import { CharactersGroupCharacterCardsLogic } from "./CharactersGroupCharacterCardsLogic";

// Context

// Services

// Styles
import "./CharactersGroupCharacterCards.css";

// Assets

export const CharactersGroupCharacterCards = () => {
	const { groups, openGroup, charactersCards, scrollCharacterCards, isReorderingCharacters, changeCharactersOrder } =
		CharactersGroupCharacterCardsLogic();

	return (
		<div className='characters-group-characters-cards-container'>
			{!groups ? null : (
				<DragDropContainer
					innerRef={charactersCards}
					className='characters-group-characters-cards'
					inlineItems={true}
					enableDragDrop={isReorderingCharacters}
					onDropItem={changeCharactersOrder}
				>
					{groups[openGroup]?.data?.characters.map((character, index) => (
						<DragDropItem key={index} index={index} className='characters-group-character-card-container'>
							<CharactersGroupCharacterCard characterID={character.character_id} />
						</DragDropItem>
					))}
				</DragDropContainer>
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
