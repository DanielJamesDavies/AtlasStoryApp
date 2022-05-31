// Packages

// Components

// Logic
import { IconBtnLogic } from "./IconBtnLogic";

// Context

// Services

// Styles
import "./IconBtn.css";

// Assets

export const IconBtn = ({ className, icon, onClick }) => {
	const { iconBtnClassName } = IconBtnLogic({ className, icon });

	return (
		<button className={iconBtnClassName} onClick={onClick}>
			{icon}
		</button>
	);
};
