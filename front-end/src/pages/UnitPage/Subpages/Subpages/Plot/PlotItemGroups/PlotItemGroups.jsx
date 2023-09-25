// Packages

// Components
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../../components/DragDropItem/DragDropItem";
import { BtnListItem } from "../../../../../../components/BtnListItem/BtnListItem";

// Logic
import { PlotItemGroupsLogic } from "./PlotItemGroupsLogic";

// Context

// Services

// Styles
import "./PlotItemGroups.css";

// Assets
export const PlotItemGroups = ({ cluster, changeCluster, currGroupID, setGroupID, isDisplayingItemGroups, setIsDisplayingItemGroups }) => {
	const {
		isAuthorizedToEdit,
		addItemGroup,
		isReorderingItemGroups,
		toggleIsReorderingItemGroups,
		reorderItemGroups,
		revertItemGroups,
		saveItemGroups,
		onClickItemGroup,
		removeItemGroup,
		changeItemGroupName,
		plotItemGroupsRef,
		onPlotItemGroupsContainerScroll,
	} = PlotItemGroupsLogic({ cluster, changeCluster, setGroupID, setIsDisplayingItemGroups });

	if (cluster?.isAll) return null;
	return (
		<EditableContainer
			className={
				isDisplayingItemGroups
					? "unit-page-subpage-plot-item-groups-container unit-page-subpage-plot-item-groups-container-displaying"
					: "unit-page-subpage-plot-item-groups-container"
			}
			isAuthorizedToEdit={isAuthorizedToEdit}
			onAdd={addItemGroup}
			onReorder={toggleIsReorderingItemGroups}
			onRevert={revertItemGroups}
			onSave={saveItemGroups}
			onScroll={onPlotItemGroupsContainerScroll}
		>
			<div ref={plotItemGroupsRef} className='unit-page-subpage-plot-item-groups'>
				{!cluster?.groups ? null : (
					<div className='unit-page-subpage-plot-item-groups-list'>
						{cluster.groups.map((group, index) => (
							<div key={index} className='unit-page-subpage-plot-clusters-list-item-container'>
								<BtnListItem
									size='s'
									value={index + 1 + "\t" + group?.name}
									index={index}
									isActive={group._id === currGroupID}
									onClick={() => onClickItemGroup(group)}
								/>
							</div>
						))}
					</div>
				)}
			</div>
			<div ref={plotItemGroupsRef} className='unit-page-subpage-plot-item-groups'>
				{!cluster?.groups ? null : (
					<DragDropContainer
						className='unit-page-subpage-plot-item-groups-list'
						enableDragDrop={isReorderingItemGroups}
						onDropItem={reorderItemGroups}
					>
						{cluster.groups.map((group, index) => (
							<DragDropItem key={index} index={index} className='unit-page-subpage-plot-clusters-list-item-container'>
								<BtnListItem
									size='s'
									value={group?.name}
									index={index}
									isActive={group._id === currGroupID}
									onClick={() => onClickItemGroup(group)}
									onChange={(e) => changeItemGroupName(e, group)}
									onRemove={(e) => removeItemGroup(e, group)}
								/>
							</DragDropItem>
						))}
					</DragDropContainer>
				)}
			</div>
		</EditableContainer>
	);
};
