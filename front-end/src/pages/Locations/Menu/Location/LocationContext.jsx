import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

import { LocationsContext } from "../../LocationsContext";
import { APIContext } from "../../../../context/APIContext";

export const LocationContext = createContext();

const LocationProvider = ({ children, location_id }) => {
	const { isAuthorizedToEdit, story, locations, setLocations, selectedLocationId } = useContext(LocationsContext);
	const { APIRequest } = useContext(APIContext);

	const subpages = [
		{ id: "description", name: "Description" },
		{ id: "properties", name: "Properties" },
		{ id: "gallery", name: "Gallery" },
		{ id: "miscellaneous", name: "Miscellaneous" },
		{ id: "development", name: "Development" },
		{ id: "settings", name: "Settings" },
	];

	const [location, setLocation] = useState(false);
	const [openSubpageID, setOpenSubpageID] = useState("description");
	const [locationImages, setLocationImages] = useState([]);

	const curr_location_id = useRef(false);
	useEffect(() => {
		async function getInitial() {
			if (curr_location_id.current === location_id) return false;
			curr_location_id.current = location_id;

			const newLocation = await getLocation();
			getImages(newLocation);
		}

		async function getLocation() {
			let newLocations = JSON.parse(JSON.stringify(locations));
			const locationIndex = newLocations.findIndex((e) => JSON.stringify(e._id) === JSON.stringify(location_id));
			if (locationIndex === -1) return false;
			const newLocation = JSON.parse(JSON.stringify(newLocations[locationIndex]));
			setLocation(newLocation);
			return newLocation;
		}

		async function getImages(newLocation) {
			let newImages = [];

			if (newLocation?.data?.gallery) {
				const galleryImages = await Promise.all(
					newLocation?.data?.gallery.map(async (item) => {
						const response = await APIRequest("/image/" + item.image, "GET");
						if (response?.errors || !response?.data?.image?.image) return false;
						return response?.data?.image;
					})
				);
				newImages = newImages.concat(galleryImages.filter((e) => e));
			}

			setLocationImages(newImages);
			return newImages;
		}

		getInitial();
	}, [location_id, setLocation, locations, APIRequest]);

	const changeLocation = useCallback(
		(newLocation) => {
			setLocation(newLocation);
			setLocations((oldLocations) => {
				let newLocations = JSON.parse(JSON.stringify(oldLocations));
				const locationIndex = newLocations.findIndex((e) => e._id === selectedLocationId);
				if (locationIndex === -1) return newLocations;
				newLocations[locationIndex] = JSON.parse(JSON.stringify(newLocation));
				return newLocations;
			});
		},
		[setLocation, setLocations, selectedLocationId]
	);

	return (
		<LocationContext.Provider
			value={{
				location_id,
				isAuthorizedToEdit,
				story,
				locations,
				location,
				setLocation,
				changeLocation,
				locationImages,
				setLocationImages,
				subpages,
				openSubpageID,
				setOpenSubpageID,
			}}
		>
			{children}
		</LocationContext.Provider>
	);
};

export default LocationProvider;
