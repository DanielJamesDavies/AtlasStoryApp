// Packages
import { FaCog, FaSignOutAlt } from "react-icons/fa";

// Components
import { UserPrimaryBanner } from "./UserPrimaryBanner/UserPrimaryBanner";
import { UserPrimaryProfilePicture } from "./UserPrimaryProfilePicture/UserPrimaryProfilePicture";
import { UserPrimaryNames } from "./UserPrimaryNames/UserPrimaryNames";
import { IconBtn } from "../../../components/IconBtn/IconBtn";

// Logic
import { UserPrimaryLogic } from "./UserPrimaryLogic";

// Context

// Services

// Styles
import "./UserPrimary.css";

// Assets

export const UserPrimary = () => {
	const { isAuthorizedToEdit, openSettings, logOut } = UserPrimaryLogic();

	return (
		<div className='user-primary'>
			<UserPrimaryBanner />
			<div className='user-primary-break'></div>
			<UserPrimaryProfilePicture />
			<div className={isAuthorizedToEdit ? "user-primary-main-info user-primary-main-info-is-authorized" : "user-primary-main-info"}>
				<UserPrimaryNames />
			</div>
			{!isAuthorizedToEdit ? null : (
				<div className='user-primary-buttons-container'>
					<IconBtn className='user-primary-btn' seamless={true} size='l' icon={<FaCog />} onClick={openSettings} label='User Settings' />
					<IconBtn className='user-primary-btn' seamless={true} size='l' icon={<FaSignOutAlt />} onClick={logOut} label='Log Out' />
				</div>
			)}
		</div>
	);
};
