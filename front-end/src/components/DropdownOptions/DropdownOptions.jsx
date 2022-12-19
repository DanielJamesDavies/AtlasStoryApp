// Packages

// Components

// Logic
import { DropdownOptionsLogic } from "./DropdownOptionsLogic";

// Context

// Services

// Styles
import "./DropdownOptions.css";

// Assets

export const DropdownOptions = () => {
	const { dropdownOptionsStyles, dropdownChildren, selectChild, includeUnselectedOption, closeDropdown } = DropdownOptionsLogic();

	return (
		<div
			className={dropdownChildren ? "dropdown-options-container dropdown-options-container-is-selecting" : "dropdown-options-container"}
			style={dropdownOptionsStyles}
		>
			{!dropdownChildren ? null : (
				<>
					<div className='dropdown-options'>
						{!includeUnselectedOption ? null : (
							<button className='dropdown-option' onClick={(e) => selectChild(e, -1)}>
								Unselected
							</button>
						)}
						{dropdownChildren?.map((child, index) => (
							<button key={index} className='dropdown-option' onClick={(e) => selectChild(e, index)}>
								{child}
							</button>
						))}
					</div>
					{!dropdownChildren ? null : <div className='dropdown-options-background' onClick={() => closeDropdown(false)} />}
				</>
			)}
		</div>
	);
};
