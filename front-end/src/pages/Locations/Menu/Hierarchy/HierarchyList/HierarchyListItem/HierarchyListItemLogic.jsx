// Packages
import { useContext, useEffect, useState, useRef } from "react";

// Components

// Logic

// Context
import { LocationsContext } from "../../../../LocationsContext";

// Services

// Styles

// Assets

export const HierarchyListItemLogic = ({ item, locationTypes }) => {
	const {
		selectedLocationId,
		setSelectedLocationId,
		hoverMapLocationId,
		currentMapLocationId,
		setCurrentMapLocationId,
		isOnSpaceMap,
		setIsOnSpaceMap,
	} = useContext(LocationsContext);
	const [icon, setIcon] = useState(null);

	useEffect(() => {
		function getIcon() {
			let newIcon = locationTypes.find((e) => e?.type === item?.type)?.icon;
			if (newIcon === undefined) newIcon = null;

			setIcon(newIcon);
		}
		getIcon();
	}, [item, locationTypes]);

	const clicks = useRef([]);

	function getNewClicks(oldClicks, maxDelta) {
		let newClicks = JSON.parse(JSON.stringify(oldClicks));

		let startIndex = 0;
		newClicks.map((curr_click, index) => {
			if (index === newClicks.length - 1) return false;
			const next_click = newClicks[index + 1];
			if (next_click - curr_click > maxDelta) startIndex = index + 1;
			return true;
		});

		return newClicks.filter((_, index) => index >= startIndex);
	}

	function onClickItem(e) {
		e.stopPropagation();
		if (item?._id === undefined) return false;

		const maxDelta = 400;

		clicks.current.push(Date.now());
		clicks.current = getNewClicks(clicks.current, maxDelta);
		switch (clicks.current.length) {
			case 1:
				setSelectedLocationId(item?._id);
				break;
			case 2:
				if (!["reality"].includes(item?.type)) setCurrentMapLocationId(item?._id);
				const newIsOnSpaceMapValue = !["surfaceLocation"].includes(item?.type);
				if (JSON.stringify(newIsOnSpaceMapValue) !== JSON.stringify(isOnSpaceMap)) {
					setIsOnSpaceMap(newIsOnSpaceMapValue);
				}
				break;
			default:
				break;
		}
	}

	function onClickTravelToLocation(e) {
		e.stopPropagation();
		if (item?.type !== "reality") setCurrentMapLocationId(item._id);
		const newIsOnSpaceMapValue = !["surfaceLocation"].includes(item?.type);
		if (JSON.stringify(newIsOnSpaceMapValue) !== JSON.stringify(isOnSpaceMap)) {
			setIsOnSpaceMap(newIsOnSpaceMapValue);
		}
	}

	return { selectedLocationId, hoverMapLocationId, currentMapLocationId, icon, onClickItem, onClickTravelToLocation };
};
