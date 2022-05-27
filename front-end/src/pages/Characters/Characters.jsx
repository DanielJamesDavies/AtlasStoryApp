// Packages

// Components
import { CharactersTitle } from "./CharactersTitle/CharactersTitle";
import { CharactersGroups } from "./CharactersGroups/CharactersGroups";
import { CharactersGroup } from "./CharactersGroup/CharactersGroup";

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
			</div>
		</div>
	);
};
