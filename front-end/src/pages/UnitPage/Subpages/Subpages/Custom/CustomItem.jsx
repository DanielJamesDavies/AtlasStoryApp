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
	unitImagesCurrDevItemIndex,
	openUnitImages,
}) => {
	const {
		unitImages,
		reorderCustomItemImages,
		changeCustomItemImageCaption,
		removeDevItemImage,
		onCustomItemImageClick,
		devItemTextContainerClassName,
		devItemImagesContainerClassName,
	} = CustomItemLogic({
		customItem,
		index,
		unitImagesCurrDevItemIndex,
		isEditing,
	});

	if (!isEditing)
		return (
			<div
				className={
					customItem?.text.join("").split(" ").join("").length !== 0 && customItem?.text.length === 1
						? "unit-page-subpage-custom-item unit-page-subpage-custom-item-has-single-line-text"
						: "unit-page-subpage-custom-item"
				}
			>
				<ContentItem hasBg={true}>
					<div className='unit-page-subpage-custom-item-title-container'>
						<div className='unit-page-subpage-custom-item-title'>{customItem?.title}</div>
					</div>
					{customItem?.text.join("").split(" ").join("").length === 0 ? null : (
						<div className={devItemTextContainerClassName}>
							<Text className='unit-page-subpage-custom-item-text-text' value={customItem?.text} />
						</div>
					)}
					{!customItem?.images || customItem?.images?.length === 0 ? null : (
						<div className={devItemImagesContainerClassName}>
							<div className='unit-page-subpage-custom-item-images'>
								{customItem.images.map((image, index) => (
									<div key={index} className='unit-page-subpage-custom-item-image-item'>
										{!unitImages?.find((e) => e._id === image.image)?.image ? (
											<div className='unit-page-subpage-custom-item-image-item-placeholder'>
												<LoadingCircle center='true' />
											</div>
										) : (
											<img
												src={unitImages?.find((e) => e._id === image.image).image}
												alt=''
												onClick={() => onCustomItemImageClick(index)}
											/>
										)}
										{image.caption.split(" ").join("").length === 0 ? null : (
											<div className='unit-page-subpage-custom-item-image-item-caption'>{image.caption}</div>
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
		<div className='unit-page-subpage-custom-item'>
			<ContentItem hasBg={true}>
				<div className='unit-page-subpage-custom-item-content'>
					<div className='unit-page-subpage-custom-item-title-container'>
						<TextInput
							className='unit-page-subpage-custom-item-title'
							seamless={true}
							label='Title'
							value={customItem?.title}
							onChange={(e) => changeCustomItemTitle(e, index)}
							aiTools={false}
						/>
					</div>
					<div className={devItemTextContainerClassName}>
						<MultiLineTextInput
							className='unit-page-subpage-custom-item-text'
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
								className='unit-page-subpage-custom-item-images'
								enableDragDrop={isReorderingCustomItems}
								onDropItem={reorderCustomItemImages}
							>
								{customItem.images.map((image, imageIndex) => (
									<DragDropItem key={imageIndex} index={imageIndex} className='unit-page-subpage-custom-item-image-item'>
										{!unitImages?.find((e) => e._id === image.image)?.image ? null : (
											<img src={unitImages?.find((e) => e._id === image.image).image} alt='' />
										)}
										<TextInput
											className='unit-page-subpage-custom-item-image-item-caption'
											seamless={true}
											autoResize={true}
											label='Caption'
											value={image.caption}
											onChange={(e) => changeCustomItemImageCaption(e, imageIndex)}
										/>
										<div className='unit-page-subpage-custom-item-image-item-btns-container'>
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
				<div className='unit-page-subpage-custom-item-buttons-container'>
					<IconBtn icon={<FaTimes />} iconName='times' seamless={true} onClick={() => removeCustomItem(index)} />
					<IconBtn icon={<FaImage />} iconName='image' iconSmall={<FaPlus />} seamless={true} onClick={() => openUnitImages(index)} />
				</div>
			</ContentItem>
		</div>
	);
};
