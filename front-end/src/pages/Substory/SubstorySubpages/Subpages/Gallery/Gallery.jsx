// Packages

// Components
import { GalleryItem } from "./GalleryItem";
import { SubstoryImages } from "../../SubstoryImages/SubstoryImages";
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
		substory,
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
		isDisplayingSubstorysImages,
		toggleIsDisplayingSubstorysImages,
	} = GalleryLogic();

	return (
		<div>
			<EditableContainer
				innerRef={galleryRef}
				className='substory-subpage-gallery'
				isAuthorizedToEdit={isAuthorizedToEdit}
				onReorder={toggleIsReorderingGalleryItems}
				onRevert={revertGalleryItems}
				onSave={saveGalleryItems}
				onAdd={toggleIsDisplayingSubstorysImages}
				onScroll={onGalleryScroll}
			>
				<div className='substory-subpage-gallery-items-container'>
					<div className='substory-subpage-gallery-items'>
						{!substory?.data?.gallery
							? null
							: substory.data.gallery.map((image, index) => (
									<GalleryItem key={index} index={index} image={image} isEditing={false} onClick={onGalleryItemClick} />
							  ))}
					</div>
				</div>
				<div className='substory-subpage-gallery-edit'>
					<div className='substory-subpage-gallery-items-container'>
						<DragDropContainer
							className='substory-subpage-gallery-items'
							enableDragDrop={isReorderingGalleryItems}
							onDropItem={reorderGalleryItems}
						>
							{!substory?.data?.gallery
								? null
								: substory.data.gallery.map((image, index) => (
										<DragDropItem key={index} index={index}>
											<GalleryItem image={image} index={index} isEditing={true} removeGalleryItem={removeGalleryItem} />
										</DragDropItem>
								  ))}
						</DragDropContainer>
						<ErrorMessage errors={errors} />
					</div>
				</div>
			</EditableContainer>
			{!isDisplayingSubstorysImages ? null : (
				<SubstoryImages onAddImage={addImageToVersionGallery} onClose={toggleIsDisplayingSubstorysImages} />
			)}
		</div>
	);
};
