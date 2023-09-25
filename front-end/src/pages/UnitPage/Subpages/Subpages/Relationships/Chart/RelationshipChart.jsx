// Packages

// Components
import { RelationshipChartCharacterItem } from "./RelationshipChartCharacterItem/RelationshipChartCharacterItem";
import { RelationshipChartCharacterItemName } from "./RelationshipChartCharacterItemName/RelationshipChartCharacterItemName";

// Logic
import { RelationshipChartLogic } from "./RelationshipChartLogic";

// Context

// Services

// Styles
import "./RelationshipChart.css";

// Assets

export const RelationshipChart = ({ characterRelationshipsChartRef, characterRelationshipsChartWidth, characterRelationshipsChartItemWidth }) => {
	const { selectedCharacterRelationshipsCharacterId, storyCharacters, characterRelationshipsCharacters, onClickChart } = RelationshipChartLogic({
		characterRelationshipsChartWidth,
		characterRelationshipsChartItemWidth,
	});

	return (
		<div className='unit-page-subpage-relationships-chart-container' onClick={onClickChart}>
			<div ref={characterRelationshipsChartRef} className='unit-page-subpage-relationships-chart'>
				{!selectedCharacterRelationshipsCharacterId ? null : (
					<div
						key={selectedCharacterRelationshipsCharacterId}
						className='unit-page-subpage-relationships-chart-selected-unit-page-item'
						style={{
							"--unitColour": storyCharacters.find((e) => e._id === selectedCharacterRelationshipsCharacterId)?.data?.colour,
						}}
					>
						<div className='unit-page-subpage-relationships-chart-selected-unit-page-item-face-image'>
							{!storyCharacters.find((e) => e._id === selectedCharacterRelationshipsCharacterId)?.data?.faceImage?.image ? null : (
								<img
									src={storyCharacters.find((e) => e._id === selectedCharacterRelationshipsCharacterId)?.data?.faceImage?.image}
									alt=''
									draggable={false}
								/>
							)}
						</div>
						<div className='unit-page-subpage-relationships-chart-selected-unit-page-item-name'>
							{storyCharacters.find((e) => e._id === selectedCharacterRelationshipsCharacterId)?.data?.name}
						</div>
					</div>
				)}
				<div className='unit-page-subpage-relationships-chart-characters-names-container'>
					{!characterRelationshipsCharacters
						? null
						: characterRelationshipsCharacters.map((unit, index) => (
								<RelationshipChartCharacterItemName
									key={index}
									unit={unit}
									index={index}
									characterRelationshipsChartWidth={characterRelationshipsChartWidth}
									characterRelationshipsChartItemWidth={characterRelationshipsChartItemWidth}
								/>
						  ))}
				</div>
				<div className='unit-page-subpage-relationships-chart-characters-container'>
					{!characterRelationshipsCharacters
						? null
						: characterRelationshipsCharacters.map((unit, index) => (
								<RelationshipChartCharacterItem
									key={index}
									unit={unit}
									index={index}
									characterRelationshipsChartWidth={characterRelationshipsChartWidth}
									characterRelationshipsChartItemWidth={characterRelationshipsChartItemWidth}
									characterRelationshipsCharactersCount={characterRelationshipsCharacters.length}
								/>
						  ))}
				</div>
				<canvas id='unit-page-subpage-relationships-chart-canvas' className='unit-page-subpage-relationships-chart-canvas' />
			</div>
		</div>
	);
};
