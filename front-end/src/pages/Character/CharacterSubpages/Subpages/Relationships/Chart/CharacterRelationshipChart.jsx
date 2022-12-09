// Packages

// Components
import { CharacterRelationshipChartCharacterItem } from "./CharacterRelationshipChartCharacterItem/CharacterRelationshipChartCharacterItem";
import { CharacterRelationshipChartCharacterItemName } from "./CharacterRelationshipChartCharacterItemName/CharacterRelationshipChartCharacterItemName";

// Logic
import { CharacterRelationshipChartLogic } from "./CharacterRelationshipChartLogic";

// Context

// Services

// Styles
import "./CharacterRelationshipChart.css";

// Assets

export const CharacterRelationshipChart = ({
	characterRelationshipsChartRef,
	characterRelationshipsChartWidth,
	characterRelationshipsChartItemWidth,
}) => {
	const { characterRelationshipsCharacters, onClickChart } = CharacterRelationshipChartLogic({
		characterRelationshipsChartWidth,
		characterRelationshipsChartItemWidth,
	});

	return (
		<div className='character-subpage-relationships-chart-container' onClick={onClickChart}>
			<div ref={characterRelationshipsChartRef} className='character-subpage-relationships-chart'>
				<div className='character-subpage-relationships-chart-characters-names-container'>
					{!characterRelationshipsCharacters
						? null
						: characterRelationshipsCharacters.map((character, index) => (
								<CharacterRelationshipChartCharacterItemName
									key={index}
									character={character}
									index={index}
									characterRelationshipsChartWidth={characterRelationshipsChartWidth}
									characterRelationshipsChartItemWidth={characterRelationshipsChartItemWidth}
								/>
						  ))}
				</div>
				<div className='character-subpage-relationships-chart-characters-container'>
					{!characterRelationshipsCharacters
						? null
						: characterRelationshipsCharacters.map((character, index) => (
								<CharacterRelationshipChartCharacterItem
									key={index}
									character={character}
									index={index}
									characterRelationshipsChartWidth={characterRelationshipsChartWidth}
									characterRelationshipsChartItemWidth={characterRelationshipsChartItemWidth}
								/>
						  ))}
				</div>
				<canvas id='character-subpage-relationships-chart-canvas' className='character-subpage-relationships-chart-canvas' />
			</div>
		</div>
	);
};
