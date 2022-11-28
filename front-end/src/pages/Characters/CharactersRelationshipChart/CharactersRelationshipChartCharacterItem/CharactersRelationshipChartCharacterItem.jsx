// Packages

// Components

// Logic
import { CharactersRelationshipChartCharacterItemLogic } from "./CharactersRelationshipChartCharacterItemLogic";

// Context

// Services

// Styles
import "./CharactersRelationshipChartCharacterItem.css";

// Assets

export const CharactersRelationshipChartCharacterItem = ({ character, index }) => {
	const { charactersRelationshipChartCharacterItemStyles, selectedCharacterRelationshipsCharacterId, onClick } =
		CharactersRelationshipChartCharacterItemLogic({ character, index });

	return (
		<div
			className={
				selectedCharacterRelationshipsCharacterId === character?._id
					? "characters-relationship-chart-character-item characters-relationship-chart-character-item-active"
					: "characters-relationship-chart-character-item"
			}
			style={charactersRelationshipChartCharacterItemStyles}
			onClick={onClick}
		>
			<div className='characters-relationship-chart-character-item-face-image'>
				{!character?.data?.faceImage?.image ? null : <img src={character?.data?.faceImage?.image} alt='' />}
			</div>
			<div className='characters-relationship-chart-character-item-name'>{character?.data?.name}</div>
		</div>
	);
};
