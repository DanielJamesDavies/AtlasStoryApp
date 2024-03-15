// Packages
import { FaImage, FaPlus, FaTimes } from "react-icons/fa";

// Components
import { DragDropContainer } from "../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../components/DragDropItem/DragDropItem";
import { Text } from "../../../../../components/Text/Text";
import { TextInput } from "../../../../../components/TextInput/TextInput";
import { MultiLineTextInput } from "../../../../../components/MultiLineTextInput/MultiLineTextInput";
import { IconBtn } from "../../../../../components/IconBtn/IconBtn";
import { LoadingCircle } from "../../../../../components/LoadingCircle/LoadingCircle";

// Logic
import { EventsItemLogic } from "./EventsItemLogic";

// Context

// Services

// Styles
import "./EventsItem.css";

// Assets

export const EventsItem = ({
	eventsItem,
	index,
	isEditing,
	changeEventsItemTitle,
	changeEventsItemText,
	removeEventsItem,
	isReorderingEventsItems,
	unitImagesCurrDevItemIndex,
	openUnitImages,
}) => {
	const {
		unitImages,
		reorderEventsItemImages,
		changeEventsItemImageCaption,
		removeDevItemImage,
		onEventsItemImageClick,
		devItemTextContainerClassName,
		devItemImagesContainerClassName,
	} = EventsItemLogic({
		eventsItem,
		index,
		unitImagesCurrDevItemIndex,
		isEditing,
	});

	if (!isEditing)
		return (
			<div
				className={
					eventsItem?.text.join("").split(" ").join("").length !== 0 && eventsItem?.text.length === 1
						? "unit-page-subpage-events-item unit-page-subpage-events-item-has-single-line-text"
						: "unit-page-subpage-events-item"
				}
			>
				<div className='unit-page-subpage-events-item-title-container'>
					<div className='unit-page-subpage-events-item-title'>{eventsItem?.title}</div>
				</div>
				{eventsItem?.text.join("").split(" ").join("").length === 0 ? null : (
					<div className={devItemTextContainerClassName}>
						<Text className='unit-page-subpage-events-item-text-text' value={eventsItem?.text} />
					</div>
				)}
				{!eventsItem?.images || eventsItem?.images?.length === 0 ? null : (
					<div className={devItemImagesContainerClassName}>
						<div className='unit-page-subpage-events-item-images'>
							{eventsItem.images.map((image, index) => (
								<div key={index} className='unit-page-subpage-events-item-image-item'>
									{!unitImages?.find((e) => e._id === image.image)?.image ? (
										<div className='unit-page-subpage-events-item-image-item-placeholder'>
											<LoadingCircle center='true' />
										</div>
									) : (
										<img
											src={unitImages?.find((e) => e._id === image.image).image}
											alt=''
											onClick={() => onEventsItemImageClick(index)}
										/>
									)}
									{image.caption.split(" ").join("").length === 0 ? null : (
										<div className='unit-page-subpage-events-item-image-item-caption'>{image.caption}</div>
									)}
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		);

	return (
		<div className='unit-page-subpage-events-item'>
			<div className='unit-page-subpage-events-item-content'>
				<div className='unit-page-subpage-events-item-title-container'>
					<TextInput
						className='unit-page-subpage-events-item-title'
						seamless={true}
						label='Title'
						value={eventsItem?.title}
						onChange={(e) => changeEventsItemTitle(e, index)}
						aiTools={false}
					/>
				</div>
				<div className={devItemTextContainerClassName}>
					<MultiLineTextInput
						className='unit-page-subpage-events-item-text'
						seamless={true}
						label='Content'
						value={eventsItem?.text.join("\n")}
						onChange={(e) => changeEventsItemText(e, index)}
						aiTools={true}
					/>
				</div>
				<div className={devItemImagesContainerClassName}>
					{!eventsItem?.images || eventsItem?.images?.length === 0 ? null : (
						<DragDropContainer
							className='unit-page-subpage-events-item-images'
							enableDragDrop={isReorderingEventsItems}
							onDropItem={reorderEventsItemImages}
						>
							{eventsItem.images.map((image, imageIndex) => (
								<DragDropItem key={imageIndex} index={imageIndex} className='unit-page-subpage-events-item-image-item'>
									{!unitImages?.find((e) => e._id === image.image)?.image ? null : (
										<img src={unitImages?.find((e) => e._id === image.image).image} alt='' />
									)}
									<TextInput
										className='unit-page-subpage-events-item-image-item-caption'
										seamless={true}
										autoResize={true}
										label='Caption'
										value={image.caption}
										onChange={(e) => changeEventsItemImageCaption(e, imageIndex)}
									/>
									<div className='unit-page-subpage-events-item-image-item-btns-container'>
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
			<div className='unit-page-subpage-events-item-buttons-container'>
				<IconBtn icon={<FaTimes />} iconName='times' seamless={true} onClick={() => removeEventsItem(index)} />
				<IconBtn icon={<FaImage />} iconName='image' iconSmall={<FaPlus />} seamless={true} onClick={() => openUnitImages(index)} />
			</div>
		</div>
	);
};
