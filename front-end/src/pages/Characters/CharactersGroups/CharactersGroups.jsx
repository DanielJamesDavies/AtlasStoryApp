// Packages
import { FaPlus } from "react-icons/fa";

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
	const { isAuthorizedToModify, groups, openGroup, changeOpenGroup, openCreateGroupForm } = CharactersGroupsLogic();

	return (
		<div className='characters-groups'>
			<div className='characters-groups-primary'>
				<div className='characters-groups-primary-title'>Groups</div>
				{!isAuthorizedToModify ? null : (
					<button className='characters-group-primary-create-group-btn' onClick={openCreateGroupForm}>
						<FaPlus />
					</button>
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
