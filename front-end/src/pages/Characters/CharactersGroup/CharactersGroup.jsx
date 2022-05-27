// Packages

// Components
import { CharactersGroupCharacterCard } from "./CharactersGroupCharacterCard";

// Logic
import { CharactersGroupLogic } from "./CharactersGroupLogic";

// Context

// Services

// Styles
import "./CharactersGroup.css";

// Assets

export const CharactersGroup = () => {
	const { groups, openGroup, navigateToGroup } = CharactersGroupLogic();

	return (
		<div className='characters-group'>
			<div className='characters-group-primary'>
				<div className='characters-group-primary-title'>{groups[openGroup]?.data?.name}</div>
				<button className='characters-group-primary-open-group-btn' onClick={navigateToGroup}>
					Open Group
				</button>
			</div>
			<div className='characters-group-characters-cards-container'>
				{!groups
					? null
					: groups[openGroup]?.data?.characters.map((character, index) => (
							<CharactersGroupCharacterCard key={index} character={character} />
					  ))}
			</div>
		</div>
	);
};
