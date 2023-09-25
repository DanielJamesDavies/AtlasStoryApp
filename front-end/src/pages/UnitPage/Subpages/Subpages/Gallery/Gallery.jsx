// Packages

// Components
import { GalleryItem } from "./GalleryItem";
import { UnitImages } from "../../UnitImages/UnitImages";
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
		unit_type,
		isAuthorizedToEdit,
		unit,
		unitVersion,
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
				className='unit-page-subpage-gallery'
				isAuthorizedToEdit={isAuthorizedToEdit}
				onReorder={toggleIsReorderingGalleryItems}
				onRevert={revertGalleryItems}
				onSave={saveGalleryItems}
				onAdd={toggleIsDisplayingCharactersImages}
				onScroll={onGalleryScroll}
			>
				<div className='unit-page-subpage-gallery-items-container'>
					<div className='unit-page-subpage-gallery-items'>
						{["character", "group"].includes(unit_type)
							? !unitVersion
								? null
								: unitVersion.gallery.map((image, index) => (
										<GalleryItem key={index} index={index} image={image} isEditing={false} onClick={onGalleryItemClick} />
								  ))
							: !unit?.data?.gallery
							? null
							: unit.data.gallery.map((image, index) => (
									<GalleryItem key={index} index={index} image={image} isEditing={false} onClick={onGalleryItemClick} />
							  ))}
					</div>
				</div>
				<div className='unit-page-subpage-gallery-edit'>
					<div className='unit-page-subpage-gallery-items-container'>
						<DragDropContainer
							className='unit-page-subpage-gallery-items'
							enableDragDrop={isReorderingGalleryItems}
							onDropItem={reorderGalleryItems}
						>
							{["character", "group"].includes(unit_type)
								? !unitVersion
									? null
									: unitVersion.gallery.map((image, index) => (
											<DragDropItem key={index} index={index}>
												<GalleryItem image={image} index={index} isEditing={true} removeGalleryItem={removeGalleryItem} />
											</DragDropItem>
									  ))
								: !unit?.data?.gallery
								? null
								: unit.data.gallery.map((image, index) => (
										<DragDropItem key={index} index={index}>
											<GalleryItem image={image} index={index} isEditing={true} removeGalleryItem={removeGalleryItem} />
										</DragDropItem>
								  ))}
						</DragDropContainer>
						<ErrorMessage errors={errors} />
					</div>
					{!isDisplayingCharactersImages ? null : (
						<UnitImages onAddImage={addImageToVersionGallery} onClose={toggleIsDisplayingCharactersImages} />
					)}
				</div>
			</EditableContainer>
		</div>
	);
};
