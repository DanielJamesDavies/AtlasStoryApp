// Packages

// Components
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { ImageInput } from "../../../../../../components/ImageInput/ImageInput";

// Logic
import { CharacterProfilePrimaryImageLogic } from "./PrimaryImageLogic";

// Context

// Services

// Styles
import "./PrimaryImage.css";

// Assets

export const CharacterProfilePrimaryImage = () => {
	const {
		isAuthorizedToEdit,
		characterVersion,
		characterPrimaryImages,
		onPrimaryImageClick,
		changePrimaryImage,
		removePrimaryImage,
		revertPrimaryImage,
		savePrimaryImage,
	} = CharacterProfilePrimaryImageLogic();

	if (
		!isAuthorizedToEdit &&
		(!characterPrimaryImages.find((e) => e?._id === characterVersion?._id)?.image?.image ||
			characterPrimaryImages.find((e) => e?._id === characterVersion?._id)?.image?.image === "NO_IMAGE")
	)
		return null;
	return (
		<EditableContainer
			className={
				!characterPrimaryImages.find((e) => e?._id === characterVersion?._id)?.image?.image ||
				characterPrimaryImages.find((e) => e?._id === characterVersion?._id)?.image?.image === "NO_IMAGE"
					? "character-profile-primary-image-container character-profile-primary-image-container-no-image"
					: "character-profile-primary-image-container"
			}
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRemove={removePrimaryImage}
			onRevert={revertPrimaryImage}
			onSave={savePrimaryImage}
		>
			<div className='character-profile-primary-image'>
				{!characterPrimaryImages.find((e) => e?._id === characterVersion?._id)?.image?.image ||
				characterPrimaryImages.find((e) => e?._id === characterVersion?._id)?.image?.image === "NO_IMAGE" ? null : (
					<img
						className='lightbox-openable-image'
						src={characterPrimaryImages.find((e) => e?._id === characterVersion?._id)?.image?.image}
						alt=''
						onClick={() => onPrimaryImageClick()}
					/>
				)}
			</div>
			<div className='character-profile-primary-image'>
				<ImageInput
					value={characterPrimaryImages.find((e) => e?._id === characterVersion?._id)?.image?.image}
					onChange={changePrimaryImage}
				/>
			</div>
		</EditableContainer>
	);
};
