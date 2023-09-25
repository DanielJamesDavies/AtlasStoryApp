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
	changeDevelopmentItemText,
	removeDevelopmentItem,
	isReorderingDevelopmentItems,
	unitImagesCurrDevItemIndex,
	openUnitImages,
}) => {
	const {
		unitImages,
		reorderDevelopmentItemImages,
		changeDevelopmentItemImageCaption,
		removeDevItemImage,
		onDevelopmentItemImageClick,
		devItemTextContainerClassName,
		devItemImagesContainerClassName,
	} = DevelopmentItemLogic({
		developmentItem,
		index,
		unitImagesCurrDevItemIndex,
		isEditing,
	});

	if (!isEditing)
		return (
			<div
				className={
					developmentItem?.text.join("").split(" ").join("").length !== 0 && developmentItem?.text.length === 1
						? "unit-page-subpage-development-item unit-page-subpage-development-item-has-single-line-text"
						: "unit-page-subpage-development-item"
				}
			>
				<ContentItem hasBg={true}>
					<div className='unit-page-subpage-development-item-title-container'>
						<div className='unit-page-subpage-development-item-title'>{developmentItem?.title}</div>
					</div>
					{developmentItem?.text.join("").split(" ").join("").length === 0 ? null : (
						<div className={devItemTextContainerClassName}>
							<Text className='unit-page-subpage-development-item-text-text' value={developmentItem?.text} />
						</div>
					)}
					{!developmentItem?.images || developmentItem?.images?.length === 0 ? null : (
						<div className={devItemImagesContainerClassName}>
							<div className='unit-page-subpage-development-item-images'>
								{developmentItem.images.map((image, index) => (
									<div key={index} className='unit-page-subpage-development-item-image-item'>
										{!unitImages?.find((e) => e._id === image.image)?.image ? (
											<div className='unit-page-subpage-development-item-image-item-placeholder'>
												<LoadingCircle center='true' />
											</div>
										) : (
											<img
												src={unitImages?.find((e) => e._id === image.image).image}
												alt=''
												onClick={() => onDevelopmentItemImageClick(index)}
											/>
										)}
										{image.caption.split(" ").join("").length === 0 ? null : (
											<div className='unit-page-subpage-development-item-image-item-caption'>{image.caption}</div>
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
		<div className='unit-page-subpage-development-item'>
			<ContentItem hasBg={true}>
				<div className='unit-page-subpage-development-item-content'>
					<div className='unit-page-subpage-development-item-title-container'>
						<TextInput
							className='unit-page-subpage-development-item-title'
							seamless={true}
							label='Title'
							value={developmentItem?.title}
							onChange={(e) => changeDevelopmentItemTitle(e, index)}
							aiTools={false}
						/>
					</div>
					<div className={devItemTextContainerClassName}>
						<MultiLineTextInput
							className='unit-page-subpage-development-item-text'
							seamless={true}
							label='Content'
							value={developmentItem?.text.join("\n")}
							onChange={(e) => changeDevelopmentItemText(e, index)}
							aiTools={true}
						/>
					</div>
					<div className={devItemImagesContainerClassName}>
						{!developmentItem?.images || developmentItem?.images?.length === 0 ? null : (
							<DragDropContainer
								className='unit-page-subpage-development-item-images'
								enableDragDrop={isReorderingDevelopmentItems}
								onDropItem={reorderDevelopmentItemImages}
							>
								{developmentItem.images.map((image, imageIndex) => (
									<DragDropItem key={imageIndex} index={imageIndex} className='unit-page-subpage-development-item-image-item'>
										{!unitImages?.find((e) => e._id === image.image)?.image ? null : (
											<img src={unitImages?.find((e) => e._id === image.image).image} alt='' />
										)}
										<TextInput
											className='unit-page-subpage-development-item-image-item-caption'
											seamless={true}
											autoResize={true}
											label='Caption'
											value={image.caption}
											onChange={(e) => changeDevelopmentItemImageCaption(e, imageIndex)}
										/>
										<div className='unit-page-subpage-development-item-image-item-btns-container'>
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
				<div className='unit-page-subpage-development-item-buttons-container'>
					<IconBtn icon={<FaTimes />} iconName='times' seamless={true} onClick={() => removeDevelopmentItem(index)} />
					<IconBtn icon={<FaImage />} iconName='image' iconSmall={<FaPlus />} seamless={true} onClick={() => openUnitImages(index)} />
				</div>
			</ContentItem>
		</div>
	);
};
