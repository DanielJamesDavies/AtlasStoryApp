// Packages
import { useEffect, useState } from "react";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const HierarchyListItemLogic = ({ item, locationTypes }) => {
	const [icon, setIcon] = useState(null);

	useEffect(() => {
		function getIcon() {
			let newIcon = locationTypes.find((e) => e?.type === item?.type)?.icon;
			if (newIcon === undefined) newIcon = null;

			setIcon(newIcon);
		}
		getIcon();
	}, [item, locationTypes]);

	return { icon };
};
