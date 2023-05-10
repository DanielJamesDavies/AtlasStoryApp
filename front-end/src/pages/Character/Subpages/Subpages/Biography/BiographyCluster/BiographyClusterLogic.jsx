// Packages
import { useState, useEffect } from "react";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const BiographyClusterLogic = () => {
	const [biographyClusterRefCurrent, biographyClusterRef] = useState(undefined);

	useEffect(() => {
		function onBiographyClusterScroll(e) {
			if (biographyClusterRefCurrent?.scrollTop === 0) return;
			e.stopPropagation();
		}
		biographyClusterRefCurrent?.addEventListener("wheel", onBiographyClusterScroll);
		return () => biographyClusterRefCurrent?.removeEventListener("wheel", onBiographyClusterScroll);
	}, [biographyClusterRefCurrent]);

	return { biographyClusterRef };
};
