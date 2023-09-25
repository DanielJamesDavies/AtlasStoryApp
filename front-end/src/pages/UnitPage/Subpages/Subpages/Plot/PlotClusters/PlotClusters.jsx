// Packages

// Components
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../../components/DragDropItem/DragDropItem";
import { BtnListItem } from "../../../../../../components/BtnListItem/BtnListItem";

// Logic
import { PlotClustersLogic } from "./PlotClustersLogic";

// Context

// Services

// Styles
import "./PlotClusters.css";

// Assets

export const PlotClusters = ({ currCluster, switchCluster, isDisplayingClusters, setIsDisplayingClusters }) => {
	const {
		isAuthorizedToEdit,
		unit,
		addCluster,
		isReorderingClusters,
		toggleIsReorderingClusters,
		reorderClusters,
		revertClusters,
		saveClusters,
		onClickCluster,
		removeCluster,
		changeClusterName,
		plotClustersRef,
		onPlotClustersContainerScroll,
	} = PlotClustersLogic({ switchCluster, setIsDisplayingClusters });

	return (
		<EditableContainer
			className={
				isDisplayingClusters
					? "unit-page-subpage-plot-clusters-container unit-page-subpage-plot-clusters-container-displaying"
					: "unit-page-subpage-plot-clusters-container"
			}
			isAuthorizedToEdit={isAuthorizedToEdit}
			onAdd={addCluster}
			onReorder={toggleIsReorderingClusters}
			onRevert={revertClusters}
			onSave={saveClusters}
			onScroll={onPlotClustersContainerScroll}
		>
			<div ref={plotClustersRef} className='unit-page-subpage-plot-clusters'>
				{!unit?.data?.plot?.clusters ? null : (
					<div className='unit-page-subpage-plot-clusters-list'>
						{unit?.data?.plot?.clusters.map((cluster, index) => (
							<div key={index} className='unit-page-subpage-plot-clusters-list-item-container'>
								<BtnListItem
									value={cluster?.name}
									index={index}
									isActive={cluster._id === currCluster._id}
									onClick={() => onClickCluster(cluster)}
									size='s'
								/>
							</div>
						))}
					</div>
				)}
			</div>
			<div ref={plotClustersRef} className='unit-page-subpage-plot-clusters'>
				{!unit?.data?.plot?.clusters ? null : (
					<DragDropContainer
						className='unit-page-subpage-plot-clusters-list'
						enableDragDrop={isReorderingClusters}
						onDropItem={reorderClusters}
					>
						{unit?.data?.plot?.clusters.map((cluster, index) => (
							<DragDropItem key={index} index={index} className='unit-page-subpage-plot-clusters-list-item-container'>
								<BtnListItem
									value={cluster?.name}
									index={index}
									isActive={cluster._id === currCluster._id}
									onClick={() => onClickCluster(cluster)}
									onChange={(e) => changeClusterName(e, cluster)}
									onRemove={(e) => removeCluster(e, cluster)}
									size='s'
								/>
							</DragDropItem>
						))}
					</DragDropContainer>
				)}
			</div>
		</EditableContainer>
	);
};
