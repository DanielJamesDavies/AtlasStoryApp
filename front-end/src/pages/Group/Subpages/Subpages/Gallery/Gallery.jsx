// Packages

// Components
import { GalleryItem } from "./GalleryItem";
import { GroupImages } from "../../GroupImages/GroupImages";
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
		groupVersion,
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
		isDisplayingGroupsImages,
		toggleIsDisplayingGroupsImages,
	} = GalleryLogic();

	return (
		<div>
			<EditableContainer
				innerRef={galleryRef}
				className='group-subpage-gallery'
				isAuthorizedToEdit={isAuthorizedToEdit}
				onReorder={toggleIsReorderingGalleryItems}
				onRevert={revertGalleryItems}
				onSave={saveGalleryItems}
				onAdd={toggleIsDisplayingGroupsImages}
				onScroll={onGalleryScroll}
			>
				<div className='group-subpage-gallery-items-container'>
					<div className='group-subpage-gallery-items'>
						{!groupVersion
							? null
							: groupVersion.gallery.map((image, index) => (
									<GalleryItem key={index} index={index} image={image} isEditing={false} onClick={onGalleryItemClick} />
							  ))}
					</div>
				</div>
				<div className='group-subpage-gallery-edit'>
					<div className='group-subpage-gallery-items-container'>
						<DragDropContainer
							className='group-subpage-gallery-items'
							enableDragDrop={isReorderingGalleryItems}
							onDropItem={reorderGalleryItems}
						>
							{!groupVersion
								? null
								: groupVersion.gallery.map((image, index) => (
										<DragDropItem key={index} index={index}>
											<GalleryItem image={image} index={index} isEditing={true} removeGalleryItem={removeGalleryItem} />
										</DragDropItem>
								  ))}
						</DragDropContainer>
						<ErrorMessage errors={errors} />
					</div>
					{!isDisplayingGroupsImages ? null : (
						<GroupImages onAddImage={addImageToVersionGallery} onClose={toggleIsDisplayingGroupsImages} />
					)}
				</div>
			</EditableContainer>
		</div>
	);
};
