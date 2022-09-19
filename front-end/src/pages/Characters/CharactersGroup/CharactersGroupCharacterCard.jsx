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
	const { character, cardBackground, characterType, navigateToCharacter, onCharacterCardMouseDown, cardStyles, topNameStyles, infoItemStyles } =
		CharactersGroupCharacterCardLogic({
			characterID,
		});

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
					<div className='characters-group-character-card-top-name' style={topNameStyles}>
						{character?.data?.name}
					</div>
					<CharactersGroupCharacterCardCharacterType characterType={characterType} />
				</div>
				<div className='characters-group-character-card-summary-item-container'>
					{!character?.data?.summaryItems
						? null
						: character.data.summaryItems.map((summaryItem, index) => (
								<CharactersGroupCharacterCardInfoItem
									key={index}
									label={summaryItem.label}
									text={summaryItem.text}
									infoItemStyles={infoItemStyles}
								/>
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

const CharactersGroupCharacterCardCharacterType = ({ characterType }) => {
	return (
		<div
			className='characters-group-character-card-character-type'
			style={characterType?.data?.colour ? { background: characterType.data.colour } : {}}
		>
			<div className='characters-group-character-card-character-type-text'>{characterType?.data?.name}</div>
		</div>
	);
};

const CharactersGroupCharacterCardInfoItem = ({ label, text, infoItemStyles }) => {
	return (
		<div className='characters-group-character-card-summary-item' style={infoItemStyles}>
			<div className='characters-group-character-card-summary-item-label'>{label}</div>
			<div className='characters-group-character-card-summary-item-text'>{text}</div>
		</div>
	);
};
