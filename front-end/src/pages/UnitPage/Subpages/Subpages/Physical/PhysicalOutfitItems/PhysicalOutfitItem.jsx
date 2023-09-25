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
	openUnitImages,
	unitImages,
	onPhysicalItemImageClick,
	changePhysicalOutfitItemImageCaption,
	removePhysicalOutfitItemImage,
	isReorderingPhysicalOutfitItems,
	reorderPhysicalOutfitItemImages,
}) => {
	if (!isEditing)
		return (
			<div className='unit-page-subpage-physical-outfit-item'>
				<ContentItem hasBg={true}>
					<div className='unit-page-subpage-physical-outfit-item-title'>{physicalOutfitItem?.title}</div>
					<Text className='unit-page-subpage-physical-outfit-item-text' value={physicalOutfitItem?.text} />
					{physicalOutfitItem.images.length === 0 ? null : (
						<div className='unit-page-subpage-physical-outfit-item-images'>
							{physicalOutfitItem.images.map((image, imageIndex) => (
								<div key={imageIndex} className='unit-page-subpage-physical-outfit-item-image-item'>
									{!unitImages.find((e) => e._id === image.image)?.image ? null : (
										<img
											className='lightbox-openable-image'
											src={unitImages.find((e) => e._id === image.image).image}
											alt=''
											onClick={() => onPhysicalItemImageClick("outfits", index, imageIndex)}
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
		<div className='unit-page-subpage-physical-outfit-item'>
			<ContentItem hasBg={true}>
				<div className='unit-page-subpage-physical-outfit-item-content'>
					<TextInput
						className='unit-page-subpage-physical-outfit-item-title'
						seamless={true}
						label='Physical Outfit Item Title'
						value={physicalOutfitItem?.title}
						onChange={(e) => changePhysicalOutfitItemTitle(e, index)}
						aiTools={false}
					/>
					<MultiLineTextInput
						className='unit-page-subpage-physical-outfit-item-text'
						seamless={true}
						label='Physical Outfit Item Text'
						value={physicalOutfitItem?.text.join("\n")}
						onChange={(e) => changePhysicalOutfitItemText(e, index)}
						aiTools={true}
					/>
					<DragDropContainer
						className='unit-page-subpage-physical-outfit-item-images'
						enableDragDrop={isReorderingPhysicalOutfitItems}
						onDropItem={(res) => reorderPhysicalOutfitItemImages(res, index)}
					>
						{!physicalOutfitItem?.images
							? null
							: physicalOutfitItem.images.map((image, imageIndex) => (
									<DragDropItem key={imageIndex} index={imageIndex} className='unit-page-subpage-physical-outfit-item-image-item'>
										{!unitImages.find((e) => e._id === image.image)?.image ? null : (
											<img src={unitImages.find((e) => e._id === image.image).image} alt='' />
										)}
										<TextInput
											className='unit-page-subpage-physical-outfit-item-image-item-caption'
											seamless={true}
											autoResize={true}
											label='Caption'
											value={image.caption}
											onChange={(e) => changePhysicalOutfitItemImageCaption(e, index, imageIndex)}
										/>
										<div className='unit-page-subpage-physical-outfit-item-image-item-btns-container'>
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
				<div className='unit-page-subpage-physical-attribute-item-btns-container'>
					<IconBtn icon={<FaTimes />} iconName='times' seamless={true} size='s' onClick={() => removePhysicalOutfitItem(index)} />
					<IconBtn
						icon={<FaImage />}
						iconName='image'
						iconSmall={<FaPlus />}
						seamless={true}
						onClick={() => openUnitImages("outfits", index)}
					/>
				</div>
			</ContentItem>
		</div>
	);
};
