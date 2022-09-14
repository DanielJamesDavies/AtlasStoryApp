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
		substory,
		addPlotItem,
		isReorderingPlotItems,
		toggleIsReorderingPlotItems,
		reorderPlotItems,
		revertPlotItems,
		savePlotItems,
		removePlotItem,
	} = PlotItemsLogic({
		cluster,
		changeCluster,
		groupID,
	});

	if (cluster === false) return null;

	if (cluster?.isAll)
		return (
			<div className='substory-subpage-plot-items-container substory-subpage-plot-items-container-all'>
				<div className='substory-subpage-plot-items-name'>{cluster?.name}</div>
				<EditableContainer
					className='substory-subpage-plot-items-list'
					isAuthorizedToEdit={isAuthorizedToEdit}
					onAdd={addPlotItem}
					onReorder={toggleIsReorderingPlotItems}
					onRevert={revertPlotItems}
					onSave={savePlotItems}
				>
					<div className='substory-subpage-plot-clusters-list'>
						{!substory?.data?.plot?.items
							? null
							: substory.data.plot.items.map((item, index) => (
									<div key={index} className='substory-subpage-plot-item-container'>
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
						className='substory-subpage-plot-clusters-list'
						enableDragDrop={isReorderingPlotItems}
						onDropItem={reorderPlotItems}
					>
						{!substory?.data?.plot?.items
							? null
							: substory.data.plot.items.map((item, index) => (
									<DragDropItem key={index} index={index} className='substory-subpage-plot-item-container'>
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
		<div className='substory-subpage-plot-items-container'>
			<div className='substory-subpage-plot-items-name'>{cluster.groups.find((e) => e._id === groupID)?.name}</div>
			<div className='substory-subpage-plot-items-description'>{cluster.groups.find((e) => e._id === groupID)?.description}</div>
			<EditableContainer
				className='substory-subpage-plot-items-list'
				isAuthorizedToEdit={isAuthorizedToEdit}
				onRevert={revertPlotItems}
				onSave={savePlotItems}
			>
				<div className='substory-subpage-plot-items-list'>
					{cluster.groups
						.find((e) => e._id === groupID)
						?.items.map((itemID, index) => (
							<div key={index} className='substory-subpage-plot-item-container'>
								<PlotItem
									item={substory?.data?.plot?.items.find((e) => e._id === itemID)}
									removePlotItem={removePlotItem}
									addPlotItem={addPlotItem}
									cluster={cluster}
									groupID={groupID}
									isEditing={false}
								/>
							</div>
						))}
				</div>
				<div className='substory-subpage-plot-items-list'>
					{cluster.groups
						.find((e) => e._id === groupID)
						?.items.map((itemID, index) => (
							<div key={index} className='substory-subpage-plot-item-container'>
								<PlotItem
									item={substory?.data?.plot?.items.find((e) => e._id === itemID)}
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
