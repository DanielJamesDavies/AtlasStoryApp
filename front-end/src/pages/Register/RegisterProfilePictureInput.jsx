// Packages
import { FaImage } from "react-icons/fa";

// Components

// Logic

// Context

// Services

// Styles
import "./RegisterProfilePictureInput.css";

// Assets

export const RegisterProfilePictureInput = ({ profilePictureInputRef, profilePicture, changeProfilePicture }) => {
	return (
		<div className='register-profile-picture-input'>
			<div className='register-profile-picture-label'>Profile Picture</div>
			<div className='register-profile-picture-value' onClick={() => profilePictureInputRef.current.click()}>
				<div className='register-profile-picture-value-icon'>
					<FaImage />
				</div>
				{profilePicture ? <img src={profilePicture} alt='' /> : null}
			</div>
			<input ref={profilePictureInputRef} type='file' accept='image/*' onChange={changeProfilePicture} />
		</div>
	);
};
