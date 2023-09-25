// Packages

// Components
import { RelationshipsInfoLogic } from "./RelationshipsInfoLogic";
import { RelationshipsInfoFilters } from "./Filters/RelationshipsInfoFilters";
import { RelationshipsInfoRelationshipTypes } from "./RelationshipTypes/RelationshipsInfoRelationshipTypes";
import { Relationships } from "./Relationships/Relationships";
import { ContentItem } from "../../../../../../components/ContentItem/ContentItem";

// Logic

// Context

// Services

// Styles
import "./RelationshipsInfo.css";

// Assets

export const RelationshipsInfo = ({ isDisplayingInfo }) => {
	const { characterRelationshipsInfoRef } = RelationshipsInfoLogic();

	return (
		<div
			ref={characterRelationshipsInfoRef}
			className={
				isDisplayingInfo
					? "unit-page-subpage-relationships-info-container unit-page-subpage-relationships-info-container-is-displaying"
					: "unit-page-subpage-relationships-info-container"
			}
		>
			<ContentItem className='unit-page-subpage-relationships-info' hasBg={true}>
				<Relationships />
				<RelationshipsInfoFilters />
				<RelationshipsInfoRelationshipTypes />
			</ContentItem>
		</div>
	);
};
