// Packages

// Components

// Logic
import { CharacterCardLogic } from "./CharacterCardLogic";

// Context

// Services

// Styles
import "./CharacterCard.css";

// Assets

export const CharacterCard = ({ character }) => {
	const { characterType, navigateToCharacter, onCharacterCardMouseDown, cardStyles } = CharacterCardLogic({
		character,
	});

	if (!character) return <div className='story-primary-character-card-placeholder' />;
	return (
		<div
			className='story-primary-character-card drag-drop-item-content'
			onClick={navigateToCharacter}
			onAuxClick={navigateToCharacter}
			onMouseDown={onCharacterCardMouseDown}
			style={cardStyles}
		>
			<div className='story-primary-character-card-content'>
				<div className='story-primary-character-card-top-container'>
					<div className='story-primary-character-card-top-name'>{character?.data?.name}</div>
					<div className='story-primary-character-card-character-type'>
						<div className='story-primary-character-card-character-type-text'>{characterType?.data?.name}</div>
					</div>
				</div>
				<div className='story-primary-character-card-summary-items-container'>
					{!character?.data?.summaryItems
						? null
						: character.data.summaryItems.map((summaryItem, index) => (
								<div key={index} className='story-primary-character-card-summary-item'>
									<div className='story-primary-character-card-summary-item-label'>{summaryItem?.label}</div>
									<div className='story-primary-character-card-summary-item-text'>{summaryItem?.text}</div>
								</div>
						  ))}
				</div>
			</div>
			{!character?.data?.cardBackground?.image ? null : (
				<div className='story-primary-character-card-background'>
					<img src={character?.data?.cardBackground?.image} alt='' />
				</div>
			)}
		</div>
	);
};
