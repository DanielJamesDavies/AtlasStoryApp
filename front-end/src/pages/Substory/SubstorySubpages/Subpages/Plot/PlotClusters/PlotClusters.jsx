// Packages

// Components
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../../components/DragDropItem/DragDropItem";
import { PlotClusterBtn } from "./PlotClusterBtn";

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
		substory,
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
					? "substory-subpage-plot-clusters-container substory-subpage-plot-clusters-container-displaying"
					: "substory-subpage-plot-clusters-container"
			}
			isAuthorizedToEdit={isAuthorizedToEdit}
			onAdd={addCluster}
			onReorder={toggleIsReorderingClusters}
			onRevert={revertClusters}
			onSave={saveClusters}
			onScroll={onPlotClustersContainerScroll}
		>
			<div ref={plotClustersRef} className='substory-subpage-plot-clusters'>
				{!substory?.data?.plot?.clusters ? null : (
					<div className='substory-subpage-plot-clusters-list'>
						{substory?.data?.plot?.clusters.map((cluster, index) => (
							<div key={index}>
								<PlotClusterBtn
									cluster={cluster}
									currCluster={currCluster}
									onClickCluster={onClickCluster}
									removeCluster={removeCluster}
									changeClusterName={changeClusterName}
									isEditing={false}
								/>
							</div>
						))}
					</div>
				)}
			</div>
			<div ref={plotClustersRef} className='substory-subpage-plot-clusters'>
				{!substory?.data?.plot?.clusters ? null : (
					<DragDropContainer
						className='substory-subpage-plot-clusters-list'
						enableDragDrop={isReorderingClusters}
						onDropItem={reorderClusters}
					>
						{substory?.data?.plot?.clusters.map((cluster, index) => (
							<DragDropItem key={index} index={index}>
								<PlotClusterBtn
									cluster={cluster}
									currCluster={currCluster}
									onClickCluster={onClickCluster}
									removeCluster={removeCluster}
									changeClusterName={changeClusterName}
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
