// Packages
import { useState, useEffect } from "react";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const AbilityLogic = () => {
	const [abilityRefCurrent, abilityRef] = useState(undefined);

	useEffect(() => {
		function onAbilityRefCurrentScroll(e) {
			if (abilityRefCurrent?.scrollTop === 0) return;
			e.stopPropagation();
		}
		abilityRefCurrent?.addEventListener("wheel", onAbilityRefCurrentScroll);
		return () => abilityRefCurrent?.removeEventListener("wheel", onAbilityRefCurrentScroll);
	}, [abilityRefCurrent]);

	return { abilityRef };
};
