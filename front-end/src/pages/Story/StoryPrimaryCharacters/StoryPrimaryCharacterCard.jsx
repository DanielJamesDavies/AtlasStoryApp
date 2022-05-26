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
	const {
		navigateToCharacter,
		storyPrimaryCharacterCardStyles,
		storyPrimaryCharacterCardTopNameStyles,
		storyPrimaryCharacterCardInfoItemStyles,
	} = StoryPrimaryCharacterCardLogic({ character });

	return (
		<div className='story-primary-character-card' onClick={navigateToCharacter} style={storyPrimaryCharacterCardStyles}>
			<div className='story-primary-character-card-top-container'>
				<div className='story-primary-character-card-top-name' style={storyPrimaryCharacterCardTopNameStyles}>
					{character?.data?.name}
				</div>
			</div>
			<div className='story-primary-character-card-info-container'>
				{!character?.data?.fullName ? null : (
					<StoryPrimaryCharacterCardInfoItem
						label={"Full Name"}
						value={character.data.fullName}
						storyPrimaryCharacterCardInfoItemStyles={storyPrimaryCharacterCardInfoItemStyles}
					/>
				)}
				{!character?.data?.descriptives ? null : (
					<StoryPrimaryCharacterCardInfoItem
						label={"Descriptives"}
						value={character.data.descriptives}
						storyPrimaryCharacterCardInfoItemStyles={storyPrimaryCharacterCardInfoItemStyles}
					/>
				)}
			</div>
		</div>
	);
};

const StoryPrimaryCharacterCardInfoItem = ({ label, value, storyPrimaryCharacterCardInfoItemStyles }) => {
	return (
		<div className='story-primary-character-card-info-item' style={storyPrimaryCharacterCardInfoItemStyles}>
			<div className='story-primary-character-card-info-item-label'>{label}</div>
			<div className='story-primary-character-card-info-item-value'>{value}</div>
		</div>
	);
};
