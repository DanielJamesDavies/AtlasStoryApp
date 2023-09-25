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
	useLayoutEffect(() => {
		function getPrimaryVersionStyle() {
			let newStyle = {};
			if (primaryVersionWidthRef?.current?.clientWidth) newStyle.width = primaryVersionWidthRef.current.clientWidth + "px";
			return newStyle;
		}
		setPrimaryVersionStyle(getPrimaryVersionStyle());
		setTimeout(() => setPrimaryVersionStyle(getPrimaryVersionStyle()), 80);
		setTimeout(() => setPrimaryVersionStyle(getPrimaryVersionStyle()), 120);
		setTimeout(() => setPrimaryVersionStyle(getPrimaryVersionStyle()), 160);
		setTimeout(() => setPrimaryVersionStyle(getPrimaryVersionStyle()), 320);
		setTimeout(() => setPrimaryVersionStyle(getPrimaryVersionStyle()), 480);
		setTimeout(() => setPrimaryVersionStyle(getPrimaryVersionStyle()), 1000);
		setTimeout(() => setPrimaryVersionStyle(getPrimaryVersionStyle()), 2000);
		setTimeout(() => setPrimaryVersionStyle(getPrimaryVersionStyle()), 3000);
	}, [setPrimaryVersionStyle, primaryVersionWidthRef, unit, unitVersion]);

	return {
		unit,
		unitVersion,
		decrementUnitVersion,
		incrementUnitVersion,
		primaryVersionStyle,
		primaryVersionWidthRef,
	};
};
