// Packages
import { FaUserPlus, FaSort } from "react-icons/fa";

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
	const { isAuthorizedToModify, group, navigateToGroup, openCreateCharacterForm, toggleIsReorderingCharacters } = CharactersGroupLogic();

	return (
		<div className='characters-group'>
			<div className='characters-group-primary'>
				<div className='characters-group-primary-title'>{group?.data?.name}</div>
				<button className='characters-group-primary-open-group-btn' onClick={navigateToGroup}>
					Open Group
				</button>
				{!isAuthorizedToModify ? null : (
					<>
						<button
							className='characters-group-primary-modify-btn characters-group-primary-modify-btn-create-character-form'
							onClick={openCreateCharacterForm}
						>
							<FaUserPlus />
						</button>
						<button
							className='characters-group-primary-modify-btn characters-group-primary-modify-btn-reorder-characters'
							onClick={toggleIsReorderingCharacters}
						>
							<FaSort />
						</button>
					</>
				)}
			</div>
			<CharactersGroupCharacterCards />
			<CharactersCreateCharacter />
		</div>
	);
};
