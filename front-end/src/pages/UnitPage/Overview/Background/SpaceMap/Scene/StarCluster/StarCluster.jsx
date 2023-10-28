// Packages

// Components
import { StarTwinkle } from "../../Components/StarTwinkle/StarTwinkle";

// Logic
import { MapFunctions } from "../../MapFunctions";
import { Path } from "../../Components/Path/Path";

// Context

// Services

// Styles

// Assets

export const StarCluster = ({ location, locations, hierarchyItem }) => {
	const { coordToPosition } = MapFunctions();

	return (
		<group>
			{!hierarchyItem?.children
				? null
				: hierarchyItem?.children.map((child, index) => {
						const starSystem = locations.find((e) => JSON.stringify(e?._id) === JSON.stringify(child?._id));
						return (
							<StarTwinkle
								key={index}
								position={coordToPosition(starSystem?.position, { order: "yxz", multiplier: 0.05 })}
								scale={2}
							/>
						);
				  })}
			{!location?.paths ? null : location?.paths.map((path, index) => <Path key={index} path={path} locations={locations} />)}
		</group>
	);
};
