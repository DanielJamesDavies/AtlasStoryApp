// Packages

// Components
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../../components/DragDropItem/DragDropItem";
import { PlotItem } from "./PlotItem";

// Logic
import { PlotItemsLogic } from "./PlotItemsLogic";

// Context

// Services

// Styles
import "./PlotItems.css";

// Assets

export const PlotItems = ({ cluster, changeCluster, groupID }) => {
	const {
		isAuthorizedToEdit,
		unit,
		addPlotItem,
		isReorderingPlotItems,
		toggleIsReorderingPlotItems,
		reorderPlotItems,
		revertPlotItems,
		savePlotItems,
		removePlotItem,
		plotItemsContainerRef,
		plotItemsListRef,
		onPlotItemsListContainerScroll,
	} = PlotItemsLogic({
		cluster,
		changeCluster,
		groupID,
	});

	if (cluster === false) return null;

	if (cluster?.isAll)
		return (
			<div className='unit-page-subpage-plot-items-container unit-page-subpage-plot-items-container-all' ref={plotItemsContainerRef}>
				<div className='unit-page-subpage-plot-items-name'>{cluster?.name}</div>
				<EditableContainer
					className='unit-page-subpage-plot-items-list-container'
					isAuthorizedToEdit={isAuthorizedToEdit}
					onAdd={addPlotItem}
					onReorder={toggleIsReorderingPlotItems}
					onRevert={revertPlotItems}
					onSave={savePlotItems}
					onScroll={onPlotItemsListContainerScroll}
				>
					<div ref={plotItemsListRef} className='unit-page-subpage-plot-items-list'>
						{!unit?.data?.plot?.items
							? null
							: unit.data.plot.items.map((item, index) => (
									<div key={index} className='unit-page-subpage-plot-item-container'>
										<PlotItem
											item={item}
											removePlotItem={removePlotItem}
											addPlotItem={addPlotItem}
											cluster={cluster}
											groupID={groupID}
											isEditing={false}
										/>
									</div>
							  ))}
					</div>
					<DragDropContainer
						className='unit-page-subpage-plot-items-list'
						enableDragDrop={isReorderingPlotItems}
						onDropItem={reorderPlotItems}
						innerRef={plotItemsListRef}
					>
						{!unit?.data?.plot?.items
							? null
							: unit.data.plot.items.map((item, index) => (
									<DragDropItem key={index} index={index} className='unit-page-subpage-plot-item-container'>
										<PlotItem
											item={item}
											removePlotItem={removePlotItem}
											addPlotItem={addPlotItem}
											cluster={cluster}
											groupID={groupID}
											isEditing={true}
										/>
									</DragDropItem>
							  ))}
					</DragDropContainer>
				</EditableContainer>
			</div>
		);

	return (
		<div className='unit-page-subpage-plot-items-container' ref={plotItemsContainerRef}>
			<div className='unit-page-subpage-plot-items-name'>{cluster?.groups.find((e) => e._id === groupID)?.name}</div>
			<div className='unit-page-subpage-plot-items-description'>{cluster?.groups.find((e) => e._id === groupID)?.description}</div>
			<EditableContainer
				className='unit-page-subpage-plot-items-list-container'
				isAuthorizedToEdit={isAuthorizedToEdit}
				onRevert={revertPlotItems}
				onSave={savePlotItems}
				onScroll={onPlotItemsListContainerScroll}
			>
				<div ref={plotItemsListRef} className='unit-page-subpage-plot-items-list'>
					{!unit?.data?.plot?.items || !cluster?.groups
						? null
						: unit?.data?.plot?.items
								.filter((e) => cluster.groups.find((e) => e._id === groupID)?.items.includes(e._id))
								.map((item, index) => (
									<div key={index} className='unit-page-subpage-plot-item-container'>
										<PlotItem
											item={item}
											removePlotItem={removePlotItem}
											addPlotItem={addPlotItem}
											cluster={cluster}
											groupID={groupID}
											isEditing={false}
										/>
									</div>
								))}
				</div>
				<div ref={plotItemsListRef} className='unit-page-subpage-plot-items-list'>
					{!unit?.data?.plot?.items || !cluster?.groups
						? null
						: unit?.data?.plot?.items
								.filter((e) => cluster.groups.find((e) => e._id === groupID)?.items.includes(e._id))
								.map((item, index) => (
									<div key={index} className='unit-page-subpage-plot-item-container'>
										<PlotItem
											item={item}
											removePlotItem={removePlotItem}
											addPlotItem={addPlotItem}
											cluster={cluster}
											groupID={groupID}
											isEditing={true}
										/>
									</div>
								))}
				</div>
			</EditableContainer>
		</div>
	);
};
