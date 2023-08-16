// Packages

// Components
import { CharactersGroupCharacterCard } from "./CharactersGroupCharacterCard/CharactersGroupCharacterCard";
import { DragDropContainer } from "../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../components/DragDropItem/DragDropItem";
import { CarouselContainer } from "../../../../components/CarouselContainer/CarouselContainer";

// Logic
import { CharactersGroupCharacterCardsLogic } from "./CharactersGroupCharacterCardsLogic";

// Context

// Services

// Styles
import "./CharactersGroupCharacterCards.css";

// Assets

export const CharactersGroupCharacterCards = () => {
	const { group, isReorderingCharacters, changeCharactersOrder } = CharactersGroupCharacterCardsLogic();

	return (
		<div className='characters-group-characters-cards-container'>
			{!group?.data?.characters ? (
				<div className='characters-group-characters-cards'>
					<div className='characters-group-character-card-container'>
						<CharactersGroupCharacterCard />
					</div>
					<div className='characters-group-character-card-container'>
						<CharactersGroupCharacterCard />
					</div>
					<div className='characters-group-character-card-container'>
						<CharactersGroupCharacterCard />
					</div>
				</div>
			) : (
				<CarouselContainer speed={1.25} fallback={true} scrollStartOnDataChange={group?._id} disableOnMobile={true}>
					<DragDropContainer
						className='characters-group-characters-cards'
						inlineItems={true}
						enableDragDrop={isReorderingCharacters}
						onDropItem={changeCharactersOrder}
					>
						{group?.data?.characters.map((character, index) => (
							<DragDropItem
								key={index}
								index={index}
								dragDropListId='characters-group-characters-cards'
								className='characters-group-character-card-container'
							>
								<CharactersGroupCharacterCard characterID={character.character_id} />
							</DragDropItem>
						))}
					</DragDropContainer>
				</CarouselContainer>
			)}
		</div>
	);
};
