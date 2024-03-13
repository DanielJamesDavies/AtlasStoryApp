// Packages

// Components
import { CharactersTitle } from "./CharactersTitle/CharactersTitle";
import { CharactersGroups } from "./CharactersGroups/CharactersGroups";
import { CharactersGroup } from "./CharactersGroup/CharactersGroup";
import { CharactersRelationships } from "./CharactersRelationships/CharactersRelationships";
import { CharactersCharacterTypes } from "./CharactersCharacterTypes/CharactersCharacterTypes";
import { CharactersCharacterType } from "./CharactersCharacterType/CharactersCharacterType";

// Logic
import { CharactersLogic } from "./CharactersLogic";

// Context

// Services

// Styles
import "./Characters.css";

// Assets

export const Characters = () => {
	const { story, activeGroupColour, activeGroupColourTint } = CharactersLogic();

	return (
		<div
			className='characters'
			style={{
				"--characters-groups-active-group-colour": !activeGroupColour
					? !story?.data?.colour
						? "#0044ff"
						: story?.data?.colour
					: activeGroupColour,
				"--characters-groups-active-group-colour-tint": !activeGroupColourTint
					? !story?.data?.colour
						? "#0044ff"
						: story?.data?.colour
					: activeGroupColourTint,
			}}
		>
			<CharactersTitle />
			<div className='characters-content-container'>
				<div className='characters-groups-content-container'>
					<CharactersGroups />
					<CharactersGroup />
				</div>
				<div className='characters-relationship-chart-content-container'>
					<CharactersRelationships />
				</div>
				<div className='characters-character-types-content-container'>
					<CharactersCharacterTypes />
					<CharactersCharacterType />
				</div>
			</div>
		</div>
	);
};
