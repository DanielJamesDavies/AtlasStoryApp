// Packages

// Components
import { GalleryItem } from "./GalleryItem";
import { LocationImages } from "../../LocationImages/LocationImages";
import { EditableContainer } from "../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../components/DragDropItem/DragDropItem";
import { ErrorMessage } from "../../../../../components/ErrorMessage/ErrorMessage";

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
		addImageToVersionGallery,
		removeGalleryItem,
		isReorderingGalleryItems,
		toggleIsReorderingGalleryItems,
		reorderGalleryItems,
		errors,
		revertGalleryItems,
		saveGalleryItems,
		galleryRef,
		onGalleryScroll,
		onGalleryItemClick,
		isDisplayingLocationsImages,
		toggleIsDisplayingLocationsImages,
	} = GalleryLogic();

	return (
		<div>
			<EditableContainer
				innerRef={galleryRef}
				className='location-subpage-gallery'
				isAuthorizedToEdit={isAuthorizedToEdit}
				onReorder={toggleIsReorderingGalleryItems}
				onRevert={revertGalleryItems}
				onSave={saveGalleryItems}
				onAdd={toggleIsDisplayingLocationsImages}
				onScroll={onGalleryScroll}
			>
				<div className='location-subpage-gallery-items-container'>
					<div className='location-subpage-gallery-items'>
						{!location?.data?.gallery
							? null
							: location.data.gallery.map((image, index) => (
									<GalleryItem key={index} index={index} image={image} isEditing={false} onClick={onGalleryItemClick} />
							  ))}
					</div>
				</div>
				<div className='location-subpage-gallery-edit'>
					<div className='location-subpage-gallery-items-container'>
						<DragDropContainer
							className='location-subpage-gallery-items'
							enableDragDrop={isReorderingGalleryItems}
							onDropItem={reorderGalleryItems}
						>
							{!location?.data?.gallery
								? null
								: location.data.gallery.map((image, index) => (
										<DragDropItem key={index} index={index}>
											<GalleryItem image={image} index={index} isEditing={true} removeGalleryItem={removeGalleryItem} />
										</DragDropItem>
								  ))}
						</DragDropContainer>
						<ErrorMessage errors={errors} />
					</div>
				</div>
			</EditableContainer>
			{!isDisplayingLocationsImages ? null : (
				<LocationImages onAddImage={addImageToVersionGallery} onClose={toggleIsDisplayingLocationsImages} />
			)}
		</div>
	);
};
