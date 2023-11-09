// Packages
import { useContext, useState, useRef, useLayoutEffect } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../UnitPageContext";

// Services

// Styles

// Assets

export const VersionLogic = () => {
	const { unit, unitVersion, decrementUnitVersion, incrementUnitVersion } = useContext(UnitPageContext);

	const [primaryVersionStyle, setPrimaryVersionStyle] = useState({});
	const primaryVersionWidthRef = useRef();
	const getPrimaryVersionStyleInterval = useRef(false);
	useLayoutEffect(() => {		
		function getPrimaryVersionStyle() {
			let newStyle = {};
			if (primaryVersionWidthRef?.current?.clientWidth) newStyle.width = primaryVersionWidthRef.current.clientWidth + "px";
			setPrimaryVersionStyle(newStyle);
		}

		clearInterval(getPrimaryVersionStyleInterval.current);
		getPrimaryVersionStyleInterval.current = setInterval(() => {
			getPrimaryVersionStyle();
		}, 750);
	}, [setPrimaryVersionStyle, primaryVersionWidthRef, unit, unitVersion, getPrimaryVersionStyleInterval]);

	return {
		unit,
		unitVersion,
		decrementUnitVersion,
		incrementUnitVersion,
		primaryVersionStyle,
		primaryVersionWidthRef,
	};
};
