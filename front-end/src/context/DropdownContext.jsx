import React, { createContext, useState, useCallback, useRef, useEffect } from "react";

export const DropdownContext = createContext();

const DropdownProvider = ({ children }) => {
	const [dropdownOptionsStyles, setDropdownOptionsStyles] = useState({});
	const [dropdownChildren, setDropdownChildren] = useState(false);
	const [onDropdownChange, setOnDropdownChange] = useState(false);

	const [dropdownContainerRefCurrent, setDropdownContainerRefCurrent] = useState();

	const dropdownContainerRef = useCallback((node) => {
		if (node) setDropdownContainerRefCurrent(node);
	}, []);

	const dropdownOptionsRepositionInterval = useRef(false);
	useEffect(() => {
		if (dropdownContainerRefCurrent && dropdownChildren)
			dropdownOptionsRepositionInterval.current = setInterval(() => {
				const dropdownContainerRefCurrentRect = dropdownContainerRefCurrent.getBoundingClientRect();
				let newDropdownOptionsStyles = {
					display: "fixed",
					top: dropdownContainerRefCurrentRect.y + dropdownContainerRefCurrentRect.height + "px",
					left: dropdownContainerRefCurrentRect.x + "px",
				};
				setDropdownOptionsStyles(newDropdownOptionsStyles);
			}, 4);
		return () => {
			clearInterval(dropdownOptionsRepositionInterval.current);
			dropdownOptionsRepositionInterval.current = false;
		};
	}, [dropdownContainerRefCurrent, setDropdownOptionsStyles, dropdownChildren, dropdownOptionsRepositionInterval]);

	const [includeUnselectedOption, setIncludeUnselectedOption] = useState(false);

	function closeDropdown() {
		setDropdownOptionsStyles({});
		setDropdownChildren(false);
		setOnDropdownChange(false);
		setIncludeUnselectedOption(false);
	}

	return (
		<DropdownContext.Provider
			value={{
				dropdownContainerRef,
				dropdownOptionsStyles,
				dropdownChildren,
				setDropdownChildren,
				onDropdownChange,
				setOnDropdownChange,
				includeUnselectedOption,
				setIncludeUnselectedOption,
				closeDropdown,
			}}
		>
			{children}
		</DropdownContext.Provider>
	);
};

export default DropdownProvider;
