// Packages

// Components
import { EditableContainer } from "../../../../components/EditableContainer/EditableContainer";
import { ImageInput } from "../../../../components/ImageInput/ImageInput";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { ProfilePictureLogic } from "./ProfilePictureLogic";

// Context

// Services

// Styles
import "./ProfilePicture.css";

// Assets

export const ProfilePicture = () => {
	const { isAuthorizedToEdit, profilePicture, changeProfilePicture, revertProfilePicture, saveProfilePicture, onClickProfilePicture, errors } =
		ProfilePictureLogic();

	return (
		<EditableContainer
			className='user-header-profile-picture-container'
			isMediaContent={true}
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertProfilePicture}
			onSave={saveProfilePicture}
		>
			<div className='user-header-profile-picture lightbox-openable-image' onClick={onClickProfilePicture}>
				{!profilePicture ? (
					<div className='user-header-profile-picture-placeholder' />
				) : (
					<img src={profilePicture} alt='' draggable={false} />
				)}
			</div>
			<ImageInput className='user-header-profile-picture' isCircular={true} value={profilePicture} onChange={changeProfilePicture} />
			<ErrorMessage errors={errors} />
		</EditableContainer>
	);
};
