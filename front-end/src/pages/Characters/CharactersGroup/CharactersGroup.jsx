// Packages
import { FaUserPlus } from "react-icons/fa";

// Components
import { CharactersGroupCharacterCards } from "./CharactersGroupCharacterCards";
import { CharactersCreateCharacter } from "./CharactersCreateCharacter";

// Logic
import { CharactersGroupLogic } from "./CharactersGroupLogic";

// Context

// Services

// Styles
import "./CharactersGroup.css";

// Assets

export const CharactersGroup = () => {
	const { isAuthorizedToModify, groups, openGroup, navigateToGroup, openCreateCharacterForm } = CharactersGroupLogic();

	return (
		<div className='characters-group'>
			<div className='characters-group-primary'>
				<div className='characters-group-primary-title'>{groups[openGroup]?.data?.name}</div>
				<button className='characters-group-primary-open-group-btn' onClick={navigateToGroup}>
					Open Group
				</button>
				{!isAuthorizedToModify ? null : (
					<button className='characters-group-primary-create-character-btn' onClick={openCreateCharacterForm}>
						<FaUserPlus />
					</button>
				)}
			</div>
			<CharactersGroupCharacterCards />
			<CharactersCreateCharacter />
		</div>
	);
};
