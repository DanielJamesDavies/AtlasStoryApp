// Packages
import { FaChevronDown } from "react-icons/fa";

// Components

// Logic
import { DropdownContainerLogic } from "./DropdownContainerLogic";

// Context

// Services

// Styles
import "./DropdownContainer.css";

// Assets

export const DropdownContainer = ({ children, className, style, seamless, value, onChange, includeUnselectedOption }) => {
	const { isDisplaying, dropdownContainerRef, dropdownContainerClassName, toggleDropdownOptions } = DropdownContainerLogic({
		children,
		className,
		seamless,
		onChange,
		includeUnselectedOption,
	});

	return (
		<div ref={isDisplaying ? dropdownContainerRef : undefined} className={dropdownContainerClassName}>
			<button style={style} className='dropdown-value-container' onClick={() => toggleDropdownOptions()}>
				<div className='dropdown-value'>{value === undefined ? "Unselected" : value}</div>
				<FaChevronDown className='dropdown-value-arrow' />
			</button>
		</div>
	);
};
