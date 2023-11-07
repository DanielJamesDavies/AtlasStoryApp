// Packages
import { useContext, useEffect, useRef, useState } from "react";

// Components
import { Planet as PlanetObject } from "../../Components/Planet/Planet";

// Logic
import { MapFunctions } from "../../MapFunctions";

// Context
import { LocationsContext } from "../../../LocationsContext";

// Services

// Styles

// Assets

export const Planet = ({ location, setCursorPointer }) => {
	const { setIsDisplayingHierarchy, setSelectedLocationId, setHoverMapLocationId, setIsOnSpaceMap, locations3DMapImages } =
		useContext(LocationsContext);
	const { coordToPosition } = MapFunctions();
	const ref = useRef();
	const [isHovering, setIsHovering] = useState(false);

	function onPointerOver(e, location_id) {
		e.stopPropagation();
		setHoverMapLocationId(location_id);
		setIsHovering(true);
	}

	function onPointerOut(e) {
		e.stopPropagation();
		setHoverMapLocationId(false);
		setIsHovering(false);
	}

	useEffect(() => {
		setCursorPointer(isHovering);
	}, [setCursorPointer, isHovering]);

	const clicks = useRef([]);
	const clickTimeout = useRef(false);

	function onClickLocation(e, input_location) {
		e.stopPropagation();

		const maxDelta = 400;

		clicks.current.push(Date.now());
		clicks.current = getNewClicks(clicks.current, maxDelta);
		switch (clicks.current.length) {
			case 1:
				clickTimeout.current = setTimeout(() => {
					setIsDisplayingHierarchy(true);
					setSelectedLocationId(input_location?._id);
				}, maxDelta);
				break;
			case 2:
				clearTimeout(clickTimeout.current);
				setIsDisplayingHierarchy(false);
				setSelectedLocationId(false);

				setIsOnSpaceMap(false);
				break;
			default:
				break;
		}
	}

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

	return (
		<group ref={ref} position={[1, 0, 0]}>
			<PlanetObject
				position={coordToPosition(location?.position, { order: "yxz", multiplier: 0.05 })}
				scale={1}
				onClick={(e) => onClickLocation(e, location)}
				onPointerOver={onPointerOver}
				onPointerOut={onPointerOut}
				image={
					locations3DMapImages === false ? undefined : locations3DMapImages?.find((e) => e?.location_id === location?._id)?.image || false
				}
			/>
		</group>
	);
};
