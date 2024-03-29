// Packages
import { FaFilter, FaTimes } from "react-icons/fa";

// Components
import { RelationshipsInfoHomeFilterItem } from "./FilterItem/RelationshipsInfoHomeFilterItem";
import { ContentItem } from "../../../../../../../components/ContentItem/ContentItem";
import { IconBtn } from "../../../../../../../components/IconBtn/IconBtn";

// Logic
import { RelationshipsInfoFiltersLogic } from "./RelationshipsInfoFiltersLogic";

// Context

// Services

// Styles
import "./RelationshipsInfoFilters.css";

// Assets

export const RelationshipsInfoFilters = () => {
	const { story, storyGroups, isDisplayingFilters, toggleIsDisplayingFilters, relationshipsFilters, toggleFilter } =
		RelationshipsInfoFiltersLogic();

	if (relationshipsFilters === false) return null;
	return (
		<div className='characters-relationship-info-home-filters-container'>
			<div className='characters-relationship-info-home-filters-primary'>
				<div className='characters-relationship-info-home-filters-title'>Filters</div>
				<div className='characters-relationship-info-home-filters-buttons-container'>
					<IconBtn
						icon={<FaFilter />}
						iconName='filter'
						iconSmall={!isDisplayingFilters ? undefined : <FaTimes />}
						onClick={toggleIsDisplayingFilters}
						seamless={true}
					/>
				</div>
			</div>
			{!isDisplayingFilters ? null : (
				<ContentItem className='characters-relationship-info-home-filters' size='s' margin='none' hasBg={true} backgroundColour='grey3'>
					<div className='characters-relationship-info-home-filters-subtitle'>Groups</div>
					<div className='characters-relationship-info-home-filters-list'>
						{storyGroups?.map((group, index) => (
							<RelationshipsInfoHomeFilterItem
								key={index}
								name={group?.data?.name}
								isActive={relationshipsFilters.groups.findIndex((e) => e === group._id) !== -1}
								onClick={() => toggleFilter(group._id, "groups")}
							/>
						))}
					</div>
					<div className='characters-relationship-info-home-filters-subtitle'>Relationship Types</div>
					<div className='characters-relationship-info-home-filters-list'>
						{story?.data?.characterRelationshipTypes?.map((relationshipType, index) => (
							<RelationshipsInfoHomeFilterItem
								key={index}
								name={relationshipType?.name}
								isActive={relationshipsFilters.relationshipTypes.findIndex((e) => e === relationshipType._id) !== -1}
								onClick={() => toggleFilter(relationshipType._id, "relationshipTypes")}
							/>
						))}
					</div>
				</ContentItem>
			)}
		</div>
	);
};
