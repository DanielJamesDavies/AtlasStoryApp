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
	const { cardBackground, characterType, navigateToCharacter, cardStyles, cardTopNameStyles, cardInfoItemStyles } =
		StoryPrimaryCharacterCardLogic({
			character,
		});

	return (
		<div className='story-primary-character-card drag-drop-item-content' onClick={navigateToCharacter} style={cardStyles}>
			<div className='story-primary-character-card-content'>
				<div className='story-primary-character-card-top-container'>
					<div className='story-primary-character-card-top-name' style={cardTopNameStyles}>
						{character?.data?.name}
					</div>
					<StoryPrimaryCharacterCardCharacterType characterType={characterType} />
				</div>
				<div className='story-primary-character-card-info-container'>
					{!character?.data?.fullName ? null : (
						<StoryPrimaryCharacterCardInfoItem
							label={"Full Name"}
							value={character.data.fullName}
							cardInfoItemStyles={cardInfoItemStyles}
						/>
					)}
					{!character?.data?.descriptives ? null : (
						<StoryPrimaryCharacterCardInfoItem
							label={"Descriptives"}
							value={character.data.descriptives}
							cardInfoItemStyles={cardInfoItemStyles}
						/>
					)}
					{!character?.data?.represents ? null : (
						<StoryPrimaryCharacterCardInfoItem
							label={"Represents"}
							value={character.data.represents}
							cardInfoItemStyles={cardInfoItemStyles}
						/>
					)}
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

const StoryPrimaryCharacterCardInfoItem = ({ label, value, cardInfoItemStyles }) => {
	return (
		<div className='story-primary-character-card-info-item' style={cardInfoItemStyles}>
			<div className='story-primary-character-card-info-item-label'>{label}</div>
			<div className='story-primary-character-card-info-item-value'>{value}</div>
		</div>
	);
};
