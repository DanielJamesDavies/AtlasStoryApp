// Packages
import { useContext, useEffect, useState } from "react";

// Components

// Logic
import { CharactersContext } from "../../../CharactersContext";

// Context

// Services

// Styles

// Assets

export const CharactersRelationshipsInfoFiltersLogic = () => {
	const {
		story,
		storyGroups,
		relationshipsFilters,
		setRelationshipsFilters,
		isShowingRelationshipsBackgroundCharacters,
		setIsShowingRelationshipsBackgroundCharacters,
		isShowingRelationshipsCharactersWithNoRelationships,
		setIsShowingRelationshipsCharactersWithNoRelationships,
	} = useContext(CharactersContext);

	const [isDisplayingFilters, setIsDisplayingFilters] = useState(false);

	function toggleIsDisplayingFilters() {
		setIsDisplayingFilters((oldIsDisplayingFilters) => !oldIsDisplayingFilters);
	}

	useEffect(() => {
		function getRelationshipsFilters() {
			if (relationshipsFilters !== false) return false;
			if (!story?.data?.characterRelationshipTypes || !storyGroups || storyGroups.length === 0) return false;

			const newRelationshipsFilters = {
				groups: storyGroups.map((group) => group?._id).filter((e) => e !== false),
				relationshipTypes: story?.data?.characterRelationshipTypes
					.map((relationshipType) => relationshipType?._id)
					.filter((e) => e !== false),
			};
			setRelationshipsFilters(newRelationshipsFilters);
		}

		getRelationshipsFilters();
	}, [setRelationshipsFilters, relationshipsFilters, storyGroups, story]);

	function toggleFilter(id, type) {
		const newRelationshipsFilters = JSON.parse(JSON.stringify(relationshipsFilters));
		const filterIndex = newRelationshipsFilters[type].findIndex((e) => e === id);
		if (filterIndex === -1) {
			newRelationshipsFilters[type].push(id);
		} else {
			newRelationshipsFilters[type].splice(filterIndex, 1);
		}
		setRelationshipsFilters(newRelationshipsFilters);
	}

	function toggleIsRelationshipsShowingBackgroundCharacters() {
		setIsShowingRelationshipsBackgroundCharacters((oldValue) => !oldValue);
	}

	function toggleIsShowingRelationshipsCharactersWithNoRelationships() {
		setIsShowingRelationshipsCharactersWithNoRelationships((oldValue) => !oldValue);
	}

	return {
		story,
		storyGroups,
		isDisplayingFilters,
		toggleIsDisplayingFilters,
		relationshipsFilters,
		toggleFilter,
		isShowingRelationshipsBackgroundCharacters,
		toggleIsRelationshipsShowingBackgroundCharacters,
		isShowingRelationshipsCharactersWithNoRelationships,
		toggleIsShowingRelationshipsCharactersWithNoRelationships,
	};
};
