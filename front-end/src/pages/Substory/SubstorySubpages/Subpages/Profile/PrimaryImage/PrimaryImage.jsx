// Packages

// Components
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { ImageInput } from "../../../../../../components/ImageInput/ImageInput";

// Logic
import { SubstoryProfilePrimaryImageLogic } from "./PrimaryImageLogic";

// Context

// Services

// Styles
import "./PrimaryImage.css";

// Assets

export const SubstoryProfilePrimaryImage = () => {
	const { isAuthorizedToEdit, substoryPrimaryImage, onPrimaryImageClick, changePrimaryImage, revertPrimaryImage, savePrimaryImage } =
		SubstoryProfilePrimaryImageLogic();

	if (!isAuthorizedToEdit && (!substoryPrimaryImage || substoryPrimaryImage === "NO_IMAGE")) return null;
	return (
		<EditableContainer
			className={
				!substoryPrimaryImage || substoryPrimaryImage === "NO_IMAGE"
					? "substory-profile-primary-image-container substory-profile-primary-image-container-no-image"
					: "substory-profile-primary-image-container"
			}
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertPrimaryImage}
			onSave={savePrimaryImage}
		>
			<div className='substory-profile-primary-image'>
				{!substoryPrimaryImage || substoryPrimaryImage === "NO_IMAGE" ? null : (
					<img className='lightbox-openable-image' src={substoryPrimaryImage} alt='' onClick={() => onPrimaryImageClick()} />
				)}
			</div>
			<div className='substory-profile-primary-image'>
				<ImageInput value={substoryPrimaryImage} onChange={changePrimaryImage} />
			</div>
		</EditableContainer>
	);
};
