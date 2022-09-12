// Packages
import { FaImage, FaPlus, FaTimes } from "react-icons/fa";

// Components
import { DragDropContainer } from "../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../components/DragDropItem/DragDropItem";
import { Text } from "../../../../../components/Text/Text";
import { TextInput } from "../../../../../components/TextInput/TextInput";
import { MultiLineTextInput } from "../../../../../components/MultiLineTextInput/MultiLineTextInput";
import { IconBtn } from "../../../../../components/IconBtn/IconBtn";

// Logic
import { DevelopmentItemLogic } from "./DevelopmentItemLogic";

// Context

// Services

// Styles
import "./DevelopmentItem.css";

// Assets

export const DevelopmentItem = ({
	developmentItem,
	index,
	isEditing,
	changeDevelopmentItemTitle,
	changeDevelopmentItemValue,
	removeDevelopmentItem,
	isReorderingDevelopmentItems,
	characterImagesCurrDevItemIndex,
	openCharacterImages,
}) => {
	const {
		characterImages,
		reorderDevelopmentItemImages,
		changeDevelopmentItemImageCaption,
		removeDevItemImage,
		onDevelopmentItemImageClick,
		devItemTextContainerClassName,
		devItemImagesContainerClassName,
	} = DevelopmentItemLogic({
		developmentItem,
		index,
		characterImagesCurrDevItemIndex,
		isEditing,
	});

	if (!isEditing)
		return (
			<div className='character-subpage-development-item'>
				<div className='character-subpage-development-item-title-container'>
					<div className='character-subpage-development-item-title'>{developmentItem?.title}</div>
				</div>
				<div className={devItemTextContainerClassName}>
					<Text className='character-subpage-development-item-text-value' value={developmentItem?.value} />
				</div>
				{!developmentItem?.images || developmentItem?.images?.length === 0 ? null : (
					<div className={devItemImagesContainerClassName}>
						<div className='character-subpage-development-item-images'>
							{developmentItem.images.map((image, index) => (
								<div key={index} className='character-subpage-development-item-image-item'>
									{!characterImages.find((e) => e._id === image.image)?.image ? null : (
										<img
											src={characterImages.find((e) => e._id === image.image).image}
											alt=''
											onClick={() => onDevelopmentItemImageClick(index)}
										/>
									)}
									{image.caption.split(" ").join("").length === 0 ? null : (
										<div className='character-subpage-development-item-image-item-caption'>{image.caption}</div>
									)}
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		);

	return (
		<div className='character-subpage-development-item'>
			<div className='character-subpage-development-item-content'>
				<div className='character-subpage-development-item-title-container'>
					<TextInput
						className='character-subpage-development-item-title'
						seamless={true}
						label='Development Item Title'
						value={developmentItem?.title}
						onChange={(e) => changeDevelopmentItemTitle(e, index)}
					/>
				</div>
				<div className={devItemTextContainerClassName}>
					<MultiLineTextInput
						className='character-subpage-development-item-value'
						seamless={true}
						label='Development Item Value'
						value={developmentItem?.value.join("\n")}
						onChange={(e) => changeDevelopmentItemValue(e, index)}
					/>
				</div>
				<div className={devItemImagesContainerClassName}>
					<DragDropContainer
						className='character-subpage-development-item-images'
						enableDragDrop={isReorderingDevelopmentItems}
						onDropItem={reorderDevelopmentItemImages}
					>
						{!developmentItem?.images
							? null
							: developmentItem.images.map((image, imageIndex) => (
									<DragDropItem key={imageIndex} index={imageIndex} className='character-subpage-development-item-image-item'>
										{!characterImages.find((e) => e._id === image.image)?.image ? null : (
											<img src={characterImages.find((e) => e._id === image.image).image} alt='' />
										)}
										<TextInput
											className='character-subpage-development-item-image-item-caption'
											seamless={true}
											autoResize={true}
											label='Caption'
											value={image.caption}
											onChange={(e) => changeDevelopmentItemImageCaption(e, imageIndex)}
										/>
										<div className='character-subpage-development-item-image-item-btns-container'>
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
					<div className='character-subpage-development-item-images-add-container'>
						<IconBtn
							icon={<FaImage />}
							iconName='image'
							iconSmall={<FaPlus />}
							seamless={true}
							onClick={() => openCharacterImages(index)}
						/>
					</div>
				</div>
			</div>
			<IconBtn icon={<FaTimes />} iconName='times' seamless={true} onClick={() => removeDevelopmentItem(index)} />
		</div>
	);
};
