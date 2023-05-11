import React, { createContext, useContext, useEffect, useRef, useState } from "react";

import { StoryContext } from "../../../../context/StoryContext";

export const LocationContext = createContext();

const LocationProvider = ({ children, location_id }) => {
	const { isAuthorizedToEdit, story, locations, setLocations } = useContext(StoryContext);

	const subpages = [
		{ id: "overview", name: "Overview" },
		{ id: "gallery", name: "Gallery" },
		{ id: "miscellaneous", name: "Miscellaneous" },
		{ id: "development", name: "Development" },
		{ id: "settings", name: "Settings" },
	];

	const [location, setLocation] = useState(false);
	const [openSubpageID, setOpenSubpageID] = useState("overview");

	const curr_location_id = useRef(false);
	useEffect(() => {
		function getInitial() {
			if (curr_location_id.current === location_id) return false;
			curr_location_id.current = location_id;

			let newLocations = JSON.parse(JSON.stringify(locations));
			const locationIndex = newLocations.findIndex((e) => JSON.stringify(e._id) === JSON.stringify(location_id));
			if (locationIndex === -1) return false;
			setLocation(JSON.parse(JSON.stringify(newLocations[locationIndex])));
		}
		getInitial();
	}, [location_id, setLocation, locations]);

	function changeLocation(newLocation) {
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e._id) === JSON.stringify(location_id));
		if (locationIndex === -1) return false;
		newLocations[locationIndex] = newLocation;
		setLocations(newLocations);

		setLocation(newLocation);
	}

	return (
		<LocationContext.Provider
			value={{ location_id, isAuthorizedToEdit, story, locations, location, changeLocation, subpages, openSubpageID, setOpenSubpageID }}
		>
			{children}
		</LocationContext.Provider>
	);
};

export default LocationProvider;
