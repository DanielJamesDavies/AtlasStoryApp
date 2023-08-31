// Packages
import { FaImage, FaPlus, FaTimes } from "react-icons/fa";

// Components
import { DragDropContainer } from "../../../../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../../../../components/DragDropItem/DragDropItem";
import { ContentItem } from "../../../../../../../../components/ContentItem/ContentItem";
import { Text } from "../../../../../../../../components/Text/Text";
import { TextInput } from "../../../../../../../../components/TextInput/TextInput";
import { MultiLineTextInput } from "../../../../../../../../components/MultiLineTextInput/MultiLineTextInput";
import { IconBtn } from "../../../../../../../../components/IconBtn/IconBtn";
import { LoadingCircle } from "../../../../../../../../components/LoadingCircle/LoadingCircle";

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
		isEditing,
	});

	if (!isEditing)
		return (
			<div
				className={
					miscellaneousItem?.text.join("").split(" ").join("").length !== 0 && miscellaneousItem?.text.length === 1
						? "locations-location-miscellaneous-item locations-location-miscellaneous-item-has-single-line-text"
						: "locations-location-miscellaneous-item"
				}
			>
				<ContentItem hasBg={true}>
					<div className='locations-location-miscellaneous-item-title-container'>
						<div className='locations-location-miscellaneous-item-title'>{miscellaneousItem?.title}</div>
					</div>
					{miscellaneousItem?.text.join("").split(" ").join("").length === 0 ? null : (
						<div className={devItemTextContainerClassName}>
							<Text className='locations-location-miscellaneous-item-text-text' value={miscellaneousItem?.text} />
						</div>
					)}
					{!miscellaneousItem?.images || miscellaneousItem?.images?.length === 0 ? null : (
						<div className={devItemImagesContainerClassName}>
							<div className='locations-location-miscellaneous-item-images'>
								{miscellaneousItem.images.map((image, index) => (
									<div key={index} className='locations-location-miscellaneous-item-image-item'>
										{!locationImages.find((e) => e._id === image.image)?.image ? (
											<div className='locations-location-miscellaneous-item-image-item-placeholder'>
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
											<div className='locations-location-miscellaneous-item-image-item-caption'>{image.caption}</div>
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
		<div className='locations-location-miscellaneous-item'>
			<ContentItem hasBg={true}>
				<div className='locations-location-miscellaneous-item-content'>
					<div className='locations-location-miscellaneous-item-title-container'>
						<TextInput
							className='locations-location-miscellaneous-item-title'
							seamless={true}
							label='Miscellaneous Item Title'
							value={miscellaneousItem?.title}
							onChange={(e) => changeMiscellaneousItemTitle(e, index)}
							aiTools={true}
						/>
					</div>
					<div className={devItemTextContainerClassName}>
						<MultiLineTextInput
							className='locations-location-miscellaneous-item-text'
							seamless={true}
							label='Miscellaneous Item Text'
							value={miscellaneousItem?.text.join("\n")}
							onChange={(e) => changeMiscellaneousItemText(e, index)}
							aiTools={true}
						/>
					</div>
					<div className={devItemImagesContainerClassName}>
						{!miscellaneousItem?.images || miscellaneousItem?.images?.length === 0 ? null : (
							<DragDropContainer
								className='locations-location-miscellaneous-item-images'
								enableDragDrop={isReorderingMiscellaneousItems}
								onDropItem={reorderMiscellaneousItemImages}
							>
								{miscellaneousItem.images.map((image, imageIndex) => (
									<DragDropItem key={imageIndex} index={imageIndex} className='locations-location-miscellaneous-item-image-item'>
										{!locationImages.find((e) => e._id === image.image)?.image ? null : (
											<img src={locationImages.find((e) => e._id === image.image).image} alt='' />
										)}
										<TextInput
											className='locations-location-miscellaneous-item-image-item-caption'
											seamless={true}
											autoResize={true}
											label='Caption'
											value={image.caption}
											onChange={(e) => changeMiscellaneousItemImageCaption(e, imageIndex)}
										/>
										<div className='locations-location-miscellaneous-item-image-item-btns-container'>
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
				<div className='locations-location-miscellaneous-item-buttons-container'>
					<IconBtn icon={<FaTimes />} iconName='times' seamless={true} onClick={() => removeMiscellaneousItem(index)} />
					<IconBtn icon={<FaImage />} iconName='image' iconSmall={<FaPlus />} seamless={true} onClick={() => {}} />
				</div>
			</ContentItem>
		</div>
	);
};
