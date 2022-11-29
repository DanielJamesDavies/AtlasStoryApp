// Packages

// Components
import { CharactersTitle } from "./CharactersTitle/CharactersTitle";
import { CharactersGroups } from "./CharactersGroups/CharactersGroups";
import { CharactersGroup } from "./CharactersGroup/CharactersGroup";
import { CharactersRelationships } from "./CharactersRelationships/CharactersRelationships";
import { CharactersCharacterTypes } from "./CharactersCharacterTypes/CharactersCharacterTypes";
import { CharactersCharacterType } from "./CharactersCharacterType/CharactersCharacterType";

// Logic

// Context

// Services

// Styles
import "./Characters.css";

// Assets

export const Characters = () => {
	return (
		<div className='characters'>
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
