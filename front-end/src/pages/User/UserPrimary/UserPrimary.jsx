// Packages
import { FaCog, FaSignOutAlt } from "react-icons/fa";

// Components
import { IconBtn } from "../../../components/IconBtn/IconBtn";

// Logic
import { UserPrimaryLogic } from "./UserPrimaryLogic";

// Context

// Services

// Styles
import "./UserPrimary.css";

// Assets

export const UserPrimary = () => {
	const { isAuthorizedToEdit, user, profilePicture, banner, logOut } = UserPrimaryLogic();

	return (
		<div className='user-primary'>
			<div className='user-primary-banner'>{!banner ? null : <img src={banner} alt='' />}</div>
			<div className='user-primary-break'></div>
			<div className='user-primary-profile-picture'>{!profilePicture ? null : <img src={profilePicture} alt='' />}</div>
			<div className='user-primary-names'>
				<div className='user-primary-names-nickname'>{user?.data?.nickname}</div>
				<div className='user-primary-names-username'>{user?.username}</div>
			</div>
			{!isAuthorizedToEdit ? null : (
				<div className='user-primary-auth-buttons-container'>
					<IconBtn className='user-primary-auth-btn' seamless={true} size='l' icon={<FaCog />} onClick={() => {}} />
					<IconBtn className='user-primary-auth-btn' seamless={true} size='l' icon={<FaSignOutAlt />} onClick={logOut} />
				</div>
			)}
		</div>
	);
};
