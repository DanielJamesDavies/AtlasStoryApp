// Packages
import { useContext, useEffect, useRef, useState } from "react";

// Components
import { StarTwinkle } from "../../Objects/StarTwinkle/StarTwinkle";

// Logic
import { MapFunctions } from "../../MapFunctions";
import { Path } from "../../Objects/Path/Path";

// Context
import { LocationsContext } from "../../../LocationsContext";

// Services

// Styles

// Assets

export const StarCluster = ({ location, locations, hierarchyItem, setCursorPointer }) => {
	const { setIsDisplayingHierarchy, setSelectedLocationId } = useContext(LocationsContext);
	const { coordToPosition } = MapFunctions();
	const ref = useRef();
	const [hoverStarSystemId, setHoverStarSystemId] = useState(false);

	useEffect(() => {
		setCursorPointer(hoverStarSystemId !== false);
	}, [setCursorPointer, hoverStarSystemId]);

	function onClickStar(starSystem) {
		setIsDisplayingHierarchy(true);
		setSelectedLocationId(starSystem?._id);
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
								scale={1.8}
								onClick={() => onClickStar(starSystem)}
								onPointerOver={() => setHoverStarSystemId(starSystem?._id)}
								onPointerOut={() => setHoverStarSystemId(false)}
							/>
						);
				  })}
			{!location?.paths ? null : location?.paths.map((path, index) => <Path key={index} path={path} locations={locations} />)}
		</group>
	);
};
