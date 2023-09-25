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
	unitImagesCurrDevItemIndex,
	openUnitImages,
}) => {
	const {
		unitImages,
		reorderDetailsItemImages,
		changeDetailsItemImageCaption,
		removeDevItemImage,
		onDetailsItemImageClick,
		devItemTextContainerClassName,
		devItemImagesContainerClassName,
	} = DetailsItemLogic({
		detailsItem,
		index,
		unitImagesCurrDevItemIndex,
		isEditing,
	});

	if (!isEditing)
		return (
			<div
				className={
					detailsItem?.text.join("").split(" ").join("").length !== 0 && detailsItem?.text.length === 1
						? "unit-page-subpage-details-item unit-page-subpage-details-item-has-single-line-text"
						: "unit-page-subpage-details-item"
				}
			>
				<ContentItem hasBg={true}>
					<div className='unit-page-subpage-details-item-title-container'>
						<div className='unit-page-subpage-details-item-title'>{detailsItem?.title}</div>
					</div>
					{detailsItem?.text.join("").split(" ").join("").length === 0 ? null : (
						<div className={devItemTextContainerClassName}>
							<Text className='unit-page-subpage-details-item-text-text' value={detailsItem?.text} />
						</div>
					)}
					{!detailsItem?.images || detailsItem?.images?.length === 0 ? null : (
						<div className={devItemImagesContainerClassName}>
							<div className='unit-page-subpage-details-item-images'>
								{detailsItem.images.map((image, index) => (
									<div key={index} className='unit-page-subpage-details-item-image-item'>
										{!unitImages?.find((e) => e._id === image.image)?.image ? (
											<div className='unit-page-subpage-details-item-image-item-placeholder'>
												<LoadingCircle center='true' />
											</div>
										) : (
											<img
												src={unitImages?.find((e) => e._id === image.image).image}
												alt=''
												onClick={() => onDetailsItemImageClick(index)}
											/>
										)}
										{image.caption.split(" ").join("").length === 0 ? null : (
											<div className='unit-page-subpage-details-item-image-item-caption'>{image.caption}</div>
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
		<div className='unit-page-subpage-details-item'>
			<ContentItem hasBg={true}>
				<div className='unit-page-subpage-details-item-content'>
					<div className='unit-page-subpage-details-item-title-container'>
						<TextInput
							className='unit-page-subpage-details-item-title'
							seamless={true}
							label='Title'
							value={detailsItem?.title}
							onChange={(e) => changeDetailsItemTitle(e, index)}
							aiTools={false}
						/>
					</div>
					<div className={devItemTextContainerClassName}>
						<MultiLineTextInput
							className='unit-page-subpage-details-item-text'
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
								className='unit-page-subpage-details-item-images'
								enableDragDrop={isReorderingDetailsItems}
								onDropItem={reorderDetailsItemImages}
							>
								{detailsItem.images.map((image, imageIndex) => (
									<DragDropItem key={imageIndex} index={imageIndex} className='unit-page-subpage-details-item-image-item'>
										{!unitImages?.find((e) => e._id === image.image)?.image ? null : (
											<img src={unitImages?.find((e) => e._id === image.image).image} alt='' />
										)}
										<TextInput
											className='unit-page-subpage-details-item-image-item-caption'
											seamless={true}
											autoResize={true}
											label='Caption'
											value={image.caption}
											onChange={(e) => changeDetailsItemImageCaption(e, imageIndex)}
										/>
										<div className='unit-page-subpage-details-item-image-item-btns-container'>
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
				<div className='unit-page-subpage-details-item-buttons-container'>
					<IconBtn icon={<FaTimes />} iconName='times' seamless={true} onClick={() => removeDetailsItem(index)} />
					<IconBtn icon={<FaImage />} iconName='image' iconSmall={<FaPlus />} seamless={true} onClick={() => openUnitImages(index)} />
				</div>
			</ContentItem>
		</div>
	);
};
