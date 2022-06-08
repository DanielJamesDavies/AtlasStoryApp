// Packages

// Components

// Logic
import { StoryPrimaryCharacterCardLogic } from "./StoryPrimaryCharacterCardLogic";

// Context

// Services

// Styles
import "./StoryPrimaryCharacterCard.css";

// Assets

export const StoryPrimaryCharacterCard = ({ character }) => {
	const { cardBackground, characterType, navigateToCharacter, cardStyles, topNameStyles, infoItemStyles } = StoryPrimaryCharacterCardLogic({
		character,
	});

	return (
		<div className='story-primary-character-card drag-drop-item-content' onClick={navigateToCharacter} style={cardStyles}>
			<div className='story-primary-character-card-content'>
				<div className='story-primary-character-card-top-container'>
					<div className='story-primary-character-card-top-name' style={topNameStyles}>
						{character?.data?.name}
					</div>
					<StoryPrimaryCharacterCardCharacterType characterType={characterType} />
				</div>
				<div className='story-primary-character-card-summary-item-container'>
					{!character?.data?.summaryItems
						? null
						: character.data.summaryItems.map((summaryItem, index) => (
								<StoryPrimaryCharacterCardInfoItem
									key={index}
									label={summaryItem.label}
									value={summaryItem.value}
									infoItemStyles={infoItemStyles}
								/>
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

const StoryPrimaryCharacterCardInfoItem = ({ label, value, infoItemStyles }) => {
	return (
		<div className='story-primary-character-card-summary-item' style={infoItemStyles}>
			<div className='story-primary-character-card-summary-item-label'>{label}</div>
			<div className='story-primary-character-card-summary-item-value'>{value}</div>
		</div>
	);
};
