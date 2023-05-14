// Packages
import { useContext, useState, useRef, useLayoutEffect } from "react";

// Components

// Logic

// Context
import { GroupContext } from "../../GroupContext";

// Services

// Styles

// Assets

export const GroupPrimaryVersionLogic = () => {
	const { group, groupVersion, decrementGroupVersion, incrementGroupVersion } = useContext(GroupContext);

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
	}, [setPrimaryVersionStyle, primaryVersionWidthRef, group, groupVersion]);

	return {
		group,
		groupVersion,
		decrementGroupVersion,
		incrementGroupVersion,
		primaryVersionStyle,
		primaryVersionWidthRef,
	};
};
