// Packages
import { FaPlus, FaSort } from "react-icons/fa";

// Components
import { CharactersCreateGroup } from "./CharactersCreateGroup";
import { DragDropContainer } from "../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../components/DragDropItem/DragDropItem";

// Logic
import { CharactersGroupsLogic } from "./CharactersGroupsLogic";

// Context

// Services

// Styles
import "./CharactersGroups.css";

// Assets

export const CharactersGroups = () => {
	const {
		isAuthorizedToModify,
		story,
		groups,
		group,
		changeGroup,
		openCreateGroupForm,
		isReorderingGroups,
		toggleIsReorderingGroups,
		changeGroupsOrder,
	} = CharactersGroupsLogic();

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
			{!story?.data?.groups || !groups ? null : (
				<DragDropContainer
					className='characters-groups-group-items-container'
					inlineItems={false}
					enableDragDrop={isReorderingGroups}
					onDropItem={changeGroupsOrder}
				>
					{story.data.groups.map((groupID, index) => (
						<DragDropItem key={index} index={index} className='characters-groups-group-item-container'>
							<button
								className={
									group._id === groupID
										? "characters-groups-group-item characters-groups-group-item-active"
										: "characters-groups-group-item"
								}
								onClick={() => changeGroup(groupID)}
							>
								{groups.find((e) => e._id === groupID)?.data?.name}
							</button>
						</DragDropItem>
					))}
				</DragDropContainer>
			)}
			<CharactersCreateGroup />
		</div>
	);
};
