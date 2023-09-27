// Packages

// Components
import { EditableContainer } from "../../../../components/EditableContainer/EditableContainer";
import { ImageInput } from "../../../../components/ImageInput/ImageInput";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";
import { FirstAddButton } from "../../../../components/FirstAddButton/FirstAddButton";

// Logic
import { ProfilePictureLogic } from "./ProfilePictureLogic";

// Context

// Services

// Styles
import "./ProfilePicture.css";

// Assets

export const ProfilePicture = () => {
	const {
		isAuthorizedToEdit,
		authorized_username,
		user,
		profilePicture,
		firstProfilePictureInputRef,
		addFirstProfilePicture,
		changeProfilePicture,
		revertProfilePicture,
		saveProfilePicture,
		onClickProfilePicture,
		errors,
	} = ProfilePictureLogic();

	if ((!profilePicture || profilePicture === "NO_IMAGE") && authorized_username === user?.username)
		return (
			<div className='user-header-profile-picture-container'>
				<div className='user-header-profile-picture'>
					<FirstAddButton onClick={() => firstProfilePictureInputRef.current.click()} />
					<input
						ref={firstProfilePictureInputRef}
						type='file'
						accept='image/*'
						onChange={addFirstProfilePicture}
						style={{ display: "none" }}
					/>
				</div>
			</div>
		);
	return (
		<EditableContainer
			className='user-header-profile-picture-container'
			isMediaContent={true}
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertProfilePicture}
			onSave={saveProfilePicture}
		>
			<div className='user-header-profile-picture lightbox-openable-image' onClick={onClickProfilePicture}>
				{!profilePicture || profilePicture === "NO_IMAGE" ? (
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
