// Packages

// Components
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../../components/DragDropItem/DragDropItem";
import { PlotItemGroupBtn } from "./PlotItemGroupBtn";

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
					? "substory-subpage-plot-item-groups-container substory-subpage-plot-item-groups-container-displaying"
					: "substory-subpage-plot-item-groups-container"
			}
			isAuthorizedToEdit={isAuthorizedToEdit}
			onAdd={addItemGroup}
			onReorder={toggleIsReorderingItemGroups}
			onRevert={revertItemGroups}
			onSave={saveItemGroups}
			onScroll={onPlotItemGroupsContainerScroll}
		>
			<div ref={plotItemGroupsRef} className='substory-subpage-plot-item-groups'>
				{!cluster?.groups ? null : (
					<div className='substory-subpage-plot-item-groups-list'>
						{cluster.groups.map((group, index) => (
							<div key={index}>
								<PlotItemGroupBtn
									group={group}
									index={index}
									currGroupID={currGroupID}
									onClickItemGroup={onClickItemGroup}
									removeItemGroup={removeItemGroup}
									changeItemGroupName={changeItemGroupName}
									isEditing={false}
								/>
							</div>
						))}
					</div>
				)}
			</div>
			<div ref={plotItemGroupsRef} className='substory-subpage-plot-item-groups'>
				{!cluster?.groups ? null : (
					<DragDropContainer
						className='substory-subpage-plot-item-groups-list'
						enableDragDrop={isReorderingItemGroups}
						onDropItem={reorderItemGroups}
					>
						{cluster.groups.map((group, index) => (
							<DragDropItem key={index} index={index}>
								<PlotItemGroupBtn
									group={group}
									index={index}
									currGroupID={currGroupID}
									onClickItemGroup={onClickItemGroup}
									removeItemGroup={removeItemGroup}
									changeItemGroupName={changeItemGroupName}
									isEditing={true}
								/>
							</DragDropItem>
						))}
					</DragDropContainer>
				)}
			</div>
		</EditableContainer>
	);
};
