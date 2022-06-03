// Packages
import { FaUserPlus, FaSort } from "react-icons/fa";

// Components
import { CharactersGroupCharacterCards } from "./CharactersGroupCharacterCards";
import { CharactersCreateCharacter } from "./CharactersCreateCharacter";
import { IconBtn } from "../../../components/IconBtn/IconBtn";

// Logic
import { CharactersGroupLogic } from "./CharactersGroupLogic";

// Context

// Services

// Styles
import "./CharactersGroup.css";

// Assets

export const CharactersGroup = () => {
	const { isAuthorizedToEdit, group, navigateToGroup, openCreateCharacterForm, toggleIsReorderingCharacters } = CharactersGroupLogic();

	return (
		<div className='characters-group'>
			<div className='characters-group-primary'>
				<div className='characters-group-primary-title'>{group?.data?.name}</div>
				<div className='characters-group-primary-buttons-container'>
					<button className='characters-group-primary-open-group-btn' onClick={navigateToGroup}>
						Open Group
					</button>
					{!isAuthorizedToEdit ? null : (
						<div className='characters-group-primary-modify-btns-container'>
							<IconBtn
								className='characters-group-primary-modify-btn'
								icon={<FaUserPlus />}
								iconName='plus'
								onClick={openCreateCharacterForm}
							/>
							<IconBtn
								className='characters-group-primary-modify-btn'
								icon={<FaSort />}
								iconName='sort'
								onClick={toggleIsReorderingCharacters}
							/>
						</div>
					)}
				</div>
			</div>
			<CharactersGroupCharacterCards />
			<CharactersCreateCharacter />
		</div>
	);
};