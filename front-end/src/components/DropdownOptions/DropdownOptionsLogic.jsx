// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { DropdownContext } from "../../context/DropdownContext";

// Services

// Styles

// Assets

export const DropdownOptionsLogic = () => {
	const { dropdownOptionsStyles, dropdownChildren, onDropdownChange, includeUnselectedOption, closeDropdown } = useContext(DropdownContext);

	function selectChild(e, index) {
		e.preventDefault();
		e.stopPropagation();
		closeDropdown();
		if (onDropdownChange?.onChange) onDropdownChange.onChange(index);
	}

	return { dropdownOptionsStyles, dropdownChildren, selectChild, includeUnselectedOption, closeDropdown };
};
