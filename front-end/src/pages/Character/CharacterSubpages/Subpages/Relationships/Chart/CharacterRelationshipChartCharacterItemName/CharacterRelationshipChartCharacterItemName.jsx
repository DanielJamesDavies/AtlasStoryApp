// Packages

// Components

// Logic
import { CharacterRelationshipChartCharacterItemNameLogic } from "./CharacterRelationshipChartCharacterItemNameLogic";

// Context

// Services

// Styles
import "./CharacterRelationshipChartCharacterItemName.css";

// Assets

export const CharacterRelationshipChartCharacterItemName = ({
	character,
	index,
	characterRelationshipsChartWidth,
	characterRelationshipsChartItemWidth,
}) => {
	const {
		selectedCharacterRelationshipsCharacterId,
		charactersRelationshipChartCharacterItemNameRef,
		charactersRelationshipChartCharacterItemNameStyles,
	} = CharacterRelationshipChartCharacterItemNameLogic({
		character,
		index,
		characterRelationshipsChartWidth,
		characterRelationshipsChartItemWidth,
	});

	return (
		<div
			className={
				selectedCharacterRelationshipsCharacterId === character?._id
					? "character-subpage-relationships-chart-character-item-name-container character-subpage-relationships-chart-character-item-name-container-active"
					: "character-subpage-relationships-chart-character-item-name-container"
			}
			style={charactersRelationshipChartCharacterItemNameStyles}
		>
			<div ref={charactersRelationshipChartCharacterItemNameRef} className='character-subpage-relationships-chart-character-item-name'>
				{character?.data?.name}
			</div>
		</div>
	);
};
