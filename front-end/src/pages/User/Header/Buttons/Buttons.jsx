// Packages
import { FaCog, FaSignOutAlt } from "react-icons/fa";

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
	const { isAuthorizedToEdit, openSettings, logOut } = ButtonsLogic();

	if (!isAuthorizedToEdit) return null;
	return (
		<div className='user-header-buttons-container'>
			<IconBtn className='user-header-btn' seamless={true} size='l' icon={<FaCog />} onClick={openSettings} label='User Settings' />
			<IconBtn className='user-header-btn' seamless={true} size='l' icon={<FaSignOutAlt />} onClick={logOut} label='Log Out' />
		</div>
	);
};
