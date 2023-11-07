// Packages
import { useCallback, useContext } from "react";

// Components

// Logic

// Context
import { StoryContext } from "../../../../../context/StoryContext";
import { RecentDataContext } from "../../../../../context/RecentDataContext";
import { APIContext } from "../../../../../context/APIContext";

// Services

// Styles

// Assets

export const MapFunctions = () => {
	const { locations } = useContext(StoryContext);
	const { APIRequest } = useContext(APIContext);
	const { recentImages, addImagesToRecentImages } = useContext(RecentDataContext);

	const coordToPosition = useCallback((coord, options) => {
		if (coord?.length !== 3) return [0, 0, 0];
		const newOrder = options?.order === undefined || options?.order.length < 3 ? "yzx" : JSON.parse(JSON.stringify(options?.order));
		const newMultiplier = options?.multiplier === undefined ? 1 : JSON.parse(JSON.stringify(options?.multiplier));
		const dimensions = ["x", "y", "z"];
		return dimensions.map((dimension) => coord[newOrder.split("").findIndex((letter) => dimension === letter)] * newMultiplier);
	}, []);

	const getLocationMapImage = useCallback(
		async (location_id) => {
			const mapImageID = locations?.find((e) => e?._id === location_id)?.data?.mapVersions?.[0]?.mapImage;
			let mapImage = false;

			if (mapImageID) {
				const recentImage = recentImages.current.find((e) => e?._id === mapImageID);
				if (recentImage?.image) {
					mapImage = recentImage;
				} else {
					const map_image_response = await APIRequest("/image/" + mapImageID, "GET");
					if (map_image_response?.errors || !map_image_response?.data?.image?.image) return false;
					mapImage = map_image_response?.data?.image;

					addImagesToRecentImages([mapImage]);
				}

				return mapImage?.image;
			}
		},
		[locations, APIRequest, recentImages, addImagesToRecentImages]
	);

	return { coordToPosition, getLocationMapImage };
};
