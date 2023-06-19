// Packages
import { FaTimes, FaImage, FaPlus } from "react-icons/fa";

// Components
import { DragDropContainer } from "../../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../../components/DragDropItem/DragDropItem";
import { ContentItem } from "../../../../../../components/ContentItem/ContentItem";
import { Text } from "../../../../../../components/Text/Text";
import { TextInput } from "../../../../../../components/TextInput/TextInput";
import { MultiLineTextInput } from "../../../../../../components/MultiLineTextInput/MultiLineTextInput";
import { IconBtn } from "../../../../../../components/IconBtn/IconBtn";

// Logic

// Context

// Services

// Styles
import "./PhysicalOutfitItem.css";

// Assets

export const PhysicalOutfitItem = ({
	physicalOutfitItem,
	index,
	isEditing,
	changePhysicalOutfitItemTitle,
	changePhysicalOutfitItemText,
	removePhysicalOutfitItem,
	openCharacterImages,
	characterImages,
	onPhysicalItemImageClick,
	changePhysicalOutfitItemImageCaption,
	removePhysicalOutfitItemImage,
	isReorderingPhysicalOutfitItems,
	reorderPhysicalOutfitItemImages,
}) => {
	if (!isEditing)
		return (
			<div className='character-subpage-physical-outfit-item'>
				<ContentItem hasBg={true}>
					<div className='character-subpage-physical-outfit-item-title'>{physicalOutfitItem?.title}</div>
					<Text className='character-subpage-physical-outfit-item-text' value={physicalOutfitItem?.text} />
					{physicalOutfitItem.images.length === 0 ? null : (
						<div className='character-subpage-physical-outfit-item-images'>
							{physicalOutfitItem.images.map((image, imageIndex) => (
								<div key={imageIndex} className='character-subpage-physical-outfit-item-image-item'>
									{!characterImages.find((e) => e._id === image.image)?.image ? null : (
										<img
											className='lightbox-openable-image'
											src={characterImages.find((e) => e._id === image.image).image}
											alt=''
											onClick={() => onPhysicalItemImageClick("outfits", index, imageIndex)}
										/>
									)}
									{image.caption.split(" ").join("").length === 0 ? null : (
										<div className='character-subpage-development-item-image-item-caption'>{image.caption}</div>
									)}
								</div>
							))}
						</div>
					)}
				</ContentItem>
			</div>
		);

	return (
		<div className='character-subpage-physical-outfit-item'>
			<ContentItem hasBg={true}>
				<div className='character-subpage-physical-outfit-item-content'>
					<TextInput
						className='character-subpage-physical-outfit-item-title'
						seamless={true}
						label='Physical Outfit Item Title'
						value={physicalOutfitItem?.title}
						onChange={(e) => changePhysicalOutfitItemTitle(e, index)}
						aiTools={false}
					/>
					<MultiLineTextInput
						className='character-subpage-physical-outfit-item-text'
						seamless={true}
						label='Physical Outfit Item Text'
						value={physicalOutfitItem?.text.join("\n")}
						onChange={(e) => changePhysicalOutfitItemText(e, index)}
						aiTools={true}
					/>
					<DragDropContainer
						className='character-subpage-physical-outfit-item-images'
						enableDragDrop={isReorderingPhysicalOutfitItems}
						onDropItem={(res) => reorderPhysicalOutfitItemImages(res, index)}
					>
						{!physicalOutfitItem?.images
							? null
							: physicalOutfitItem.images.map((image, imageIndex) => (
									<DragDropItem key={imageIndex} index={imageIndex} className='character-subpage-physical-outfit-item-image-item'>
										{!characterImages.find((e) => e._id === image.image)?.image ? null : (
											<img src={characterImages.find((e) => e._id === image.image).image} alt='' />
										)}
										<TextInput
											className='character-subpage-physical-outfit-item-image-item-caption'
											seamless={true}
											autoResize={true}
											label='Caption'
											value={image.caption}
											onChange={(e) => changePhysicalOutfitItemImageCaption(e, index, imageIndex)}
										/>
										<div className='character-subpage-physical-outfit-item-image-item-btns-container'>
											<IconBtn
												icon={<FaTimes />}
												iconName='remove'
												seamless={true}
												size='s'
												onClick={() => removePhysicalOutfitItemImage(index, imageIndex)}
											/>
										</div>
									</DragDropItem>
							  ))}
					</DragDropContainer>
				</div>
				<div className='character-subpage-physical-attribute-item-btns-container'>
					<IconBtn icon={<FaTimes />} iconName='times' seamless={true} size='s' onClick={() => removePhysicalOutfitItem(index)} />
					<IconBtn
						icon={<FaImage />}
						iconName='image'
						iconSmall={<FaPlus />}
						seamless={true}
						onClick={() => openCharacterImages("outfits", index)}
					/>
				</div>
			</ContentItem>
		</div>
	);
};
