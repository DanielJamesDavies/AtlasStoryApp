// Packages

// Components
import { EditableContainer } from "../../../components/EditableContainer/EditableContainer";
import { ImageInput } from "../../../components/ImageInput/ImageInput";
import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";

// Logic
import { UserPrimaryProfilePictureLogic } from "./UserPrimaryProfilePictureLogic";

// Context

// Services

// Styles
import "./UserPrimaryProfilePicture.css";

// Assets

export const UserPrimaryProfilePicture = () => {
	const { isAuthorizedToEdit, profilePicture, changeProfilePicture, revertProfilePicture, saveProfilePicture, errors } =
		UserPrimaryProfilePictureLogic();

	return (
		<EditableContainer
			className='user-primary-profile-picture-container'
			isMediaContent={true}
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertProfilePicture}
			onSave={saveProfilePicture}
		>
			<div className='user-primary-profile-picture'>{!profilePicture ? null : <img src={profilePicture} alt='' />}</div>
			<ImageInput className='user-primary-profile-picture' isCircular={true} value={profilePicture} onChange={changeProfilePicture} />
			<ErrorMessage errors={errors} />
		</EditableContainer>
	);
};
