// Packages
import { FaPlus, FaSort } from "react-icons/fa";

// Components
import { IconBtn } from "../../../components/IconBtn/IconBtn";
import { DragDropContainer } from "../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../components/DragDropItem/DragDropItem";
import { CharactersCreateGroup } from "./CharactersCreateGroup";

// Logic
import { CharactersGroupsLogic } from "./CharactersGroupsLogic";

// Context

// Services

// Styles
import "./CharactersGroups.css";

// Assets

export const CharactersGroups = () => {
	const {
		isAuthorizedToEdit,
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
				{!isAuthorizedToEdit ? null : (
					<div className='characters-groups-primary-modify-buttons-container'>
						<IconBtn
							className='characters-groups-primary-modify-btn'
							seamless={true}
							icon={<FaPlus />}
							iconName='plus'
							onClick={openCreateGroupForm}
							label='Create Group'
						/>
						<IconBtn
							className='characters-groups-primary-modify-btn'
							seamless={true}
							icon={<FaSort />}
							iconName='sort'
							onClick={toggleIsReorderingGroups}
							label='Reorder Groups'
						/>
					</div>
				)}
			</div>
			{!story?.data?.groups || !groups ? (
				<div className='characters-groups-group-items-container'>
					<div className='characters-groups-group-item-placeholder'></div>
					<div className='characters-groups-group-item-placeholder'></div>
					<div className='characters-groups-group-item-placeholder'></div>
				</div>
			) : (
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
