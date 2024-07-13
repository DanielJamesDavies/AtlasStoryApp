// Packages
import { FaMountain, FaPencilAlt, FaImage, FaPlus, FaTimes, FaTrash, FaSort, FaSave, FaUndoAlt } from "react-icons/fa";

// Components
import { Text } from "../Text/Text";
import { TextInput } from "../TextInput/TextInput";
import { MultiLineTextInput } from "../MultiLineTextInput/MultiLineTextInput";
import { IconBtn } from "../IconBtn/IconBtn";
import { DragDropContainer } from "../DragDropContainer/DragDropContainer";
import { DragDropItem } from "../DragDropItem/DragDropItem";

// Logic
import { EditableItemLogic } from "./EditableItemLogic";

// Context

// Services

// Styles
import "./EditableItem.css";

// Assets

export const EditableItem = ({
	className,
	items = [],
	buttons = [],
	extraComponents = [],
	isEditable = true,
	isAuthorizedToEdit = false,
	forceDisplayButtons = false,
	forceHideButtons = false,
	onLongHold = () => {},
	onImageLongHold = () => {},
}) => {
	const {
		isEditing,
		toggleIsEditing,
		onKeyDown,
		onMouseDown,
		onMouseMove,
		onMouseUp,
		onMouseLeave,
		onImageMouseDown,
		onImageMouseMove,
		onImageMouseUp,
		onImageMouseLeave,
		onSave,
		onRevert,
	} = EditableItemLogic({
		isAuthorizedToEdit,
		buttons,
		onLongHold,
		onImageLongHold,
	});

	return (
		<div
			className={
				"editable-item-container" +
				(isEditing ? " editable-item-container-is-editing" : "") +
				(className ? " " + className : "") +
				(forceDisplayButtons ? " editable-item-container-force-display-buttons" : "") +
				(forceHideButtons || !isAuthorizedToEdit ? " editable-item-container-force-hide-buttons" : "")
			}
			onKeyDown={onKeyDown}
			onMouseDown={onMouseDown}
			onMouseMove={onMouseMove}
			onMouseUp={onMouseUp}
			onMouseLeave={onMouseLeave}
		>
			<div className='editable-item-items'>
				{items.map((item, index) => {
					switch (item?.type) {
						case "single-line-text":
							return (
								<div key={index} className='editable-item-item'>
									{!isEditing ? (
										<div className='editable-item-item-single-line-text'>
											{items
												?.map((item2) =>
													Array.isArray(item2?.value)
														? item2?.value.join("")?.trim()?.length
														: item2?.value?.trim()?.length
												)
												?.filter((e) => e).length === 0
												? item?.label
												: item?.value}
										</div>
									) : (
										<TextInput
											className='editable-item-item-single-line-text'
											seamless={true}
											label={item?.label}
											value={item?.value}
											onChange={item?.setValue}
											aiTools={false}
										/>
									)}
								</div>
							);
						case "multi-line-text":
							return (
								<div key={index} className='editable-item-item'>
									{!isEditing ? (
										<Text
											className='editable-item-item-multi-line-text'
											value={
												items
													?.map((item2) =>
														Array.isArray(item2?.value)
															? item2?.value.join("")?.trim()?.length
															: item2?.value?.trim()?.length
													)
													?.filter((e) => e).length === 0
													? [item?.label]
													: item?.value
											}
										/>
									) : (
										<MultiLineTextInput
											className='editable-item-item-multi-line-text'
											seamless={true}
											label={item?.label}
											value={item?.value.join("\n")}
											onChange={item?.setValue}
											aiTools={true}
										/>
									)}
								</div>
							);
						case "images":
							if (!item?.image_ids || item?.image_ids?.length === 0) {
								return null;
							} else {
								if (!isEditing) {
									return (
										<div key={index} className='editable-item-item editable-item-item-images'>
											{item?.image_ids.map((image, image_index) => (
												<div key={image_index} className='editable-item-item-image-item'>
													{!item?.images?.find((e) => e._id === image.image)?.image ? null : (
														<img
															className='lightbox-openable-image'
															src={item?.images?.find((e) => e._id === image.image).image}
															alt=''
															onClick={() => item?.onClickImage(image_index)}
														/>
													)}
													{image.caption.split(" ").join("").length === 0 ? null : (
														<div className='editable-item-item-image-item-caption'>{image.caption}</div>
													)}
												</div>
											))}
										</div>
									);
								} else {
									return (
										<DragDropContainer
											className='editable-item-item editable-item-item-images'
											enableDragDrop={item?.isReordering}
											onDropItem={item?.onReorder}
										>
											{!item?.image_ids
												? null
												: item.image_ids.map((image, image_index) => (
														<DragDropItem
															key={image_index}
															index={image_index}
															className='editable-item-item-image-item'
														>
															{!item?.images.find((e) => e._id === image.image)?.image ? null : (
																<img
																	src={item?.images.find((e) => e._id === image.image).image}
																	alt=''
																	onMouseDown={onImageMouseDown}
																	onMouseMove={onImageMouseMove}
																	onMouseUp={onImageMouseUp}
																	onMouseLeave={onImageMouseLeave}
																/>
															)}
															<TextInput
																className={
																	"editable-item-item-image-item-caption" +
																	(image?.caption?.length === 0
																		? " editable-item-item-image-item-caption-empty"
																		: "")
																}
																seamless={true}
																autoResize={true}
																label='Caption'
																value={image.caption}
																onChange={(e) => item?.onChangeCaption(e, image_index)}
															/>
															<div className='editable-item-item-image-item-btns-container'>
																<IconBtn
																	icon={<FaTimes />}
																	iconName='remove'
																	seamless={true}
																	size='s'
																	onClick={() => item?.onRemoveImage(image_index)}
																/>
															</div>
														</DragDropItem>
												  ))}
										</DragDropContainer>
									);
								}
							}
						default:
							return null;
					}
				})}
			</div>
			<div className='editable-item-extra-components'>
				{extraComponents?.map((extraComponent, index) => (
					<div key={index}>{extraComponent}</div>
				))}
			</div>
			<div className='editable-item-buttons-container'>
				<div className='editable-item-buttons'>
					{!isEditable || buttons.filter((e) => e.event === "edit").length !== 0 ? null : (
						<button className='editable-item-buttons-btn' onClick={toggleIsEditing}>
							{isEditing ? <FaMountain /> : <FaPencilAlt />}
						</button>
					)}
					{["edit", "save", "revert", "add", "add-image", "reorder", "remove"]
						.map((event_id) => buttons.find((button) => button.event === event_id))
						.filter((e) => e && !e?.hide && (isEditing || (e.event !== "save" && e.event !== "revert")))
						?.map((button, index) => (
							<button
								key={index}
								className={
									"editable-item-buttons-btn" +
									(button?.event !== "edit" && !isEditing ? " editable-item-buttons-btn-hidden" : "") +
									(button?.event ? " editable-item-buttons-btn-" + button?.event : "")
								}
								onClick={
									!button?.action
										? () => {}
										: button?.event === "save"
										? () => onSave(button.action)
										: button?.event === "revert"
										? () => onRevert(button.action)
										: button.action
								}
							>
								{button?.event !== "edit" ? null : isEditing ? <FaMountain /> : <FaPencilAlt />}
								{button?.event !== "save" ? null : <FaSave />}
								{button?.event !== "revert" ? null : <FaUndoAlt />}
								{button?.event !== "add" ? null : <FaPlus />}
								{button?.event !== "add-image" ? null : <FaImage />}
								{button?.event !== "add-image" ? null : (
									<div className='editable-item-buttons-btn-small-icon'>
										<FaPlus />
										<FaPlus />
									</div>
								)}
								{button?.event !== "reorder" ? null : <FaSort />}
								{button?.event !== "remove" ? null : <FaTrash />}
							</button>
						))}
				</div>
			</div>
		</div>
	);
};
