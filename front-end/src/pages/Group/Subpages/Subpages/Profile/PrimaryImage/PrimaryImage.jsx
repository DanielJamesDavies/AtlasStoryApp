// Packages

// Components
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { ImageInput } from "../../../../../../components/ImageInput/ImageInput";

// Logic
import { GroupProfilePrimaryImageLogic } from "./PrimaryImageLogic";

// Context

// Services

// Styles
import "./PrimaryImage.css";

// Assets

export const GroupProfilePrimaryImage = () => {
	const { isAuthorizedToEdit, groupVersion, groupPrimaryImages, onPrimaryImageClick, changePrimaryImage, revertPrimaryImage, savePrimaryImage } =
		GroupProfilePrimaryImageLogic();

	if (
		!isAuthorizedToEdit &&
		(!groupPrimaryImages.find((e) => e?._id === groupVersion?._id)?.image?.image ||
			groupPrimaryImages.find((e) => e?._id === groupVersion?._id)?.image?.image === "NO_IMAGE")
	)
		return null;
	return (
		<EditableContainer
			className={
				!groupPrimaryImages.find((e) => e?._id === groupVersion?._id)?.image?.image ||
				groupPrimaryImages.find((e) => e?._id === groupVersion?._id)?.image?.image === "NO_IMAGE"
					? "group-profile-primary-image-container group-profile-primary-image-container-no-image"
					: "group-profile-primary-image-container"
			}
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertPrimaryImage}
			onSave={savePrimaryImage}
		>
			<div className='group-profile-primary-image'>
				{!groupPrimaryImages.find((e) => e?._id === groupVersion?._id)?.image?.image ||
				groupPrimaryImages.find((e) => e?._id === groupVersion?._id)?.image?.image === "NO_IMAGE" ? null : (
					<img
						className='lightbox-openable-image'
						src={groupPrimaryImages.find((e) => e?._id === groupVersion?._id)?.image?.image}
						alt=''
						onClick={() => onPrimaryImageClick()}
					/>
				)}
			</div>
			<div className='group-profile-primary-image'>
				<ImageInput value={groupPrimaryImages.find((e) => e?._id === groupVersion?._id)?.image?.image} onChange={changePrimaryImage} />
			</div>
		</EditableContainer>
	);
};
