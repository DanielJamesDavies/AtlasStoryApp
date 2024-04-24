// Packages

// Components
import { GroupsItem } from "./GroupsItem/GroupsItem";
import { EditableContainer } from "../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../components/DragDropItem/DragDropItem";

// Logic
import { GroupsLogic } from "./GroupsLogic";

// Context

// Services

// Styles
import "./Groups.css";

// Assets

export const Groups = () => {
	const {
		isAuthorizedToEdit,
		story,
		storyGroups,
		revertGroups,
		saveGroups,
		toggleIsReorderingRelationshipsGroups,
		isReorderingRelationshipsGroups,
		changeRelationshipsGroupsOrder,
	} = GroupsLogic();

	if (!story?.data?.characterRelationshipsGroups) return null;
	return (
		<div className='characters-relationship-info-home-groups-container'>
			<div className='characters-relationship-info-home-groups-title'>Groups</div>
			<EditableContainer
				className='characters-relationship-info-home-groups-items-container'
				isAuthorizedToEdit={isAuthorizedToEdit}
				onReorder={toggleIsReorderingRelationshipsGroups}
				onRevert={revertGroups}
				onSave={saveGroups}
			>
				<div className='characters-relationship-info-home-groups-items'>
					{story?.data?.characterRelationshipsGroups?.map((group, index) => (
						<GroupsItem
							key={index}
							group={storyGroups?.find((e) => e?._id === group?._id)}
							isEditing={false}
							reversed={group?.reversed}
						/>
					))}
				</div>
				<DragDropContainer
					className='characters-relationship-info-home-groups-items'
					enableDragDrop={isReorderingRelationshipsGroups}
					onDropItem={changeRelationshipsGroupsOrder}
				>
					{story?.data?.characterRelationshipsGroups?.map((group, index) => (
						<DragDropItem key={index} index={index}>
							<GroupsItem group={storyGroups?.find((e) => e?._id === group?._id)} isEditing={true} reversed={group?.reversed} />
						</DragDropItem>
					))}
				</DragDropContainer>
			</EditableContainer>
		</div>
	);
};
