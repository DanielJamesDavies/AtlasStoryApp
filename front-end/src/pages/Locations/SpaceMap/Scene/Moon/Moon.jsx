// Packages
import { useContext, useEffect, useRef, useState } from "react";

// Components
import { Moon as MoonObject } from "../../Components/Moon/Moon";

// Logic
import { MapFunctions } from "../../MapFunctions";

// Context
import { LocationsContext } from "../../../LocationsContext";

// Services

// Styles

// Assets

export const Moon = ({ location, setCursorPointer }) => {
	const { setIsDisplayingHierarchy, setSelectedLocationId, setHoverMapLocationId, locations3DMapImages } = useContext(LocationsContext);
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

	function onClickLocation(e, input_location) {
		e.stopPropagation();

		setIsDisplayingHierarchy(true);
		setSelectedLocationId(input_location?._id);
	}

	return (
		<group ref={ref} position={[1, 0, 0]} rotation={[Math.PI, 0, 0]}>
			<MoonObject
				position={coordToPosition(location?.position, { order: "yxz", multiplier: 0.05 })}
				scale={1}
				onClick={(e) => onClickLocation(e, location)}
				onPointerOver={onPointerOver}
				onPointerOut={onPointerOut}
				image={
					locations3DMapImages === false
						? undefined
						: locations3DMapImages?.find((e) => e._id === location?.data?.mapImage)?.image || false
				}
			/>
		</group>
	);
};
