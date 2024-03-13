// Packages
import { FaPlus, FaSort, FaUserPlus } from "react-icons/fa";

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
		openCreateCharacterForm,
		navigateToGroup,
		toggleIsReorderingCharacters,
	} = CharactersGroupsLogic();

	return (
		<div
			className={
				story?.data?.groups?.length === 0 && story?.data?.members.findIndex((e) => e?.user_id === authorized_user_id) !== -1
					? "characters-groups-container characters-groups-container-no-groups"
					: "characters-groups-container"
			}
		>
			<ContentItem className='characters-groups'>
				{!isAuthorizedToEdit ? null : (
					<div className='characters-groups-modify-buttons-container'>
						<IconBtn
							className='characters-groups-modify-btn'
							seamless={true}
							icon={<FaPlus />}
							iconName='plus'
							onClick={openCreateGroupForm}
							label='Create Group'
						/>
						<IconBtn
							className='characters-groups-modify-btn'
							seamless={true}
							icon={<FaSort />}
							iconName='sort'
							onClick={toggleIsReorderingGroups}
							label='Reorder Groups'
						/>
					</div>
				)}
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
									className={
										"characters-groups-group-item-container" +
										(group._id === groupID ? " characters-groups-group-item-container-active" : "")
									}
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
				<div className='characters-group-primary'>
					<div
						className={
							isAuthorizedToEdit
								? "characters-group-primary-buttons-container characters-group-primary-buttons-container-authorized-to-edit"
								: "characters-group-primary-buttons-container"
						}
					>
						{!group?.uid ? null : (
							<button
								className='characters-group-primary-open-group-btn'
								onClick={navigateToGroup}
								onAuxClick={navigateToGroup}
								onMouseDown={(e) => e.preventDefault()}
							>
								Open Group
							</button>
						)}
						{!isAuthorizedToEdit ? null : (
							<div className='characters-group-primary-modify-btns-container'>
								<IconBtn
									className='characters-group-primary-modify-btn'
									seamless={true}
									icon={<FaUserPlus />}
									iconName='user-plus'
									label='Create Character'
									onClick={openCreateCharacterForm}
								/>
								<IconBtn
									className='characters-group-primary-modify-btn'
									seamless={true}
									icon={<FaSort />}
									iconName='sort'
									label='Reorder Characters'
									onClick={toggleIsReorderingCharacters}
								/>
							</div>
						)}
					</div>
				</div>
				<CharactersCreateGroup />
			</ContentItem>
		</div>
	);
};
