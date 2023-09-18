// Packages

// Components

// Logic
import { CharactersGroupCharacterCardLogic } from "./CharactersGroupCharacterCardLogic";

// Context

// Services

// Styles
import "./CharactersGroupCharacterCard.css";

// Assets

export const CharactersGroupCharacterCard = ({ characterID }) => {
	const { character, characterType, navigateToCharacter, onCharacterCardMouseDown, cardStyles } = CharactersGroupCharacterCardLogic({
		characterID,
	});

	if (!character) return <div className='characters-group-character-card-placeholder' />;
	return (
		<div className='characters-group-character-card-wrapper drag-drop-item-content' style={cardStyles}>
			<div
				className='characters-group-character-card'
				onClick={navigateToCharacter}
				onAuxClick={navigateToCharacter}
				onMouseDown={onCharacterCardMouseDown}
			>
				<div className='characters-group-character-card-content'>
					<div className='characters-group-character-card-top-container'>
						<div className='characters-group-character-card-top-name'>{character?.data?.name}</div>
						<div className='characters-group-character-card-character-type'>
							<div className='characters-group-character-card-character-type-text'>{characterType?.data?.name}</div>
						</div>
					</div>
					<div className='characters-group-character-card-summary-item-container'>
						{!character?.data?.summaryItems
							? null
							: character.data.summaryItems.map((summaryItem, index) => (
									<div key={index} className='characters-group-character-card-summary-item'>
										<div className='characters-group-character-card-summary-item-label'>{summaryItem.label}</div>
										<div className='characters-group-character-card-summary-item-text'>{summaryItem.text}</div>
									</div>
							  ))}
					</div>
				</div>
				{!character?.data?.cardBackground?.image ? null : (
					<div className='characters-group-character-card-background'>
						<img src={character.data.cardBackground.image} alt='' />
					</div>
				)}
			</div>
		</div>
	);
};
