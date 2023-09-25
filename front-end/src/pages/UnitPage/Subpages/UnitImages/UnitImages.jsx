// Packages

// Components
import { UnitImageItem } from "./UnitImageItem";
import { EditableContainer } from "../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../components/DragDropItem/DragDropItem";
import { PopUpContainer } from "../../../../components/PopUpContainer/PopUpContainer";

// Logic
import { UnitImagesLogic } from "./UnitImagesLogic";

// Context

// Services

// Styles
import "./UnitImages.css";

// Assets

export const UnitImages = ({ onAddImage, onClose }) => {
	const {
		isAuthorizedToEdit,
		unit,
		unitImagesContainerRef,
		addImageInputRef,
		onAddImageToUnitImages,
		removeUnitImage,
		isReorderingUnitImages,
		toggleIsReorderingUnitImages,
		reorderUnitImages,
		revertUnitImages,
		saveUnitImages,
	} = UnitImagesLogic();

	return (
		<PopUpContainer className='unit-page-images-container-container' title='All Images' isDisplaying={true} onClosePopUp={onClose}>
			<EditableContainer
				innerRef={unitImagesContainerRef}
				className='unit-page-images-container'
				isAuthorizedToEdit={isAuthorizedToEdit}
				onAdd={() => addImageInputRef.current.click()}
				onReorder={toggleIsReorderingUnitImages}
				onRevert={revertUnitImages}
				onSave={saveUnitImages}
				onScroll={(e) => e.stopPropagation()}
			>
				<div className='unit-page-images'>
					{unit?.data?.images?.map((image_id, index) => (
						<div key={index} className='unit-page-image-item-container'>
							<UnitImageItem image_id={image_id} onAddImage={onAddImage} />
						</div>
					))}
				</div>
				<div className='unit-page-images'>
					<DragDropContainer onDropItem={reorderUnitImages} enableDragDrop={isReorderingUnitImages}>
						{unit?.data?.images?.map((image_id, index) => (
							<DragDropItem key={index} index={index} className='unit-page-image-item-container'>
								<UnitImageItem image_id={image_id} onAddImage={onAddImage} onRemoveImage={removeUnitImage} />
							</DragDropItem>
						))}
					</DragDropContainer>
					<input
						ref={addImageInputRef}
						className='unit-page-images-add-image-input'
						type='file'
						accept='image/*'
						onChange={onAddImageToUnitImages}
					/>
				</div>
			</EditableContainer>
		</PopUpContainer>
	);
};
