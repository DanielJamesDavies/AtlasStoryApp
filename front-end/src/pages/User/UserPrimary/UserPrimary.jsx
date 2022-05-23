// Packages
import { FaEdit, FaSignOutAlt } from "react-icons/fa";

// Components

// Logic
import { UserPrimaryLogic } from "./UserPrimaryLogic";

// Context

// Services

// Styles
import "./UserPrimary.css";

// Assets

export const UserPrimary = () => {
	const { user, isAuthorizedUserProfile, logOut } = UserPrimaryLogic();

	return (
		<div className='user-primary'>
			<div className='user-primary-profile-picture'>{!user?.profilePicture ? null : <img src={user.profilePicture} alt='' />}</div>
			<div className='user-primary-names'>
				<div className='user-primary-names-nickname'>{user?.nickname}</div>
				<div className='user-primary-names-username'>{user?.username}</div>
			</div>
			{!isAuthorizedUserProfile ? null : (
				<div className='user-primary-auth-buttons-container'>
					<button className='user-primary-edit-profile-btn user-primary-edit-profile-btn-edit'>
						<FaEdit />
					</button>
					<button className='user-primary-edit-profile-btn user-primary-edit-profile-btn-log-out' onClick={logOut}>
						<FaSignOutAlt />
					</button>
				</div>
			)}
		</div>
	);
};
