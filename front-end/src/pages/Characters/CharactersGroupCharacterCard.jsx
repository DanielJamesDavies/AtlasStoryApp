// Packages

// Components

// Logic
import { CharactersGroupCharacterCardLogic } from "./CharactersGroupCharacterCardLogic";

// Context

// Services

// Styles
import "./CharactersGroupCharacterCard.css";

// Assets

export const CharactersGroupCharacterCard = ({ character }) => {
	const { navigateToCharacter, cardStyles, topNameStyles, infoItemStyles } = CharactersGroupCharacterCardLogic({ character });

	return (
		<div className='characters-group-character-card' onClick={navigateToCharacter} style={cardStyles}>
			<div className='characters-group-character-card-top-container'>
				<div className='characters-group-character-card-top-name' style={topNameStyles}>
					{character?.data?.name}
				</div>
			</div>
			<div className='characters-group-character-card-info-container'>
				{!character?.data?.fullName ? null : (
					<CharactersGroupCharacterCardInfoItem label={"Full Name"} value={character.data.fullName} infoItemStyles={infoItemStyles} />
				)}
				{!character?.data?.descriptives ? null : (
					<CharactersGroupCharacterCardInfoItem
						label={"Descriptives"}
						value={character.data.descriptives}
						infoItemStyles={infoItemStyles}
					/>
				)}
				{!character?.data?.represents ? null : (
					<CharactersGroupCharacterCardInfoItem label={"Represents"} value={character.data.represents} infoItemStyles={infoItemStyles} />
				)}
				{!character?.data?.primaryAbility ? null : (
					<CharactersGroupCharacterCardInfoItem
						label={"Primary Ability"}
						value={character.data.primaryAbility}
						infoItemStyles={infoItemStyles}
					/>
				)}
			</div>
		</div>
	);
};

const CharactersGroupCharacterCardInfoItem = ({ label, value, infoItemStyles }) => {
	return (
		<div className='characters-group-character-card-info-item' style={infoItemStyles}>
			<div className='characters-group-character-card-info-item-label'>{label}</div>
			<div className='characters-group-character-card-info-item-value'>{value}</div>
		</div>
	);
};
