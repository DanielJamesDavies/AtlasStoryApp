// Packages

// Components
import { CharacterRelationshipsInfoLogic } from "./CharacterRelationshipsInfoLogic";
import { CharacterRelationshipsInfoFilters } from "./Filters/CharacterRelationshipsInfoFilters";
import { CharacterRelationshipsInfoRelationshipTypes } from "./RelationshipTypes/CharacterRelationshipsInfoRelationshipTypes";
import { Relationships } from "./Relationships/Relationships";
import { ContentItem } from "../../../../../../components/ContentItem/ContentItem";

// Logic

// Context

// Services

// Styles
import "./CharacterRelationshipsInfo.css";

// Assets

export const CharacterRelationshipsInfo = ({ isDisplayingInfo }) => {
	const { characterRelationshipsInfoRef } = CharacterRelationshipsInfoLogic();

	return (
		<div
			ref={characterRelationshipsInfoRef}
			className={
				isDisplayingInfo
					? "character-subpage-relationships-info-container character-subpage-relationships-info-container-is-displaying"
					: "character-subpage-relationships-info-container"
			}
		>
			<ContentItem className='character-subpage-relationships-info' hasBg={true}>
				<Relationships />
				<CharacterRelationshipsInfoFilters />
				<CharacterRelationshipsInfoRelationshipTypes />
			</ContentItem>
		</div>
	);
};
