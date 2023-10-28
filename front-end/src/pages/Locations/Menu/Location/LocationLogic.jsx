// Packages
import { useCallback, useEffect, useRef, useState } from "react";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const LocationLogic = () => {
	const locationContainerRef = useRef();
	const locationPrimaryRef = useRef();
	const [locationStyles, setLocationStyles] = useState({});

	const updateLocationStyles = useCallback(() => {
		let newLocationStyles = {};
		if (locationContainerRef?.current?.clientHeight)
			newLocationStyles["--locationContainerHeight"] = locationContainerRef?.current?.clientHeight - 8 + "px";
		if (locationPrimaryRef?.current?.clientHeight)
			newLocationStyles["--locationPrimaryHeight"] = locationPrimaryRef?.current?.clientHeight + "px";
		setLocationStyles(newLocationStyles);
	}, [setLocationStyles, locationPrimaryRef, locationContainerRef]);

	useEffect(() => {
		setTimeout(() => {
			updateLocationStyles();
		}, 10);
	}, [updateLocationStyles]);

	window.addEventListener("resize", updateLocationStyles);

	return { locationContainerRef, locationPrimaryRef, locationStyles };
};
