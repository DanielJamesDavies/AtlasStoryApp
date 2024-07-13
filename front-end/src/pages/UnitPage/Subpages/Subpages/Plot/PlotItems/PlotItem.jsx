// Packages

// Components
import { EditableItem } from "../../../../../../components/EditableItem/EditableItem";
import { PlotItemAddToGroupMenu } from "./PlotItemAddToGroupMenu";

// Logic
import { PlotItemLogic } from "./PlotItemLogic";

// Context

// Services

// Styles
import "./PlotItem.css";

// Assets

export const PlotItem = ({
	item,
	plot_index,
	unitImages,
	onPlotItemImageClick,
	savePlotItem,
	revertPlotItem,
	removePlotItem,
	cluster,
	openUnitImages,
	isReorderingPlotItems,
	toggleIsReorderingPlotItems,
	isAuthorizedToEdit,
}) => {
	const {
		changeItemLabel,
		changeItemText,
		isDisplayingPlotItemAddToGroupMenu,
		toggleShowPlotItemAddToGroupMenu,
		hidePlotItemAddToGroupMenu,
		isReorderingImages,
		setIsReorderingImages,
		reorderItemImages,
		changeImageCaption,
		removeItemImage,
	} = PlotItemLogic({ item, plot_index, toggleIsReorderingPlotItems });

	return (
		<EditableItem
			className='unit-page-subpage-plot-item'
			items={
				cluster?.isAll
					? [
							{ type: "single-line-text", label: "Plot Item Label", value: item?.label, setValue: changeItemLabel },
							{ type: "multi-line-text", label: "Plot Item Text", value: item?.text, setValue: changeItemText },
							{
								type: "images",
								image_ids: item.images,
								images: unitImages,
								onClickImage: (i) => onPlotItemImageClick(item?._id, i),
								onRemoveImage: removeItemImage,
								onChangeCaption: changeImageCaption,
								isReordering: isReorderingImages,
								onReorder: reorderItemImages,
							},
					  ]
					: [
							{ type: "single-line-text", label: "Plot Item Label", value: item?.label },
							{ type: "multi-line-text", label: "Plot Item Text", value: item?.text },
							{
								type: "images",
								image_ids: item.images,
								images: unitImages,
								onClickImage: (i) => onPlotItemImageClick(item?._id, i),
							},
					  ]
			}
			buttons={
				cluster?.isAll
					? [
							{ event: "save", action: () => savePlotItem(item._id) },
							{ event: "revert", action: () => revertPlotItem(item._id) },
							{ event: "add", action: () => toggleShowPlotItemAddToGroupMenu(item._id), hide: !cluster?.isAll || item?.isUnsaved },
							{ event: "add-image", action: () => openUnitImages(item?._id) },
							{ event: "remove", action: () => removePlotItem(item._id) },
					  ]
					: [{ event: "remove", action: () => removePlotItem(item._id) }]
			}
			extraComponents={
				cluster?.isAll
					? [
							<PlotItemAddToGroupMenu
								itemID={item._id}
								cluster={cluster}
								isDisplayingPlotItemAddToGroupMenu={isDisplayingPlotItemAddToGroupMenu}
								hidePlotItemAddToGroupMenu={hidePlotItemAddToGroupMenu}
							/>,
					  ]
					: []
			}
			forceDisplayButtons={isDisplayingPlotItemAddToGroupMenu}
			forceHideButtons={isReorderingPlotItems}
			onLongHold={isReorderingPlotItems ? () => {} : toggleIsReorderingPlotItems}
			onImageLongHold={!cluster?.isAll || isReorderingPlotItems ? () => {} : () => setIsReorderingImages(true)}
			isAuthorizedToEdit={isAuthorizedToEdit}
			isEditable={cluster?.isAll}
		/>
	);
};
