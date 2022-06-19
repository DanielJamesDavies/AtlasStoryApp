// Packages

// Components

// Logic

// Context

// Services

// Styles
import "./PopUpContainer.css";

// Assets

export const PopUpContainer = ({ children, className, isDisplaying, onClosePopUp }) => {
	if (!isDisplaying) return null;
	return (
		<div className={className === undefined ? "pop-up-container" : "pop-up-container " + className}>
			<div className='pop-up-content-container' onClick={onClosePopUp}>
				<div className='pop-up-content' onClick={(e) => e.stopPropagation()}>
					{children}
				</div>
			</div>
			<div className='pop-up-background' onClick={onClosePopUp} />
		</div>
	);
};
