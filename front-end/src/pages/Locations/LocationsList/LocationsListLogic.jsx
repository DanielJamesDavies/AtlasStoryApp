// Packages
import { useCallback, useContext, useEffect, useState } from "react";
import Fuse from "fuse.js";

// Components

// Logic

// Context
import { LocationsContext } from "../LocationsContext";

// Services

// Styles

// Assets

export const LocationsListLogic = () => {
	const { locations, locationTypes, setIsOnMap, changeCurrentMapLocationId } = useContext(LocationsContext);
	const [searchedLocations, setSearchedLocations] = useState([]);
	const [searchValue, setSearchValue] = useState("");

	const updateSearchedLocations = useCallback(() => {
		if (searchValue.length === 0) {
			setSearchedLocations(locations);
		} else {
			const fuse = new Fuse(locations, { keys: ["data.name"] });
			const newSearchedLocations = fuse.search(searchValue);
			setSearchedLocations(newSearchedLocations.map((e) => e?.item));
		}
	}, [locations, searchValue]);

	function changeSearchValue(e) {
		setSearchValue(e.target.value);
	}

	useEffect(() => updateSearchedLocations(), [locations, searchValue, updateSearchedLocations]);

	function onClickLocation(location) {
		if (locationTypes.find((e) => e.type === location?.type)?.hasMapScene) {
			setIsOnMap(true);
			changeCurrentMapLocationId(location?._id);
		}
	}

	return { locationTypes, searchedLocations, searchValue, changeSearchValue, onClickLocation };
};
