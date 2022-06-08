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
	const { isSelecting, setIsSelecting, dropdownContainerClassName, selectChild } = DropdownContainerLogic({ className, seamless, onChange });

	return (
		<div className={dropdownContainerClassName}>
			<button style={style} className='dropdown-value-container' onClick={() => setIsSelecting((oldIsSelecting) => !oldIsSelecting)}>
				<div className='dropdown-value'>{value === undefined ? "Unselected" : value}</div>
				<FaChevronDown className='dropdown-value-arrow' />
			</button>
			<div className='dropdown-options-container'>
				<div className='dropdown-options'>
					{!includeUnselectedOption ? null : (
						<button className='dropdown-option' onClick={(e) => selectChild(e, -1)}>
							Unselected
						</button>
					)}
					{children.map((child, index) => (
						<button key={index} className='dropdown-option' onClick={(e) => selectChild(e, index)}>
							{child}
						</button>
					))}
				</div>
			</div>
			{!isSelecting ? null : <div className='dropdown-background' onClick={() => setIsSelecting(false)} />}
		</div>
	);
};
