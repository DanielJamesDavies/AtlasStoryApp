// Packages
import { FaCog, FaSignOutAlt } from "react-icons/fa";

// Components
import { UserPrimaryBanner } from "./UserPrimaryBanner";
import { UserPrimaryProfilePicture } from "./UserPrimaryProfilePicture";
import { UserPrimaryNames } from "./UserPrimaryNames";
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
			<UserPrimaryNames />
			{!isAuthorizedToEdit ? null : (
				<div className='user-primary-auth-buttons-container'>
					<IconBtn
						className='user-primary-auth-btn'
						seamless={true}
						size='l'
						icon={<FaCog />}
						onClick={openSettings}
						label='User Settings'
					/>
					<IconBtn className='user-primary-auth-btn' seamless={true} size='l' icon={<FaSignOutAlt />} onClick={logOut} />
				</div>
			)}
		</div>
	);
};
