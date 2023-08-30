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
import { MiscellaneousItemLogic } from "./MiscellaneousItemLogic";

// Context

// Services

// Styles
import "./MiscellaneousItem.css";

// Assets

export const MiscellaneousItem = ({
	miscellaneousItem,
	index,
	isEditing,
	changeMiscellaneousItemTitle,
	changeMiscellaneousItemText,
	removeMiscellaneousItem,
	isReorderingMiscellaneousItems,
	locationImagesCurrDevItemIndex,
	openLocationImages,
}) => {
	const {
		locationImages,
		reorderMiscellaneousItemImages,
		changeMiscellaneousItemImageCaption,
		removeDevItemImage,
		onMiscellaneousItemImageClick,
		devItemTextContainerClassName,
		devItemImagesContainerClassName,
	} = MiscellaneousItemLogic({
		miscellaneousItem,
		index,
		locationImagesCurrDevItemIndex,
		isEditing,
	});

	if (!isEditing)
		return (
			<div
				className={
					miscellaneousItem?.text.join("").split(" ").join("").length !== 0 && miscellaneousItem?.text.length === 1
						? "location-subpage-miscellaneous-item location-subpage-miscellaneous-item-has-single-line-text"
						: "location-subpage-miscellaneous-item"
				}
			>
				<ContentItem hasBg={true}>
					<div className='location-subpage-miscellaneous-item-title-container'>
						<div className='location-subpage-miscellaneous-item-title'>{miscellaneousItem?.title}</div>
					</div>
					{miscellaneousItem?.text.join("").split(" ").join("").length === 0 ? null : (
						<div className={devItemTextContainerClassName}>
							<Text className='location-subpage-miscellaneous-item-text-text' value={miscellaneousItem?.text} />
						</div>
					)}
					{!miscellaneousItem?.images || miscellaneousItem?.images?.length === 0 ? null : (
						<div className={devItemImagesContainerClassName}>
							<div className='location-subpage-miscellaneous-item-images'>
								{miscellaneousItem.images.map((image, index) => (
									<div key={index} className='location-subpage-miscellaneous-item-image-item'>
										{!locationImages.find((e) => e._id === image.image)?.image ? (
											<div className='location-subpage-miscellaneous-item-image-item-placeholder'>
												<LoadingCircle center='true' />
											</div>
										) : (
											<img
												src={locationImages.find((e) => e._id === image.image).image}
												alt=''
												onClick={() => onMiscellaneousItemImageClick(index)}
											/>
										)}
										{image.caption.split(" ").join("").length === 0 ? null : (
											<div className='location-subpage-miscellaneous-item-image-item-caption'>{image.caption}</div>
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
		<div className='location-subpage-miscellaneous-item'>
			<ContentItem hasBg={true}>
				<div className='location-subpage-miscellaneous-item-content'>
					<div className='location-subpage-miscellaneous-item-title-container'>
						<TextInput
							className='location-subpage-miscellaneous-item-title'
							seamless={true}
							label='Title'
							value={miscellaneousItem?.title}
							onChange={(e) => changeMiscellaneousItemTitle(e, index)}
							aiTools={false}
						/>
					</div>
					<div className={devItemTextContainerClassName}>
						<MultiLineTextInput
							className='location-subpage-miscellaneous-item-text'
							seamless={true}
							label='Content'
							value={miscellaneousItem?.text.join("\n")}
							onChange={(e) => changeMiscellaneousItemText(e, index)}
							aiTools={true}
						/>
					</div>
					<div className={devItemImagesContainerClassName}>
						{!miscellaneousItem?.images || miscellaneousItem?.images?.length === 0 ? null : (
							<DragDropContainer
								className='location-subpage-miscellaneous-item-images'
								enableDragDrop={isReorderingMiscellaneousItems}
								onDropItem={reorderMiscellaneousItemImages}
							>
								{miscellaneousItem.images.map((image, imageIndex) => (
									<DragDropItem key={imageIndex} index={imageIndex} className='location-subpage-miscellaneous-item-image-item'>
										{!locationImages.find((e) => e._id === image.image)?.image ? null : (
											<img src={locationImages.find((e) => e._id === image.image).image} alt='' />
										)}
										<TextInput
											className='location-subpage-miscellaneous-item-image-item-caption'
											seamless={true}
											autoResize={true}
											label='Caption'
											value={image.caption}
											onChange={(e) => changeMiscellaneousItemImageCaption(e, imageIndex)}
										/>
										<div className='location-subpage-miscellaneous-item-image-item-btns-container'>
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
				<div className='location-subpage-miscellaneous-item-buttons-container'>
					<IconBtn icon={<FaTimes />} iconName='times' seamless={true} onClick={() => removeMiscellaneousItem(index)} />
					<IconBtn icon={<FaImage />} iconName='image' iconSmall={<FaPlus />} seamless={true} onClick={() => openLocationImages(index)} />
				</div>
			</ContentItem>
		</div>
	);
};