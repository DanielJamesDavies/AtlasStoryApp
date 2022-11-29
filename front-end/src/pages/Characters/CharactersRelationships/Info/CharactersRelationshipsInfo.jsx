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

export const CharactersRelationshipsInfo = () => {
	return (
		<div className='characters-relationship-info-container'>
			<ContentItem hasBg={true}>
				<CharactersRelationshipsInfoSelectedCharacter />
				<CharactersRelationshipsInfoFilters />
				<CharactersRelationshipsInfoRelationshipTypes />
			</ContentItem>
		</div>
	);
};
