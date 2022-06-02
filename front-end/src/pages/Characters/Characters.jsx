// Packages

// Components
import { CharactersTitle } from "./CharactersTitle/CharactersTitle";
import { CharactersGroups } from "./CharactersGroups/CharactersGroups";
import { CharactersGroup } from "./CharactersGroup/CharactersGroup";
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
				<CharactersGroups />
				<CharactersGroup />
				<CharactersCharacterTypes />
				<CharactersCharacterType />
			</div>
		</div>
	);
};
