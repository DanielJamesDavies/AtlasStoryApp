// Packages
import { FaPlus, FaTimes, FaImage } from "react-icons/fa";

// Components
import { ContentItem } from "../../../../../../components/ContentItem/ContentItem";
import { Text } from "../../../../../../components/Text/Text";
import { TextInput } from "../../../../../../components/TextInput/TextInput";
import { MultiLineTextInput } from "../../../../../../components/MultiLineTextInput/MultiLineTextInput";
import { IconBtn } from "../../../../../../components/IconBtn/IconBtn";
import { DragDropContainer } from "../../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../../components/DragDropItem/DragDropItem";
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
	removePlotItem,
	cluster,
	isEditing,
	openUnitImages,
	isReorderingPlotItems,
}) => {
	const {
		changeItemLabel,
		changeItemText,
		isDisplayingPlotItemAddToGroupMenu,
		showPlotItemAddToGroupMenu,
		hidePlotItemAddToGroupMenu,
		reorderItemImages,
		changeImageCaption,
		removeItemImage,
	} = PlotItemLogic({ item, plot_index });

	if (!isEditing)
		return (
			<div className='unit-page-subpage-plot-item'>
				<ContentItem hasBg={true}>
					<div className='unit-page-subpage-plot-item-label'>{item?.label}</div>
					<Text className='unit-page-subpage-plot-item-text' value={item?.text} />
					{item.images.length === 0 ? null : (
						<div className='unit-page-subpage-plot-item-images'>
							{item.images.map((image, imageIndex) => (
								<div key={imageIndex} className='unit-page-subpage-plot-item-image-item'>
									{!unitImages.find((e) => e._id === image.image)?.image ? null : (
										<img
											className='lightbox-openable-image'
											src={unitImages.find((e) => e._id === image.image).image}
											alt=''
											onClick={() => onPlotItemImageClick(item?._id, imageIndex)}
										/>
									)}
									{image.caption.split(" ").join("").length === 0 ? null : (
										<div className='unit-page-subpage-development-item-image-item-caption'>{image.caption}</div>
									)}
								</div>
							))}
						</div>
					)}
				</ContentItem>
			</div>
		);

	return (
		<div className='unit-page-subpage-plot-item'>
			<ContentItem hasBg={true}>
				<div className='unit-page-subpage-plot-item-content'>
					<TextInput
						className='unit-page-subpage-plot-item-label'
						seamless={true}
						label='Plot Item Label'
						value={item?.label}
						onChange={changeItemLabel}
						aiTools={false}
					/>
					<MultiLineTextInput
						className='unit-page-subpage-plot-item-text'
						seamless={true}
						label='Plot Item Text'
						value={item?.text.join("\n")}
						onChange={changeItemText}
						aiTools={true}
					/>
					{!item?.images || item?.images?.length === 0 ? null : (
						<DragDropContainer
							className='unit-page-subpage-plot-item-images'
							enableDragDrop={isReorderingPlotItems}
							onDropItem={reorderItemImages}
						>
							{!item?.images
								? null
								: item.images.map((image, imageIndex) => (
										<DragDropItem key={imageIndex} index={imageIndex} className='unit-page-subpage-plot-item-image-item'>
											{!unitImages.find((e) => e._id === image.image)?.image ? null : (
												<img src={unitImages.find((e) => e._id === image.image).image} alt='' />
											)}
											<TextInput
												className='unit-page-subpage-plot-item-image-item-caption'
												seamless={true}
												autoResize={true}
												label='Caption'
												value={image.caption}
												onChange={(e) => changeImageCaption(e, imageIndex)}
											/>
											<div className='unit-page-subpage-plot-item-image-item-btns-container'>
												<IconBtn
													icon={<FaTimes />}
													iconName='remove'
													seamless={true}
													size='s'
													onClick={() => removeItemImage(imageIndex)}
												/>
											</div>
										</DragDropItem>
								  ))}
						</DragDropContainer>
					)}
				</div>
				<div className='unit-page-subpage-plot-item-btns-container'>
					<IconBtn icon={<FaTimes />} iconName='times' seamless={true} size='s' onClick={() => removePlotItem(item._id)} />
					{!cluster?.isAll || item?.isUnsaved ? null : (
						<IconBtn icon={<FaPlus />} iconName='plus' seamless={true} size='s' onClick={() => showPlotItemAddToGroupMenu(item._id)} />
					)}
					<IconBtn icon={<FaImage />} iconName='image' iconSmall={<FaPlus />} seamless={true} onClick={() => openUnitImages(item?._id)} />
				</div>
				<PlotItemAddToGroupMenu
					itemID={item._id}
					cluster={cluster}
					isDisplayingPlotItemAddToGroupMenu={isDisplayingPlotItemAddToGroupMenu}
					hidePlotItemAddToGroupMenu={hidePlotItemAddToGroupMenu}
				/>
			</ContentItem>
		</div>
	);
};
