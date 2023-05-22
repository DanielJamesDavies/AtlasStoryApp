// Packages

// Components
import { GalleryItem } from "./GalleryItem/GalleryItem";
import { EditableContainer } from "../../../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../../../components/DragDropItem/DragDropItem";
import { ErrorMessage } from "../../../../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { GalleryLogic } from "./GalleryLogic";

// Context

// Services

// Styles
import "./Gallery.css";

// Assets

export const Gallery = () => {
	const {
		isAuthorizedToEdit,
		location,
		addImageInputRef,
		addImage,
		removeGalleryItem,
		isReorderingGalleryItems,
		toggleIsReorderingGalleryItems,
		reorderGalleryItems,
		errors,
		revertGalleryItems,
		saveGalleryItems,
		onGalleryItemClick,
	} = GalleryLogic();

	return (
		<div>
			<EditableContainer
				className='locations-location-gallery'
				isAuthorizedToEdit={isAuthorizedToEdit}
				onReorder={toggleIsReorderingGalleryItems}
				onRevert={revertGalleryItems}
				onSave={saveGalleryItems}
				onAdd={() => addImageInputRef.current.click()}
			>
				<div className='locations-location-gallery-items-container'>
					<div className='locations-location-gallery-items'>
						{!location?.data?.gallery
							? null
							: location.data.gallery.map((item, index) => (
									<GalleryItem key={index} index={index} item={item} isEditing={false} onClick={onGalleryItemClick} />
							  ))}
					</div>
				</div>
				<div className='locations-location-gallery-edit'>
					<div className='locations-location-gallery-items-container'>
						{!location?.data?.gallery ? null : (
							<DragDropContainer
								className='locations-location-gallery-items'
								enableDragDrop={isReorderingGalleryItems}
								onDropItem={reorderGalleryItems}
							>
								{location.data.gallery.map((item, index) => (
									<DragDropItem key={index} index={index}>
										<GalleryItem
											item={item}
											index={index}
											isEditing={true}
											removeGalleryItem={removeGalleryItem}
											onClick={() => {}}
										/>
									</DragDropItem>
								))}
							</DragDropContainer>
						)}
						<ErrorMessage errors={errors} />
						<input ref={addImageInputRef} type='file' accept='image/*' onChange={addImage} style={{ display: "none" }} />
					</div>
				</div>
			</EditableContainer>
		</div>
	);
};
