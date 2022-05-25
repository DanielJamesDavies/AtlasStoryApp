// Packages

// Components

// Logic

// Context

// Services

// Styles
import "./StoryPrimaryCharacterCard.css";

// Assets

export const StoryPrimaryCharacterCard = ({ character }) => {
	return (
		<div className='story-primary-character-card'>
			<div className='story-primary-character-card-top-container'>
				<div className='story-primary-character-card-top-name'>{character?.data?.name}</div>
			</div>
			<div className='story-primary-character-card-info-container'>
				{!character?.data?.fullName ? null : <StoryPrimaryCharacterCardInfoItem label={"Full Name"} value={character.data.fullName} />}
				{!character?.data?.descriptives ? null : (
					<StoryPrimaryCharacterCardInfoItem label={"Descriptives"} value={character.data.descriptives} />
				)}
				{!character?.data?.represents ? null : <StoryPrimaryCharacterCardInfoItem label={"Represents"} value={character.data.represents} />}
			</div>
		</div>
	);
};

const StoryPrimaryCharacterCardInfoItem = ({ label, value }) => {
	return (
		<div className='story-primary-character-card-info-item'>
			<div className='story-primary-character-card-info-item-label'>{label}</div>
			<div className='story-primary-character-card-info-item-value'>{value}</div>
		</div>
	);
};
