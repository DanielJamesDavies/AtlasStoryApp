// Packages
import { useEffect, useState } from "react";

// Components
import { Moon as MoonObject } from "../../Components/Moon/Moon";

// Logic
import { MapFunctions } from "../../MapFunctions";

// Context

// Services

// Styles

// Assets

export const Moon = ({ location }) => {
	const { coordToPosition, getLocationMapImage } = MapFunctions();
	const [mapImage, setMapImage] = useState(undefined);

	useEffect(() => {
		async function getMapImage() {
			const newMapImage = await getLocationMapImage(location?._id);
			setMapImage(newMapImage);
		}
		getMapImage();
	}, [location, getLocationMapImage]);

	return (
		<group position={[1, 0, 0]} rotation={[Math.PI, 0, 0]}>
			<MoonObject position={coordToPosition(location?.position, { order: "yxz", multiplier: 0.05 })} scale={1} image={mapImage} />
		</group>
	);
};
