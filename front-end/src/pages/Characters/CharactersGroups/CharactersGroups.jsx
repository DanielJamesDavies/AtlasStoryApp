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

// Assets

export const CharactersGroups = () => {
	const {
		isAuthorizedToEdit,
		story,
		storyGroups,
		group,
		changeGroup,
		openCreateGroupForm,
		isReorderingGroups,
		toggleIsReorderingGroups,
		changeGroupsOrder,
	} = CharactersGroupsLogic();

	return (
		<div
			className='characters-groups-container'
			style={{
				"--characters-groups-active-group-colour": !group?.data?.colour
					? !story?.data?.colour
						? "#0044ff"
						: story?.data?.colour
					: group?.data?.colour,
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
				{!story?.data?.groups || !storyGroups ? (
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
