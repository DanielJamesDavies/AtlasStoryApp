// Packages
import { useContext, useEffect, useState } from "react";

// Components

// Logic
import { CharacterContext } from "../../../../../CharacterContext";

// Context

// Services

// Styles

// Assets

export const CharacterRelationshipsInfoFiltersLogic = () => {
	const { story, storyGroups, relationshipsFilters, setRelationshipsFilters } = useContext(CharacterContext);

	const [isDisplayingFilters, setIsDisplayingFilters] = useState(false);

	function toggleIsDisplayingFilters() {
		setIsDisplayingFilters((oldIsDisplayingFilters) => !oldIsDisplayingFilters);
	}

	useEffect(() => {
		function getRelationshipsFilters() {
			if (relationshipsFilters !== false) return false;
			if (!storyGroups) return false;

			let newRelationshipsFilters = {
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

	return { story, storyGroups, isDisplayingFilters, toggleIsDisplayingFilters, relationshipsFilters, toggleFilter };
};
