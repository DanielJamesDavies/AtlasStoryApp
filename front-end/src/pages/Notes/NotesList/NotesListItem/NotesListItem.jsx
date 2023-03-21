// Packages
import { FaImage, FaPlus, FaTimes } from "react-icons/fa";

// Components
import { Text } from "../../../../components/Text/Text";
import { TextInput } from "../../../../components/TextInput/TextInput";
import { MultiLineTextInput } from "../../../../components/MultiLineTextInput/MultiLineTextInput";
import { DragDropContainer } from "../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../components/DragDropItem/DragDropItem";
import { IconBtn } from "../../../../components/IconBtn/IconBtn";
import { LoadingCircle } from "../../../../components/LoadingCircle/LoadingCircle";

// Logic
import { NotesListItemLogic } from "./NotesListItemLogic";

// Context

// Services

// Styles
import "./NotesListItem.css";

// Assets

export const NotesListItem = ({ item, index, isEditing, isReorderingNotes }) => {
	const {
		changeItemTitle,
		changeItemText,
		reorderItemImages,
		changeItemImageCaption,
		removeItemImage,
		removeItem,
		storyNotesImages,
		addImageInputRef,
		onAddImageToItem,
		onItemImageClick,
	} = NotesListItemLogic({
		item,
		index,
	});

	if (!isEditing)
		return (
			<div
				className={
					item?.text.join("").split(" ").join("").length !== 0 && item?.text.length === 1
						? "notes-list-item notes-list-item-has-single-line-text"
						: "notes-list-item"
				}
			>
				<div className='notes-list-item-title'>{item?.title}</div>
				{item?.text.join("").split(" ").join("").length === 0 ? null : <Text className='notes-list-item-text' value={item?.text} />}
				<div className='notes-list-item-images-container'>
					{item?.images?.map((image, imageIndex) => (
						<div key={imageIndex} className='notes-list-item-image-item'>
							<div className='notes-list-item-image-item-image'>
								{!storyNotesImages.find((e) => e._id === image?.image)?.image ? (
									<div className='notes-list-item-image-item-image-item-loading-circle-container'>
										<LoadingCircle size='s' center={true} />
									</div>
								) : (
									<img
										src={storyNotesImages.find((e) => e._id === image.image).image}
										alt=''
										onClick={() => onItemImageClick(imageIndex)}
									/>
								)}
							</div>
							{!image?.caption || image.caption.split(" ").join("").length === 0 ? null : (
								<div className='notes-list-item-image-item-caption'>{image.caption}</div>
							)}
						</div>
					))}
				</div>
			</div>
		);

	return (
		<div className='notes-list-item'>
			<div className='notes-list-item-content'>
				<TextInput className='notes-list-item-title' seamless={true} label='Note Title' value={item?.title} onChange={changeItemTitle} />
				<MultiLineTextInput
					className='notes-list-item-text'
					seamless={true}
					label='Note Text'
					value={item?.text?.join("\n")}
					onChange={changeItemText}
				/>
				<DragDropContainer className='notes-list-item-image-item-images' enableDragDrop={isReorderingNotes} onDropItem={reorderItemImages}>
					{!item?.images
						? null
						: item.images.map((image, imageIndex) => (
								<DragDropItem key={imageIndex} index={imageIndex} className='notes-list-item-image-item'>
									<div className='notes-list-item-image-item-image'>
										{!storyNotesImages.find((e) => e._id === image?.image)?.image ? (
											<div className='notes-list-item-image-item-loading-circle-container'>
												<LoadingCircle size='s' center={true} />
											</div>
										) : (
											<img src={storyNotesImages.find((e) => e._id === image.image).image} alt='' />
										)}
									</div>
									<TextInput
										className='notes-list-item-image-item-caption'
										seamless={true}
										autoResize={true}
										label='Caption'
										value={image.caption}
										onChange={(e) => changeItemImageCaption(e, imageIndex)}
									/>
									<div className='notes-list-item-image-item-btns-container'>
										<IconBtn
											icon={<FaTimes />}
											iconName='remove'
											seamless={true}
											size='s'
											onClick={() => removeItemImage(imageIndex)}
										/>
									</div>
								</DragDropItem>
						  ))}
				</DragDropContainer>
			</div>
			<div className='notes-list-item-buttons-container'>
				<IconBtn icon={<FaTimes />} iconName='times' seamless={true} size='m' onClick={removeItem} />
				<IconBtn
					icon={<FaImage />}
					iconName='image'
					iconSmall={<FaPlus />}
					seamless={true}
					size='m'
					onClick={() => addImageInputRef.current.click()}
				/>
				<input
					ref={addImageInputRef}
					className='notes-list-item-add-image-input'
					type='file'
					accept='image/*'
					onChange={onAddImageToItem}
				/>
			</div>
		</div>
	);
};
