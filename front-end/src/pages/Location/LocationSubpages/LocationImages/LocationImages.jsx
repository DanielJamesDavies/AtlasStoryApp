// Packages

// Components
import { LocationImageItem } from "./LocationImageItem";
import { EditableContainer } from "../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../components/DragDropItem/DragDropItem";
import { PopUpContainer } from "../../../../components/PopUpContainer/PopUpContainer";

// Logic
import { LocationImagesLogic } from "./LocationImagesLogic";

// Context

// Services

// Styles
import "./LocationImages.css";

// Assets

export const LocationImages = ({ onAddImage, onClose }) => {
	const {
		isAuthorizedToEdit,
		location,
		locationImagesContainerRef,
		addImageInputRef,
		onAddImageToLocationImages,
		removeLocationImage,
		isReorderingLocationImages,
		toggleIsReorderingLocationImages,
		reorderLocationImages,
		revertLocationImages,
		saveLocationImages,
	} = LocationImagesLogic();

	return (
		<PopUpContainer className='location-images-container-container' title='All Location Images' isDisplaying={true} onClosePopUp={onClose}>
			<EditableContainer
				innerRef={locationImagesContainerRef}
				className='location-images-container'
				isAuthorizedToEdit={isAuthorizedToEdit}
				onAdd={() => addImageInputRef.current.click()}
				onReorder={toggleIsReorderingLocationImages}
				onRevert={revertLocationImages}
				onSave={saveLocationImages}
				onScroll={(e) => e.stopPropagation()}
			>
				<div className='location-images'>
					{location?.data?.images?.map((image_id, index) => (
						<div key={index} className='location-image-item-container'>
							<LocationImageItem image_id={image_id} onAddImage={onAddImage} />
						</div>
					))}
				</div>
				<div className='location-images'>
					<DragDropContainer onDropItem={reorderLocationImages} enableDragDrop={isReorderingLocationImages}>
						{location?.data?.images?.map((image_id, index) => (
							<DragDropItem key={index} index={index} className='location-image-item-container'>
								<LocationImageItem image_id={image_id} onAddImage={onAddImage} onRemoveImage={removeLocationImage} />
							</DragDropItem>
						))}
					</DragDropContainer>
					<input
						ref={addImageInputRef}
						className='location-images-add-image-input'
						type='file'
						accept='image/*'
						onChange={onAddImageToLocationImages}
					/>
				</div>
			</EditableContainer>
		</PopUpContainer>
	);
};
