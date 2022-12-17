// Packages
import { useRef, useEffect } from "react";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const ItemsLogic = ({ relationship, setRelationship }) => {
	const itemsRef = useRef();

	useEffect(() => {
		const itemsRefCurrent = itemsRef?.current;
		const onWheel = (e) => (itemsRefCurrent?.scrollTop !== 0 ? e.stopPropagation() : null);
		if (itemsRefCurrent) itemsRefCurrent.addEventListener("wheel", onWheel);
		return () => (itemsRefCurrent ? itemsRefCurrent.removeEventListener("wheel", onWheel) : null);
	}, [itemsRef]);

	return { itemsRef };
};
