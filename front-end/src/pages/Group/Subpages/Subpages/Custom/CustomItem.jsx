// Packages
import { FaImage, FaPlus, FaTimes } from "react-icons/fa";

// Components
import { DragDropContainer } from "../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../components/DragDropItem/DragDropItem";
import { ContentItem } from "../../../../../components/ContentItem/ContentItem";
import { Text } from "../../../../../components/Text/Text";
import { TextInput } from "../../../../../components/TextInput/TextInput";
import { MultiLineTextInput } from "../../../../../components/MultiLineTextInput/MultiLineTextInput";
import { IconBtn } from "../../../../../components/IconBtn/IconBtn";
import { LoadingCircle } from "../../../../../components/LoadingCircle/LoadingCircle";

// Logic
import { CustomItemLogic } from "./CustomItemLogic";

// Context

// Services

// Styles
import "./CustomItem.css";

// Assets

export const CustomItem = ({
	customItem,
	index,
	isEditing,
	changeCustomItemTitle,
	changeCustomItemText,
	removeCustomItem,
	isReorderingCustomItems,
	groupImagesCurrDevItemIndex,
	openGroupImages,
}) => {
	const {
		groupImages,
		reorderCustomItemImages,
		changeCustomItemImageCaption,
		removeDevItemImage,
		onCustomItemImageClick,
		devItemTextContainerClassName,
		devItemImagesContainerClassName,
	} = CustomItemLogic({
		customItem,
		index,
		groupImagesCurrDevItemIndex,
		isEditing,
	});

	if (!isEditing)
		return (
			<div
				className={
					customItem?.text.join("").split(" ").join("").length !== 0 && customItem?.text.length === 1
						? "group-subpage-custom-item group-subpage-custom-item-has-single-line-text"
						: "group-subpage-custom-item"
				}
			>
				<ContentItem hasBg={true}>
					<div className='group-subpage-custom-item-title-container'>
						<div className='group-subpage-custom-item-title'>{customItem?.title}</div>
					</div>
					{customItem?.text.join("").split(" ").join("").length === 0 ? null : (
						<div className={devItemTextContainerClassName}>
							<Text className='group-subpage-custom-item-text-text' value={customItem?.text} />
						</div>
					)}
					{!customItem?.images || customItem?.images?.length === 0 ? null : (
						<div className={devItemImagesContainerClassName}>
							<div className='group-subpage-custom-item-images'>
								{customItem.images.map((image, index) => (
									<div key={index} className='group-subpage-custom-item-image-item'>
										{!groupImages.find((e) => e._id === image.image)?.image ? (
											<div className='group-subpage-custom-item-image-item-placeholder'>
												<LoadingCircle center='true' />
											</div>
										) : (
											<img
												src={groupImages.find((e) => e._id === image.image).image}
												alt=''
												onClick={() => onCustomItemImageClick(index)}
											/>
										)}
										{image.caption.split(" ").join("").length === 0 ? null : (
											<div className='group-subpage-custom-item-image-item-caption'>{image.caption}</div>
										)}
									</div>
								))}
							</div>
						</div>
					)}
				</ContentItem>
			</div>
		);

	return (
		<div className='group-subpage-custom-item'>
			<ContentItem hasBg={true}>
				<div className='group-subpage-custom-item-content'>
					<div className='group-subpage-custom-item-title-container'>
						<TextInput
							className='group-subpage-custom-item-title'
							seamless={true}
							label='Title'
							value={customItem?.title}
							onChange={(e) => changeCustomItemTitle(e, index)}
							aiTools={false}
						/>
					</div>
					<div className={devItemTextContainerClassName}>
						<MultiLineTextInput
							className='group-subpage-custom-item-text'
							seamless={true}
							label='Content'
							value={customItem?.text.join("\n")}
							onChange={(e) => changeCustomItemText(e, index)}
							aiTools={true}
						/>
					</div>
					<div className={devItemImagesContainerClassName}>
						{!customItem?.images || customItem?.images?.length === 0 ? null : (
							<DragDropContainer
								className='group-subpage-custom-item-images'
								enableDragDrop={isReorderingCustomItems}
								onDropItem={reorderCustomItemImages}
							>
								{customItem.images.map((image, imageIndex) => (
									<DragDropItem key={imageIndex} index={imageIndex} className='group-subpage-custom-item-image-item'>
										{!groupImages.find((e) => e._id === image.image)?.image ? null : (
											<img src={groupImages.find((e) => e._id === image.image).image} alt='' />
										)}
										<TextInput
											className='group-subpage-custom-item-image-item-caption'
											seamless={true}
											autoResize={true}
											label='Caption'
											value={image.caption}
											onChange={(e) => changeCustomItemImageCaption(e, imageIndex)}
										/>
										<div className='group-subpage-custom-item-image-item-btns-container'>
											<IconBtn
												icon={<FaTimes />}
												iconName='remove'
												seamless={true}
												size='s'
												onClick={() => removeDevItemImage(imageIndex)}
											/>
										</div>
									</DragDropItem>
								))}
							</DragDropContainer>
						)}
					</div>
				</div>
				<div className='group-subpage-custom-item-buttons-container'>
					<IconBtn icon={<FaTimes />} iconName='times' seamless={true} onClick={() => removeCustomItem(index)} />
					<IconBtn icon={<FaImage />} iconName='image' iconSmall={<FaPlus />} seamless={true} onClick={() => openGroupImages(index)} />
				</div>
			</ContentItem>
		</div>
	);
};
