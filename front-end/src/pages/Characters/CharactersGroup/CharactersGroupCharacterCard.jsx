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
	const { character, cardBackground, characterType, navigateToCharacter, onCharacterCardMouseDown, cardStyles } =
		CharactersGroupCharacterCardLogic({
			characterID,
		});

	if (!character) return <div className='characters-group-character-card-placeholder' />;
	return (
		<div
			className='characters-group-character-card drag-drop-item-content'
			onClick={navigateToCharacter}
			onAuxClick={navigateToCharacter}
			onMouseDown={onCharacterCardMouseDown}
			style={cardStyles}
		>
			<div className='characters-group-character-card-content'>
				<div className='characters-group-character-card-top-container'>
					<div className='characters-group-character-card-top-name'>{character?.data?.name}</div>
					<div
						className='characters-group-character-card-character-type'
						style={characterType?.data?.colour ? { background: characterType.data.colour } : {}}
					>
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
			{!cardBackground ? null : (
				<div className='characters-group-character-card-background'>
					<img src={cardBackground} alt='' />
				</div>
			)}
		</div>
	);
};
