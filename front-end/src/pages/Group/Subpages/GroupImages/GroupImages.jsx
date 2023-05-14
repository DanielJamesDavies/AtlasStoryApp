// Packages

// Components
import { GroupImageItem } from "./GroupImageItem";
import { EditableContainer } from "../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../components/DragDropItem/DragDropItem";
import { PopUpContainer } from "../../../../components/PopUpContainer/PopUpContainer";

// Logic
import { GroupImagesLogic } from "./GroupImagesLogic";

// Context

// Services

// Styles
import "./GroupImages.css";

// Assets

export const GroupImages = ({ onAddImage, onClose }) => {
	const {
		isAuthorizedToEdit,
		group,
		groupImagesContainerRef,
		addImageInputRef,
		onAddImageToGroupImages,
		removeGroupImage,
		isReorderingGroupImages,
		toggleIsReorderingGroupImages,
		reorderGroupImages,
		revertGroupImages,
		saveGroupImages,
	} = GroupImagesLogic();

	return (
		<PopUpContainer className='group-images-container-container' title='All Group Images' isDisplaying={true} onClosePopUp={onClose}>
			<EditableContainer
				innerRef={groupImagesContainerRef}
				className='group-images-container'
				isAuthorizedToEdit={isAuthorizedToEdit}
				onAdd={() => addImageInputRef.current.click()}
				onReorder={toggleIsReorderingGroupImages}
				onRevert={revertGroupImages}
				onSave={saveGroupImages}
				onScroll={(e) => e.stopPropagation()}
			>
				<div className='group-images'>
					{group?.data?.images?.map((image_id, index) => (
						<div key={index} className='group-image-item-container'>
							<GroupImageItem image_id={image_id} onAddImage={onAddImage} />
						</div>
					))}
				</div>
				<div className='group-images'>
					<DragDropContainer onDropItem={reorderGroupImages} enableDragDrop={isReorderingGroupImages}>
						{group?.data?.images?.map((image_id, index) => (
							<DragDropItem key={index} index={index} className='group-image-item-container'>
								<GroupImageItem image_id={image_id} onAddImage={onAddImage} onRemoveImage={removeGroupImage} />
							</DragDropItem>
						))}
					</DragDropContainer>
					<input
						ref={addImageInputRef}
						className='group-images-add-image-input'
						type='file'
						accept='image/*'
						onChange={onAddImageToGroupImages}
					/>
				</div>
			</EditableContainer>
		</PopUpContainer>
	);
};
