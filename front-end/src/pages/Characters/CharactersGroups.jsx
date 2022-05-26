// Packages

// Components

// Logic
import { CharactersGroupsLogic } from "./CharactersGroupsLogic";

// Context

// Services

// Styles
import "./CharactersGroups.css";

// Assets

export const CharactersGroups = () => {
	const { groups, openGroup, changeOpenGroup } = CharactersGroupsLogic();

	return (
		<div className='characters-groups'>
			<div className='characters-groups-title'>Groups</div>
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
		</div>
	);
};
