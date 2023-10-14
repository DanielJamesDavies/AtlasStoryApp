// Packages
import { useCallback } from "react";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const MapFunctions = () => {
	const coordToPosition = useCallback((coord, options) => {
		if (coord?.length !== 3) return [0, 0, 0];
		const newOrder = options?.order === undefined || options?.order.length < 3 ? "yzx" : JSON.parse(JSON.stringify(options?.order));
		const newMultiplier = options?.multiplier === undefined ? 1 : JSON.parse(JSON.stringify(options?.multiplier));
		const dimensions = ["x", "y", "z"];
		return dimensions.map((dimension) => coord[newOrder.split("").findIndex((letter) => dimension === letter)] * newMultiplier);
	}, []);

	return { coordToPosition };
};
