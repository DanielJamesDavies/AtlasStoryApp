// Packages

// Components

// Logic
import { CharactersRelationshipChartCharacterItemNameLogic } from "./CharactersRelationshipChartCharacterItemNameLogic";

// Context

// Services

// Styles
import "./CharactersRelationshipChartCharacterItemName.css";

// Assets

export const CharactersRelationshipChartCharacterItemName = ({
	character,
	index,
	charactersRelationshipChartWidth,
	charactersRelationshipChartItemWidth,
}) => {
	const {
		selectedCharacterRelationshipsCharacterId,
		charactersRelationshipChartCharacterItemNameRef,
		charactersRelationshipChartCharacterItemNameStyles,
	} = CharactersRelationshipChartCharacterItemNameLogic({
		character,
		index,
		charactersRelationshipChartWidth,
		charactersRelationshipChartItemWidth,
	});

	return (
		<div
			className={
				selectedCharacterRelationshipsCharacterId === character?._id
					? "characters-relationship-chart-character-item-name-container characters-relationship-chart-character-item-name-container-active"
					: "characters-relationship-chart-character-item-name-container"
			}
			style={charactersRelationshipChartCharacterItemNameStyles}
		>
			<div ref={charactersRelationshipChartCharacterItemNameRef} className='characters-relationship-chart-character-item-name'>
				{character?.data?.name}
			</div>
		</div>
	);
};
