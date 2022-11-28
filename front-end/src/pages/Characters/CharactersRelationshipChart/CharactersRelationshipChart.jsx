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

export const CharactersRelationshipChart = () => {
	const { groups, characters, charactersFaceImages, onClickChart } = CharactersRelationshipChartLogic();

	return (
		<div className='characters-relationship-chart-container'>
			<div className='characters-relationship-chart' onClick={onClickChart}>
				{!groups || !characters
					? null
					: groups
							.map((group) =>
								group?.data?.characters.map((character) => {
									let oldCharacter = characters.find((e) => e?._id === character?.character_id);
									if (!oldCharacter) return false;
									if (!charactersFaceImages) return oldCharacter;
									let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
									newCharacter.data.faceImage = charactersFaceImages?.find((e) => e?._id === newCharacter?.data?.faceImage);
									return newCharacter;
								})
							)
							.flat(1)
							.filter((e) => e !== false)
							.map((character, index) => (
								<CharactersRelationshipChartCharacterItem key={index} character={character} index={index} />
							))}
			</div>
			<canvas id='characters-relationship-chart-canvas' className='characters-relationship-chart-canvas' />
		</div>
	);
};
