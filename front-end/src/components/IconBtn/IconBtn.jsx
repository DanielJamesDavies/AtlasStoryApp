// Packages

// Components

// Logic
import { IconBtnLogic } from "./IconBtnLogic";

// Context

// Services

// Styles
import "./IconBtn.css";

// Assets

export const IconBtn = ({ className, seamless, size, icon, iconName, iconSmall, onClick, label }) => {
	const { iconBtnClassName, containerRef, labelRef, labelStyle } = IconBtnLogic({ className, seamless, size, iconName });

	return (
		<div ref={containerRef} className={iconBtnClassName}>
			<button className='icon-btn' onClick={onClick}>
				{icon}
				{iconSmall === undefined ? null : (
					<div className='icon-btn-small-icon-container'>
						<div className='icon-btn-small-icon'>{iconSmall}</div>
						<div className='icon-btn-small-icon-bg'>{iconSmall}</div>
					</div>
				)}
			</button>
			{label === undefined ? null : (
				<div ref={labelRef} className='icon-btn-label' style={labelStyle}>
					{label}
				</div>
			)}
		</div>
	);
};
