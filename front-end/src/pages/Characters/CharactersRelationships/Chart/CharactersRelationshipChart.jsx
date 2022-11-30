// Packages

// Components
import { CharactersRelationshipChartCharacterItem } from "./CharactersRelationshipChartCharacterItem/CharactersRelationshipChartCharacterItem";
import { CharactersRelationshipChartCharacterItemName } from "./CharactersRelationshipChartCharacterItemName/CharactersRelationshipChartCharacterItemName";

// Logic
import { CharactersRelationshipChartLogic } from "./CharactersRelationshipChartLogic";

// Context

// Services

// Styles
import "./CharactersRelationshipChart.css";

// Assets

export const CharactersRelationshipChart = ({
	charactersRelationshipChartRef,
	charactersRelationshipChartWidth,
	charactersRelationshipChartItemWidth,
}) => {
	const { characters, charactersFaceImages, selectedCharacterRelationshipsCharacterId, characterRelationshipsCharacters, onClickChart } =
		CharactersRelationshipChartLogic({
			charactersRelationshipChartWidth,
			charactersRelationshipChartItemWidth,
		});

	return (
		<div className='characters-relationship-chart-container' onClick={onClickChart}>
			<div ref={charactersRelationshipChartRef} className='characters-relationship-chart'>
				{!selectedCharacterRelationshipsCharacterId ? null : (
					<div
						key={selectedCharacterRelationshipsCharacterId}
						className='characters-relationship-chart-selected-character-item'
						style={{ "--characterColour": characters.find((e) => e._id === selectedCharacterRelationshipsCharacterId)?.data?.colour }}
					>
						<div className='characters-relationship-chart-selected-character-item-face-image'>
							{!charactersFaceImages.find((e) => e.character_id === selectedCharacterRelationshipsCharacterId)?.image ? null : (
								<img
									src={charactersFaceImages.find((e) => e.character_id === selectedCharacterRelationshipsCharacterId)?.image}
									alt=''
									draggable={false}
								/>
							)}
						</div>
						<div className='characters-relationship-chart-selected-character-item-name'>
							{characters.find((e) => e._id === selectedCharacterRelationshipsCharacterId)?.data?.name}
						</div>
					</div>
				)}
				<div className='characters-relationship-chart-characters-names-container'>
					{!characterRelationshipsCharacters
						? null
						: characterRelationshipsCharacters.map((character, index) => (
								<CharactersRelationshipChartCharacterItemName
									key={index}
									character={character}
									index={index}
									charactersRelationshipChartWidth={charactersRelationshipChartWidth}
									charactersRelationshipChartItemWidth={charactersRelationshipChartItemWidth}
								/>
						  ))}
				</div>
				<div className='characters-relationship-chart-characters-container'>
					{!characterRelationshipsCharacters
						? null
						: characterRelationshipsCharacters.map((character, index) => (
								<CharactersRelationshipChartCharacterItem
									key={index}
									character={character}
									index={index}
									charactersRelationshipChartWidth={charactersRelationshipChartWidth}
									charactersRelationshipChartItemWidth={charactersRelationshipChartItemWidth}
								/>
						  ))}
				</div>
				<canvas id='characters-relationship-chart-canvas' className='characters-relationship-chart-canvas' />
			</div>
		</div>
	);
};
