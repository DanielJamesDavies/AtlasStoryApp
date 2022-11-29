// Packages

// Components
import { CharactersRelationshipsInfoFilters } from "./Filters/CharactersRelationshipsInfoFilters";
import { CharactersRelationshipsInfoRelationshipTypes } from "./RelationshipTypes/CharactersRelationshipsInfoRelationshipTypes";
import { CharactersRelationshipsInfoSelectedCharacter } from "./SelectedCharacter/CharactersRelationshipsInfoSelectedCharacter";
import { ContentItem } from "../../../../components/ContentItem/ContentItem";

// Logic

// Context

// Services

// Styles
import "./CharactersRelationshipsInfo.css";

// Assets

export const CharactersRelationshipsInfo = ({ isDisplayingInfo }) => {
	return (
		<div
			className={
				isDisplayingInfo
					? "characters-relationship-info-container characters-relationship-info-container-is-displaying"
					: "characters-relationship-info-container"
			}
		>
			<ContentItem className='characters-relationship-info' hasBg={true}>
				<CharactersRelationshipsInfoSelectedCharacter />
				<CharactersRelationshipsInfoFilters />
				<CharactersRelationshipsInfoRelationshipTypes />
			</ContentItem>
		</div>
	);
};
