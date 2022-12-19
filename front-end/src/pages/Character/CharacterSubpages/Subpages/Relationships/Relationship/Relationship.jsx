// Packages

// Components
import { Header } from "./Header/Header";
import { Items } from "./Items/Items";
import { ContentItem } from "../../../../../../components/ContentItem/ContentItem";

// Logic
import { RelationshipLogic } from "./RelationshipLogic";

// Context

// Services

// Styles
import "./Relationship.css";

// Assets

export const Relationship = ({ isDisplayingInfo }) => {
	const { relationshipRef, relationship, setRelationship, relationshipCharacterIndex } = RelationshipLogic();

	return (
		<div
			ref={relationshipRef}
			className={
				isDisplayingInfo
					? "character-subpage-relationships-relationship-container character-subpage-relationships-relationship-container-is-displaying"
					: "character-subpage-relationships-relationship-container"
			}
		>
			<ContentItem className='character-subpage-relationships-relationship' hasBg={true}>
				<Header relationship={relationship} setRelationship={setRelationship} />
				<Items relationship={relationship} setRelationship={setRelationship} relationshipCharacterIndex={relationshipCharacterIndex} />
			</ContentItem>
		</div>
	);
};
