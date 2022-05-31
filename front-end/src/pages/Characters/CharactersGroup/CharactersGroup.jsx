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
import { IconBtn } from "../../../components/IconBtn/IconBtn";

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
					<div className='characters-group-primary-modify-btns-container'>
						<IconBtn className='characters-group-primary-modify-btn' icon={<FaUserPlus />} onClick={openCreateCharacterForm} />
						<IconBtn className='characters-group-primary-modify-btn' icon={<FaSort />} onClick={toggleIsReorderingCharacters} />
					</div>
				)}
			</div>
			<CharactersGroupCharacterCards />
			<CharactersCreateCharacter />
		</div>
	);
};
