// Packages

// Components
import { Star as StarObject } from "../../Components/Star/Star";

// Logic
import { MapFunctions } from "../../MapFunctions";

// Context

// Services

// Styles

// Assets

export const Star = ({ location }) => {
	const { coordToPosition } = MapFunctions();

	return (
		<group position={[1, 0, 0]}>
			<StarObject position={coordToPosition(location?.position, { order: "yxz", multiplier: 0.05 })} scale={1} />
		</group>
	);
};
