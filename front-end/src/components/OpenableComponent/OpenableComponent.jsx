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
	largeTitle,
}) => {
	const { isOpen, toggleIsOpen } = OpenableComponentLogic({ defaultShowValue });

	if (!children) return null;
	return (
		<div
			ref={innerRef}
			className={
				"openable-component-container" +
				(isOpen ? " openable-component-container-is-open" : "") +
				(isDisplaying === false ? " openable-component-container-hide" : "") +
				(onlyOnMobile ? " openable-component-container-only-on-mobile" : "") +
				(showTitleOnlyOnMobile ? " openable-component-container-show-title-only-on-mobile" : "") +
				(largeTitle ? " openable-component-container-large-title" : "") +
				(className ? " " + className : "")
			}
		>
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
