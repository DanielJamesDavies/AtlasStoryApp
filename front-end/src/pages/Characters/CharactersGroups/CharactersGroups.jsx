// Packages
import { FaPlus, FaSort } from "react-icons/fa";

// Components
import { CharactersCreateGroup } from "./CharactersCreateGroup";

// Logic
import { CharactersGroupsLogic } from "./CharactersGroupsLogic";

// Context

// Services

// Styles
import "./CharactersGroups.css";

// Assets

export const CharactersGroups = () => {
	const { isAuthorizedToModify, groups, openGroup, changeOpenGroup, openCreateGroupForm, toggleIsReorderingGroups } = CharactersGroupsLogic();

	return (
		<div className='characters-groups'>
			<div className='characters-groups-primary'>
				<div className='characters-groups-primary-title'>Groups</div>
				{!isAuthorizedToModify ? null : (
					<div className='characters-groups-primary-modify-buttons-container'>
						<button className='characters-groups-primary-modify-btn' onClick={openCreateGroupForm}>
							<FaPlus />
						</button>
						<button
							className='characters-groups-primary-modify-btn characters-groups-primary-modify-btn-reorder-groups'
							onClick={toggleIsReorderingGroups}
						>
							<FaSort />
						</button>
					</div>
				)}
			</div>
			<div className='characters-groups-group-item-container'>
				{!groups
					? null
					: groups.map((group, index) => (
							<button
								key={index}
								className={
									openGroup === index
										? "characters-groups-group-item characters-groups-group-item-active"
										: "characters-groups-group-item"
								}
								onClick={() => changeOpenGroup(index)}
							>
								{group?.data?.name}
							</button>
					  ))}
			</div>
			<CharactersCreateGroup />
		</div>
	);
};
