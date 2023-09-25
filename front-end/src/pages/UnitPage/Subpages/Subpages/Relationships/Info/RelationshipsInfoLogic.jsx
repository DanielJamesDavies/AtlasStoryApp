// Packages
import { useRef, useEffect } from "react";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const RelationshipsInfoLogic = () => {
	const characterRelationshipsInfoRef = useRef();

	useEffect(() => {
		const characterRelationshipsInfoRefCurrent = characterRelationshipsInfoRef?.current;

		function onWheel(e) {
			if (characterRelationshipsInfoRefCurrent?.scrollTop !== 0) e.stopPropagation();
		}

		if (characterRelationshipsInfoRefCurrent) characterRelationshipsInfoRefCurrent.addEventListener("wheel", onWheel);
		return () => {
			if (characterRelationshipsInfoRefCurrent) characterRelationshipsInfoRefCurrent.removeEventListener("wheel", onWheel);
		};
	}, [characterRelationshipsInfoRef]);

	return { characterRelationshipsInfoRef };
};
