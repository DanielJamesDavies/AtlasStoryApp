// Packages
import { useContext, useEffect, useState } from "react";

// Components

// Logic

// Context
import { LocationsContext } from "../../../../LocationsContext";

// Services

// Styles

// Assets

export const HierarchyListItemLogic = ({ item, locationTypes }) => {
	const { selectedLocationId, setSelectedLocationId, currentMapLocationId, setCurrentMapLocationId } = useContext(LocationsContext);
	const [icon, setIcon] = useState(null);

	useEffect(() => {
		function getIcon() {
			let newIcon = locationTypes.find((e) => e?.type === item?.type)?.icon;
			if (newIcon === undefined) newIcon = null;

			setIcon(newIcon);
		}
		getIcon();
	}, [item, locationTypes]);

	function onClickItem(e) {
		e.stopPropagation();
		if (item?._id === undefined) return false;
		setSelectedLocationId(item._id);
		// if (item?.type !== "reality") setCurrentMapLocationId(item._id);
	}

	function onClickTravelToLocation(e) {
		e.stopPropagation();
		if (item?.type !== "reality") setCurrentMapLocationId(item._id);
	}

	return { selectedLocationId, currentMapLocationId, icon, onClickItem, onClickTravelToLocation };
};
