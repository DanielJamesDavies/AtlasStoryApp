// Packages

// Components
import { GalleryItem } from "./GalleryItem";
import { CharacterImages } from "../../CharacterImages/CharacterImages";
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
		characterVersion,
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
		isDisplayingCharactersImages,
		toggleIsDisplayingCharactersImages,
	} = GalleryLogic();

	return (
		<div>
			<EditableContainer
				innerRef={galleryRef}
				className='character-subpage-gallery'
				isAuthorizedToEdit={isAuthorizedToEdit}
				onReorder={toggleIsReorderingGalleryItems}
				onRevert={revertGalleryItems}
				onSave={saveGalleryItems}
				onAdd={toggleIsDisplayingCharactersImages}
				onScroll={onGalleryScroll}
			>
				<div className='character-subpage-gallery-items-container'>
					<div className='character-subpage-gallery-items'>
						{!characterVersion
							? null
							: characterVersion.gallery.map((image, index) => (
									<GalleryItem key={index} index={index} image={image} isEditing={false} onClick={onGalleryItemClick} />
							  ))}
					</div>
				</div>
				<div className='character-subpage-gallery-edit'>
					<div className='character-subpage-gallery-items-container'>
						<DragDropContainer
							className='character-subpage-gallery-items'
							enableDragDrop={isReorderingGalleryItems}
							onDropItem={reorderGalleryItems}
						>
							{!characterVersion
								? null
								: characterVersion.gallery.map((image, index) => (
										<DragDropItem key={index} index={index}>
											<GalleryItem image={image} index={index} isEditing={true} removeGalleryItem={removeGalleryItem} />
										</DragDropItem>
								  ))}
						</DragDropContainer>
						<ErrorMessage errors={errors} />
					</div>
					{!isDisplayingCharactersImages ? null : (
						<CharacterImages onAddImage={addImageToVersionGallery} onClose={toggleIsDisplayingCharactersImages} />
					)}
				</div>
			</EditableContainer>
		</div>
	);
};
