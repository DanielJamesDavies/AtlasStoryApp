// Packages

// Components

// Logic
import { IconBtnLogic } from "./IconBtnLogic";

// Context

// Services

// Styles
import "./IconBtn.css";

// Assets

export const IconBtn = ({ className, seamless, size, icon, iconName, onClick }) => {
	const { iconBtnClassName } = IconBtnLogic({ className, seamless, size, iconName });

	return (
		<button className={iconBtnClassName} onClick={onClick}>
			{icon}
		</button>
	);
};
