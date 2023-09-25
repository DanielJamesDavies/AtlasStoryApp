// Packages

// Components

// Logic
import { RelationshipChartCharacterItemNameLogic } from "./RelationshipChartCharacterItemNameLogic";

// Context

// Services

// Styles
import "./RelationshipChartCharacterItemName.css";

// Assets

export const RelationshipChartCharacterItemName = ({ unit, index, characterRelationshipsChartWidth, characterRelationshipsChartItemWidth }) => {
	const {
		selectedCharacterRelationshipsCharacterId,
		charactersRelationshipChartCharacterItemNameRef,
		charactersRelationshipChartCharacterItemNameStyles,
	} = RelationshipChartCharacterItemNameLogic({
		unit,
		index,
		characterRelationshipsChartWidth,
		characterRelationshipsChartItemWidth,
	});

	return (
		<div
			className={
				selectedCharacterRelationshipsCharacterId === unit?._id
					? "unit-page-subpage-relationships-chart-unit-page-item-name-container unit-page-subpage-relationships-chart-unit-page-item-name-container-active"
					: "unit-page-subpage-relationships-chart-unit-page-item-name-container"
			}
			style={charactersRelationshipChartCharacterItemNameStyles}
		>
			<div ref={charactersRelationshipChartCharacterItemNameRef} className='unit-page-subpage-relationships-chart-unit-page-item-name'>
				{unit?.data?.name}
			</div>
		</div>
	);
};
