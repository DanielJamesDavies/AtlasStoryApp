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
import { DetailsItemLogic } from "./DetailsItemLogic";

// Context

// Services

// Styles
import "./DetailsItem.css";

// Assets

export const DetailsItem = ({
	detailsItem,
	index,
	isEditing,
	changeDetailsItemTitle,
	changeDetailsItemText,
	removeDetailsItem,
	isReorderingDetailsItems,
	locationImagesCurrDevItemIndex,
	openLocationImages,
}) => {
	const {
		locationImages,
		reorderDetailsItemImages,
		changeDetailsItemImageCaption,
		removeDevItemImage,
		onDetailsItemImageClick,
		devItemTextContainerClassName,
		devItemImagesContainerClassName,
	} = DetailsItemLogic({
		detailsItem,
		index,
		locationImagesCurrDevItemIndex,
		isEditing,
	});

	if (!isEditing)
		return (
			<div
				className={
					detailsItem?.text.join("").split(" ").join("").length !== 0 && detailsItem?.text.length === 1
						? "location-subpage-details-item location-subpage-details-item-has-single-line-text"
						: "location-subpage-details-item"
				}
			>
				<ContentItem hasBg={true}>
					<div className='location-subpage-details-item-title-container'>
						<div className='location-subpage-details-item-title'>{detailsItem?.title}</div>
					</div>
					{detailsItem?.text.join("").split(" ").join("").length === 0 ? null : (
						<div className={devItemTextContainerClassName}>
							<Text className='location-subpage-details-item-text-text' value={detailsItem?.text} />
						</div>
					)}
					{!detailsItem?.images || detailsItem?.images?.length === 0 ? null : (
						<div className={devItemImagesContainerClassName}>
							<div className='location-subpage-details-item-images'>
								{detailsItem.images.map((image, index) => (
									<div key={index} className='location-subpage-details-item-image-item'>
										{!locationImages.find((e) => e._id === image.image)?.image ? (
											<div className='location-subpage-details-item-image-item-placeholder'>
												<LoadingCircle center='true' />
											</div>
										) : (
											<img
												src={locationImages.find((e) => e._id === image.image).image}
												alt=''
												onClick={() => onDetailsItemImageClick(index)}
											/>
										)}
										{image.caption.split(" ").join("").length === 0 ? null : (
											<div className='location-subpage-details-item-image-item-caption'>{image.caption}</div>
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
		<div className='location-subpage-details-item'>
			<ContentItem hasBg={true}>
				<div className='location-subpage-details-item-content'>
					<div className='location-subpage-details-item-title-container'>
						<TextInput
							className='location-subpage-details-item-title'
							seamless={true}
							label='Title'
							value={detailsItem?.title}
							onChange={(e) => changeDetailsItemTitle(e, index)}
							aiTools={false}
						/>
					</div>
					<div className={devItemTextContainerClassName}>
						<MultiLineTextInput
							className='location-subpage-details-item-text'
							seamless={true}
							label='Content'
							value={detailsItem?.text.join("\n")}
							onChange={(e) => changeDetailsItemText(e, index)}
							aiTools={true}
						/>
					</div>
					<div className={devItemImagesContainerClassName}>
						{!detailsItem?.images || detailsItem?.images?.length === 0 ? null : (
							<DragDropContainer
								className='location-subpage-details-item-images'
								enableDragDrop={isReorderingDetailsItems}
								onDropItem={reorderDetailsItemImages}
							>
								{detailsItem.images.map((image, imageIndex) => (
									<DragDropItem key={imageIndex} index={imageIndex} className='location-subpage-details-item-image-item'>
										{!locationImages.find((e) => e._id === image.image)?.image ? null : (
											<img src={locationImages.find((e) => e._id === image.image).image} alt='' />
										)}
										<TextInput
											className='location-subpage-details-item-image-item-caption'
											seamless={true}
											autoResize={true}
											label='Caption'
											value={image.caption}
											onChange={(e) => changeDetailsItemImageCaption(e, imageIndex)}
										/>
										<div className='location-subpage-details-item-image-item-btns-container'>
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
				<div className='location-subpage-details-item-buttons-container'>
					<IconBtn icon={<FaTimes />} iconName='times' seamless={true} onClick={() => removeDetailsItem(index)} />
					<IconBtn icon={<FaImage />} iconName='image' iconSmall={<FaPlus />} seamless={true} onClick={() => openLocationImages(index)} />
				</div>
			</ContentItem>
		</div>
	);
};
