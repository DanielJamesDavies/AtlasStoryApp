// Packages

// Components

// Logic
import { RelationshipChartCharacterItemLogic } from "./RelationshipChartCharacterItemLogic";

// Context

// Services

// Styles
import "./RelationshipChartCharacterItem.css";

// Assets

export const RelationshipChartCharacterItem = ({
	unit,
	index,
	characterRelationshipsChartWidth,
	characterRelationshipsChartItemWidth,
	characterRelationshipsCharactersCount,
}) => {
	const { unit_uid, charactersRelationshipChartCharacterItemStyles, selectedCharacterRelationshipsCharacterId, onClick } =
		RelationshipChartCharacterItemLogic({ unit, index, characterRelationshipsChartWidth, characterRelationshipsChartItemWidth });

	return (
		<div
			className={
				unit?.uid === unit_uid || selectedCharacterRelationshipsCharacterId === unit?._id
					? "unit-page-subpage-relationships-chart-unit-page-item unit-page-subpage-relationships-chart-unit-page-item-active " +
					  (index / (characterRelationshipsCharactersCount - 1) < 0.25 ||
					  (index - 0.5) / (characterRelationshipsCharactersCount - 1) > 0.75
							? "unit-page-subpage-relationships-chart-unit-page-item-upper-half"
							: "")
					: "unit-page-subpage-relationships-chart-unit-page-item " +
					  (index / (characterRelationshipsCharactersCount - 1) < 0.25 ||
					  (index - 0.5) / (characterRelationshipsCharactersCount - 1) > 0.75
							? "unit-page-subpage-relationships-chart-unit-page-item-upper-half"
							: "")
			}
			style={charactersRelationshipChartCharacterItemStyles}
		>
			<div className='unit-page-subpage-relationships-chart-unit-page-item-face-image' onClick={onClick}>
				{!unit?.data?.faceImage?.image ? null : <img src={unit?.data?.faceImage?.image} alt='' draggable={false} />}
			</div>
		</div>
	);
};
