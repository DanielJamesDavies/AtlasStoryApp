// Packages

// Components

// Logic
import { IconBtnLogic } from "./IconBtnLogic";

// Context

// Services

// Styles
import "./IconBtn.css";

// Assets

export const IconBtn = ({ className, seamless, size, icon, iconName, iconHover, iconSmall, onClick, label, isLight }) => {
	const { iconBtnClassName, containerRef, labelRef, labelStyle } = IconBtnLogic({ className, seamless, size, iconName, iconHover, isLight });

	return (
		<div ref={containerRef} className={iconBtnClassName}>
			<button tabIndex='1' className='icon-btn' onClick={onClick} onAuxClick={onClick} onMouseDown={(e) => e.preventDefault()}>
				<div className='icon-btn-icon-container'>{icon}</div>
				<div className='icon-btn-hover-icon-container'>{iconHover}</div>
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
