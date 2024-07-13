// Packages
import { FaPlus } from "react-icons/fa";

// Components
import { DragDropContainer } from "../../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../../components/DragDropItem/DragDropItem";
import { UnitImages } from "../../../UnitImages/UnitImages";
import { PlotItem } from "./PlotItem";

// Logic
import { PlotItemsLogic } from "./PlotItemsLogic";

// Context

// Services

// Styles
import "./PlotItems.css";

// Assets

export const PlotItems = ({ cluster, changeCluster, groupID, isDisplayingClusters, toggleIsDisplayingClusters }) => {
	const {
		isAuthorizedToEdit,
		unit,
		addPlotItem,
		isReorderingPlotItems,
		toggleIsReorderingPlotItems,
		reorderPlotItems,
		revertPlotItem,
		savePlotItem,
		removePlotItem,
		plotItemsContainerRef,
		plotItemsListRef,
		unitImagesCurrPlotItemID,
		openUnitImages,
		closeUnitImages,
		addImageToPlotItem,
		unitImages,
		onPlotItemImageClick,
	} = PlotItemsLogic({
		cluster,
		changeCluster,
		groupID,
	});

	if (cluster === false) return null;

	if (cluster?.isAll)
		return (
			<div className='unit-page-subpage-plot-items-container unit-page-subpage-plot-items-container-all' ref={plotItemsContainerRef}>
				<div className='unit-page-subpage-plot-items-name-container'>
					<div className='unit-page-subpage-plot-items-name'>{cluster?.name}</div>
					<button
						className={
							isDisplayingClusters
								? "unit-page-subpage-plot-navigation-bar-btn unit-page-subpage-plot-navigation-bar-btn-active"
								: "unit-page-subpage-plot-navigation-bar-btn"
						}
						onClick={toggleIsDisplayingClusters}
					>
						Clusters
					</button>
				</div>
				<DragDropContainer
					className='unit-page-subpage-plot-items-list'
					enableDragDrop={isReorderingPlotItems}
					onDropItem={reorderPlotItems}
					innerRef={plotItemsListRef}
					includeVerticalDrag={true}
					absoluteVerticalDrag={true}
				>
					{!unit?.data?.plot?.items
						? null
						: unit.data.plot.items.map((item, index) => (
								<DragDropItem
									key={index}
									index={index}
									className={"unit-page-subpage-plot-item-container unit-page-subpage-plot-item-container-" + index}
								>
									<PlotItem
										item={item}
										plot_index={unit.data.plot.items.findIndex((e) => e?._id === item?._id)}
										unitImages={unitImages}
										onPlotItemImageClick={onPlotItemImageClick}
										savePlotItem={savePlotItem}
										revertPlotItem={revertPlotItem}
										removePlotItem={removePlotItem}
										addPlotItem={addPlotItem}
										cluster={cluster}
										groupID={groupID}
										openUnitImages={openUnitImages}
										isReorderingPlotItems={isReorderingPlotItems}
										toggleIsReorderingPlotItems={toggleIsReorderingPlotItems}
										isAuthorizedToEdit={isAuthorizedToEdit}
									/>
								</DragDropItem>
						  ))}
				</DragDropContainer>
				<div className='unit-page-subpage-plot-items-add-plot-item-btn-container'>
					<button className='unit-page-subpage-plot-items-add-plot-item-btn' onClick={addPlotItem}>
						<FaPlus />
						<span>Add Plot Item</span>
					</button>
				</div>
				{unitImagesCurrPlotItemID === -1 ? null : <UnitImages onAddImage={addImageToPlotItem} onClose={closeUnitImages} />}
			</div>
		);

	return (
		<div className='unit-page-subpage-plot-items-container' ref={plotItemsContainerRef}>
			<div className='unit-page-subpage-plot-items-name'>{cluster?.groups.find((e) => e._id === groupID)?.name}</div>
			<div className='unit-page-subpage-plot-items-description'>{cluster?.groups.find((e) => e._id === groupID)?.description}</div>
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
										unitImages={unitImages}
										onPlotItemImageClick={onPlotItemImageClick}
										isAuthorizedToEdit={isAuthorizedToEdit}
									/>
								</div>
							))}
			</div>
			{unitImagesCurrPlotItemID === -1 ? null : <UnitImages onAddImage={addImageToPlotItem} onClose={closeUnitImages} />}
		</div>
	);
};
