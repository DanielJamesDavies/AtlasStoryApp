// Packages

// Components
import { CharactersRelationshipChart } from "./Chart/CharactersRelationshipChart";
import { CharactersRelationshipsInfo } from "./Info/CharactersRelationshipsInfo";

// Logic
import { CharactersRelationshipsLogic } from "./CharactersRelationshipsLogic";

// Context

// Services

// Styles
import "./CharactersRelationships.css";

// Assets

export const CharactersRelationships = () => {
	const { groups, characters, charactersFaceImages, charactersRelationshipChartRef, charactersRelationshipChartWidth } =
		CharactersRelationshipsLogic();

	if (!groups || !characters || !charactersFaceImages) return null;
	return (
		<div
			className='characters-relationship-container'
			style={{ "--charactersRelationshipChartWidth": charactersRelationshipChartWidth + "px" }}
		>
			<div className='characters-relationship-title'>Character Relationships</div>
			<CharactersRelationshipChart
				charactersRelationshipChartRef={charactersRelationshipChartRef}
				charactersRelationshipChartWidth={charactersRelationshipChartWidth}
			/>
			<CharactersRelationshipsInfo />
		</div>
	);
};
