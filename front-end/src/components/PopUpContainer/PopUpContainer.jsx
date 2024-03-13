// Packages
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

// Components
import { IconBtn } from "../IconBtn/IconBtn";

// Logic

// Context

// Services

// Styles
import "./PopUpContainer.css";

// Assets

export const PopUpContainer = ({ children, className, title, isDisplaying, onClosePopUp, nullOnHidden, hidePrimary }) => {
	const [isOpening, setIsOpening] = useState(true);

	useEffect(() => {
		setIsOpening(true);
	}, [isDisplaying]);

	function onClosePopUpHandler() {
		setIsOpening(false);
		setTimeout(() => onClosePopUp(), 195);
	}

	if (!isDisplaying && nullOnHidden) return null;
	return (
		<div
			className={
				isDisplaying
					? "pop-up-container " + (isOpening ? "pop-up-container-open" : "pop-up-container-close") + " " + className
					: "pop-up-container-hidden"
			}
		>
			<div className='pop-up-content-container' onClick={onClosePopUp}>
				<div className='pop-up-content' onClick={(e) => e.stopPropagation()}>
					{hidePrimary ? null : (
						<div className='pop-up-content-primary-container'>
							{!title ? null : <div className='pop-up-content-primary-title'>{title}</div>}
							<div className='pop-up-content-primary-btn-container'>
								{!onClosePopUp ? null : (
									<IconBtn icon={<FaTimes />} iconName='times' onClick={onClosePopUpHandler} seamless={true} />
								)}
							</div>
						</div>
					)}
					{children}
				</div>
			</div>
			<div className='pop-up-background' onClick={onClosePopUpHandler} />
		</div>
	);
};
