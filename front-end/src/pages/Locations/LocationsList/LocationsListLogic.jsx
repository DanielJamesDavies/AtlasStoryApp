// Packages
import { useCallback, useContext, useEffect, useState } from "react";
import Fuse from "fuse.js";

// Components

// Logic

// Context
import { LocationsContext } from "../LocationsContext";
import { RoutesContext } from "../../../context/RoutesContext";
import { APIContext } from "../../../context/APIContext";

// Services

// Styles

// Assets

export const LocationsListLogic = () => {
	const { isAuthorizedToEdit, story_uid, story, locations, locationTypes, setIsDisplayingCreateLocationForm } = useContext(LocationsContext);
	const { changeLocation } = useContext(RoutesContext);
	const { authorized_user_id } = useContext(APIContext);
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

	function onClickLocation(e, location) {
		if (story_uid && location?.uid) {
			changeLocation("/s/" + story_uid + "/l/" + location?.uid, e.button === 1);
		}
	}

	return {
		isAuthorizedToEdit,
		authorized_user_id,
		story,
		locations,
		locationTypes,
		searchedLocations,
		searchValue,
		changeSearchValue,
		onClickLocation,
		setIsDisplayingCreateLocationForm,
	};
};
