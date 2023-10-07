// Packages
import { FaBan, FaCog, FaSignOutAlt } from "react-icons/fa";

// Components
import { IconBtn } from "../../../../components/IconBtn/IconBtn";

// Logic
import { ButtonsLogic } from "./ButtonsLogic";

// Context

// Services

// Styles
import "./Buttons.css";

// Assets

export const Buttons = () => {
	const { isAuthorizedToEdit, user, openSettings, logOut, followUser, blockUser, isFollowingUser, hasBlockedUser } = ButtonsLogic();

	if (!user?._id) return null;
	if (!isAuthorizedToEdit)
		return (
			<div className='user-header-buttons-container'>
				<button className={"user-header-follow-btn" + (isFollowingUser ? " user-header-follow-btn-is-following" : "")} onClick={followUser}>
					<div className='user-header-follow-btn-text-follow'>Follow</div>
					<div className='user-header-follow-btn-text-following'>Following</div>
					<div className='user-header-follow-btn-text-unfollow'>Unfollow</div>
				</button>
				<IconBtn
					className={"user-header-block-btn" + (!hasBlockedUser ? "" : " user-header-block-btn-has-blocked")}
					seamless={true}
					size='l'
					icon={<FaBan />}
					onClick={blockUser}
					label={!hasBlockedUser ? "Block User" : "Unblock User"}
				/>
			</div>
		);
	return (
		<div className='user-header-buttons-container'>
			<IconBtn className='user-header-btn' seamless={true} size='l' icon={<FaCog />} onClick={openSettings} label='User Settings' />
			<IconBtn className='user-header-btn' seamless={true} size='l' icon={<FaSignOutAlt />} onClick={logOut} label='Log Out' />
		</div>
	);
};
