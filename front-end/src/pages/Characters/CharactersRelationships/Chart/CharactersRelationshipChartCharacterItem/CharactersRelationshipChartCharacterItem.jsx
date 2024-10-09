// Packages

// Components

// Logic
import { CharactersRelationshipChartCharacterItemLogic } from "./CharactersRelationshipChartCharacterItemLogic";

// Context

// Services

// Styles
import "./CharactersRelationshipChartCharacterItem.css";

// Assets

export const CharactersRelationshipChartCharacterItem = ({
	character,
	index,
	charactersRelationshipChartWidth,
	charactersRelationshipChartItemWidth,
}) => {
	const { charactersRelationshipChartCharacterItemStyles, selectedCharacterRelationshipsCharacterId, onClick } =
		CharactersRelationshipChartCharacterItemLogic({ character, index, charactersRelationshipChartWidth, charactersRelationshipChartItemWidth });

	return (
		<div
			className={
				selectedCharacterRelationshipsCharacterId === character?._id
					? "characters-relationship-chart-character-item characters-relationship-chart-character-item-active"
					: "characters-relationship-chart-character-item"
			}
			style={charactersRelationshipChartCharacterItemStyles}
		>
			<div className='characters-relationship-chart-character-item-face-image' onClick={onClick}>
				{!character?.data?.faceImage?.image || character?.data?.faceImage?.image === "NO_IMAGE" ? null : (
					<img src={character?.data?.faceImage?.image} alt='' draggable={false} />
				)}
			</div>
		</div>
	);
};
