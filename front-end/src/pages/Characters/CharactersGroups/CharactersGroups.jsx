// Packages
import { FaPlus, FaSort } from "react-icons/fa";

// Components
import { CharactersCreateGroup } from "./CharactersCreateGroup/CharactersCreateGroup";
import { IconBtn } from "../../../components/IconBtn/IconBtn";
import { BtnListContainer } from "../../../components/BtnListContainer/BtnListContainer";
import { DragDropContainer } from "../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../components/DragDropItem/DragDropItem";
import { ContentItem } from "../../../components/ContentItem/ContentItem";
import { BtnListItem } from "../../../components/BtnListItem/BtnListItem";

// Logic
import { CharactersGroupsLogic } from "./CharactersGroupsLogic";

// Context

// Services

// Styles
import "./CharactersGroups.css";
import { FirstAddButton } from "../../../components/FirstAddButton/FirstAddButton";

// Assets

export const CharactersGroups = () => {
	const {
		isAuthorizedToEdit,
		authorized_user_id,
		story,
		storyGroups,
		group,
		changeGroup,
		openCreateGroupForm,
		isReorderingGroups,
		toggleIsReorderingGroups,
		changeGroupsOrder,
		activeGroupColour,
		activeGroupColourTint,
	} = CharactersGroupsLogic();

	return (
		<div
			className={
				story?.data?.groups?.length === 0 && story?.data?.members.findIndex((e) => e?.user_id === authorized_user_id) !== -1
					? "characters-groups-container characters-groups-container-no-groups"
					: "characters-groups-container"
			}
			style={{
				"--characters-groups-active-group-colour": !activeGroupColour
					? !story?.data?.colour
						? "#0044ff"
						: story?.data?.colour
					: activeGroupColour,
				"--characters-groups-active-group-colour-tint": !activeGroupColourTint
					? !story?.data?.colour
						? "#0044ff"
						: story?.data?.colour
					: activeGroupColourTint,
			}}
		>
			<ContentItem className='characters-groups'>
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
				{story?.data?.groups?.length === 0 && story?.data?.members.findIndex((e) => e?.user_id === authorized_user_id) !== -1 ? (
					<div className='characters-groups-add-first-group-container'>
						<FirstAddButton label='Create Character Group' onClick={openCreateGroupForm} />
					</div>
				) : !story?.data?.groups || !storyGroups ? (
					<div className='characters-groups-group-items-container characters-groups-group-items-container-placeholder'>
						<BtnListItem />
						<BtnListItem />
						<BtnListItem />
						<BtnListItem />
						<BtnListItem />
					</div>
				) : (
					<BtnListContainer>
						<DragDropContainer
							className='characters-groups-group-items-container'
							inlineItems={false}
							enableDragDrop={isReorderingGroups}
							onDropItem={changeGroupsOrder}
						>
							{story.data.groups.map((groupID, index) => (
								<DragDropItem
									key={index}
									index={index}
									dragDropListId='characters-groups-group-items'
									className='characters-groups-group-item-container'
								>
									<BtnListItem
										value={storyGroups.find((e) => e._id === groupID)?.data?.name}
										index={index}
										isActive={group._id === groupID}
										hasFoundActive={group?._id !== undefined}
										onClick={(e) => (e?.button === 2 ? null : changeGroup(groupID))}
									/>
								</DragDropItem>
							))}
						</DragDropContainer>
					</BtnListContainer>
				)}
				<CharactersCreateGroup />
			</ContentItem>
		</div>
	);
};
