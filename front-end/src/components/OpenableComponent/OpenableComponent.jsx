// Packages
import { FaChevronDown } from "react-icons/fa";

// Components

// Logic
import { OpenableComponentLogic } from "./OpenableComponentLogic";

// Context

// Styles
import "./OpenableComponent.css";

// Assets

export const OpenableComponent = ({
	children,
	innerRef,
	className,
	title,
	defaultShowValue,
	isDisplaying,
	onlyOnMobile,
	showTitleOnlyOnMobile,
}) => {
	const { openableComponentlassName, toggleIsOpen } = OpenableComponentLogic({
		className,
		defaultShowValue,
		isDisplaying,
		onlyOnMobile,
		showTitleOnlyOnMobile,
	});

	if (!children) return null;
	return (
		<div ref={innerRef} className={openableComponentlassName}>
			<div className='openable-component-header' onClick={toggleIsOpen}>
				<div className='openable-component-header-title'>{title}</div>
				<div className='openable-component-header-arrow'>
					<FaChevronDown />
				</div>
			</div>
			<div className='openable-component-content'>{children}</div>
		</div>
	);
};
