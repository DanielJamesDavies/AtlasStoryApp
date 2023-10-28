// Packages
import { useState, useEffect } from "react";

// Components
import { Planet as PlanetObject } from "../../Components/Planet/Planet";

// Logic
import { MapFunctions } from "../../MapFunctions";

// Context

// Services

// Styles

// Assets

export const Planet = ({ location }) => {
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
		<group position={[1, 0, 0]}>
			<PlanetObject position={coordToPosition(location?.position, { order: "yxz", multiplier: 0.05 })} scale={1} image={mapImage} />
		</group>
	);
};
