// Packages
import { useCallback, useContext, useEffect, useState } from "react";
import Fuse from "fuse.js";

// Components

// Logic

// Context
import { LocationsContext } from "../LocationsContext";
import { RoutesContext } from "../../../context/RoutesContext";

// Services

// Styles

// Assets

export const LocationsListLogic = () => {
	const { story_uid, locations, locationTypes } = useContext(LocationsContext);
	const { changeLocation } = useContext(RoutesContext);
	const [searchedLocations, setSearchedLocations] = useState([]);
	const [searchValue, setSearchValue] = useState("");

	const updateSearchedLocations = useCallback(() => {
		if (searchValue.length === 0) {
			setSearchedLocations(locations);
		} else {
			const fuse = new Fuse(locations, { keys: ["data.name"], findAllMatches: true, threshold: 1 });
			const newSearchedLocations = fuse.search(searchValue);
			setSearchedLocations(newSearchedLocations.map((e) => e?.item).slice(0, 6));
		}
	}, [locations, searchValue]);

	function changeSearchValue(e) {
		setSearchValue(e.target.value);
	}

	useEffect(() => updateSearchedLocations(), [locations, searchValue, updateSearchedLocations]);

	function onClickLocation(location) {
		if (story_uid && location?.uid) {
			changeLocation("/s/" + story_uid + "/l/" + location?.uid);
		}
	}

	return { locationTypes, searchedLocations, searchValue, changeSearchValue, onClickLocation };
};
