// Packages

// Components
import { CharactersTitle } from "./CharactersTitle";
import { CharactersGroups } from "./CharactersGroups";
import { CharactersGroup } from "./CharactersGroup";

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
