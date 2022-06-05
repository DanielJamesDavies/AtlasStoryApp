// Packages
import { FaCog, FaSignOutAlt } from "react-icons/fa";

// Components
import { UserPrimaryBanner } from "./UserPrimaryBanner";
import { UserPrimaryProfilePicture } from "./UserPrimaryProfilePicture";
import { IconBtn } from "../../../components/IconBtn/IconBtn";

// Logic
import { UserPrimaryLogic } from "./UserPrimaryLogic";

// Context

// Services

// Styles
import "./UserPrimary.css";

// Assets

export const UserPrimary = () => {
	const { isAuthorizedToEdit, user, openSettings, logOut } = UserPrimaryLogic();

	return (
		<div className='user-primary'>
			<UserPrimaryBanner />
			<div className='user-primary-break'></div>
			<UserPrimaryProfilePicture />
			<div className={isAuthorizedToEdit ? "user-primary-names user-primary-names-is-authorized" : "user-primary-names"}>
				<div className='user-primary-names-nickname'>{user?.data?.nickname}</div>
				<div className='user-primary-names-username'>{user?.username}</div>
			</div>
			{!isAuthorizedToEdit ? null : (
				<div className='user-primary-auth-buttons-container'>
					<IconBtn className='user-primary-auth-btn' seamless={true} size='l' icon={<FaCog />} onClick={openSettings} />
					<IconBtn className='user-primary-auth-btn' seamless={true} size='l' icon={<FaSignOutAlt />} onClick={logOut} />
				</div>
			)}
		</div>
	);
};
