// Packages

// Components

// Logic
import { CharacterRelationshipChartCharacterItemLogic } from "./CharacterRelationshipChartCharacterItemLogic";

// Context

// Services

// Styles
import "./CharacterRelationshipChartCharacterItem.css";

// Assets

export const CharacterRelationshipChartCharacterItem = ({
	character,
	index,
	characterRelationshipsChartWidth,
	characterRelationshipsChartItemWidth,
}) => {
	const { character_uid, charactersRelationshipChartCharacterItemStyles, selectedCharacterRelationshipsCharacterId, onClick } =
		CharacterRelationshipChartCharacterItemLogic({ character, index, characterRelationshipsChartWidth, characterRelationshipsChartItemWidth });

	return (
		<div
			className={
				character?.uid === character_uid || selectedCharacterRelationshipsCharacterId === character?._id
					? "character-subpage-relationships-chart-character-item character-subpage-relationships-chart-character-item-active"
					: "character-subpage-relationships-chart-character-item"
			}
			style={charactersRelationshipChartCharacterItemStyles}
		>
			<div className='character-subpage-relationships-chart-character-item-face-image' onClick={onClick}>
				{!character?.data?.faceImage?.image ? null : <img src={character?.data?.faceImage?.image} alt='' draggable={false} />}
			</div>
		</div>
	);
};
