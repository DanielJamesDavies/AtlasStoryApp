// Packages
import { useContext, useEffect, useRef, useState } from "react";

// Components
import { StarTwinkle } from "../../Components/StarTwinkle/StarTwinkle";

// Logic
import { MapFunctions } from "../../MapFunctions";
import { Path } from "../../Components/Path/Path";

// Context
import { LocationsContext } from "../../../LocationsContext";

// Services

// Styles

// Assets

export const StarCluster = ({ location, locations, hierarchyItem, setCursorPointer }) => {
	const { changeCurrentMapLocationId, setIsDisplayingHierarchy, setSelectedLocationId, setHoverMapLocationId } = useContext(LocationsContext);
	const { coordToPosition } = MapFunctions();
	const ref = useRef();
	const [isHovering, setIsHovering] = useState(false);

	function onPointerOver(star_system_id) {
		setHoverMapLocationId(star_system_id);
		setIsHovering(true);
	}

	function onPointerOut() {
		setHoverMapLocationId(false);
		setIsHovering(false);
	}

	useEffect(() => {
		setCursorPointer(isHovering);
	}, [setCursorPointer, isHovering]);

	const clicks = useRef([]);
	const clickTimeout = useRef(false);

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

	function onClickStar(e, starSystem) {
		e.stopPropagation();

		const maxDelta = 400;

		clicks.current.push(Date.now());
		clicks.current = getNewClicks(clicks.current, maxDelta);
		switch (clicks.current.length) {
			case 1:
				clickTimeout.current = setTimeout(() => {
					setIsDisplayingHierarchy(true);
					setSelectedLocationId(starSystem?._id);
				}, maxDelta);
				break;
			case 2:
				clearTimeout(clickTimeout.current);
				setIsDisplayingHierarchy(false);
				setSelectedLocationId(false);
				changeCurrentMapLocationId(starSystem?._id);
				break;
			default:
				break;
		}
	}

	return (
		<group ref={ref}>
			{!hierarchyItem?.children
				? null
				: hierarchyItem?.children.map((child, index) => {
						const starSystem = locations.find((e) => JSON.stringify(e?._id) === JSON.stringify(child?._id));
						return (
							<StarTwinkle
								key={index}
								position={coordToPosition(starSystem?.position, { order: "yxz", multiplier: 0.05 })}
								scale={2}
								onClick={(e) => onClickStar(e, starSystem)}
								onPointerOver={() => onPointerOver(starSystem?._id)}
								onPointerOut={() => onPointerOut()}
							/>
						);
				  })}
			{!location?.paths ? null : location?.paths.map((path, index) => <Path key={index} path={path} locations={locations} />)}
		</group>
	);
};
