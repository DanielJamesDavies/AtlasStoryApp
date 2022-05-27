// Packages
import { FaCog, FaSignOutAlt } from "react-icons/fa";

// Components

// Logic
import { UserPrimaryLogic } from "./UserPrimaryLogic";

// Context

// Services

// Styles
import "./UserPrimary.css";

// Assets

export const UserPrimary = () => {
	const { isAuthorizedToModify, user, profilePicture, banner, logOut } = UserPrimaryLogic();

	return (
		<div className='user-primary'>
			<div className='user-primary-banner'>{!banner ? null : <img src={banner} alt='' />}</div>
			<div className='user-primary-break'></div>
			<div className='user-primary-profile-picture'>{!profilePicture ? null : <img src={profilePicture} alt='' />}</div>
			<div className='user-primary-names'>
				<div className='user-primary-names-nickname'>{user?.nickname}</div>
				<div className='user-primary-names-username'>{user?.username}</div>
			</div>
			{!isAuthorizedToModify ? null : (
				<div className='user-primary-auth-buttons-container'>
					<button className='user-primary-auth-btn user-primary-auth-btn-settings'>
						<FaCog />
					</button>
					<button className='user-primary-auth-btn user-primary-auth-log-out' onClick={logOut}>
						<FaSignOutAlt />
					</button>
				</div>
			)}
		</div>
	);
};
