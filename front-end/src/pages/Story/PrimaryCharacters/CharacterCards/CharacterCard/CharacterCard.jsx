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
	const { cardBackground, characterType, navigateToCharacter, onCharacterCardMouseDown, cardStyles } = CharacterCardLogic({
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
					<StoryPrimaryCharacterCardCharacterType characterType={characterType} />
				</div>
				<div className='story-primary-character-card-summary-items-container'>
					{!character?.data?.summaryItems
						? null
						: character.data.summaryItems.map((summaryItem, index) => (
								<StoryPrimaryCharacterCardInfoItem key={index} label={summaryItem.label} text={summaryItem.text} />
						  ))}
				</div>
			</div>
			{!cardBackground ? null : (
				<div className='story-primary-character-card-background'>
					<img src={cardBackground} alt='' />
				</div>
			)}
		</div>
	);
};

const StoryPrimaryCharacterCardCharacterType = ({ characterType }) => {
	return (
		<div
			className='story-primary-character-card-character-type'
			style={characterType?.data?.colour ? { background: characterType.data.colour } : {}}
		>
			<div className='story-primary-character-card-character-type-text'>{characterType?.data?.name}</div>
		</div>
	);
};

const StoryPrimaryCharacterCardInfoItem = ({ label, text }) => {
	return (
		<div className='story-primary-character-card-summary-item'>
			<div className='story-primary-character-card-summary-item-label'>{label}</div>
			<div className='story-primary-character-card-summary-item-text'>{text}</div>
		</div>
	);
};
