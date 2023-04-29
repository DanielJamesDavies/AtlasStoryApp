// Packages
import { useContext, useEffect, useState } from "react";

// Components
import { StarCluster } from "./StarCluster/StarCluster";

// Logic

// Context
import { LocationsContext } from "../../LocationsContext";

// Services
import { HierarchyFunctions } from "../../HierarchyFunctions";

// Styles

// Assets

export const Scene = ({ setCursorPointer }) => {
	const { story, locations, currentMapLocationId } = useContext(LocationsContext);
	const { getItemFromIdInHierarchy } = HierarchyFunctions();
	const [scene, setScene] = useState(null);

	useEffect(() => {
		function getScene() {
			if (currentMapLocationId === false) return setScene(null);

			let newScene = null;

			const location = locations.find((e) => JSON.stringify(e?._id) === JSON.stringify(currentMapLocationId));

			const hierarchyItem = getItemFromIdInHierarchy(
				JSON.parse(JSON.stringify(currentMapLocationId)),
				JSON.parse(JSON.stringify(story?.data?.locationsHierarchy))
			);

			switch (location?.type) {
				case "starCluster":
					newScene = (
						<StarCluster location={location} locations={locations} hierarchyItem={hierarchyItem} setCursorPointer={setCursorPointer} />
					);
					break;
				default:
					break;
			}

			setScene(newScene);
		}
		getScene();
	}, [setScene, story, locations, currentMapLocationId, getItemFromIdInHierarchy, setCursorPointer]);

	return scene;
};
