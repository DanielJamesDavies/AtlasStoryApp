// Packages

// Components
import { CharactersRelationshipChartCharacterItem } from "./CharactersRelationshipChartCharacterItem/CharactersRelationshipChartCharacterItem";

// Logic
import { CharactersRelationshipChartLogic } from "./CharactersRelationshipChartLogic";

// Context

// Services

// Styles
import "./CharactersRelationshipChart.css";

// Assets

export const CharactersRelationshipChart = ({ charactersRelationshipChartRef, charactersRelationshipChartWidth }) => {
	const { characterRelationshipsCharacters, onClickChart } = CharactersRelationshipChartLogic({ charactersRelationshipChartWidth });

	return (
		<div className='characters-relationship-chart-container' onClick={onClickChart}>
			<div ref={charactersRelationshipChartRef} className='characters-relationship-chart'>
				<div className='characters-relationship-chart-characters-container'>
					{characterRelationshipsCharacters.map((character, index) => (
						<CharactersRelationshipChartCharacterItem
							key={index}
							character={character}
							index={index}
							charactersRelationshipChartWidth={charactersRelationshipChartWidth}
						/>
					))}
				</div>
				<canvas id='characters-relationship-chart-canvas' className='characters-relationship-chart-canvas' />
			</div>
		</div>
	);
};
