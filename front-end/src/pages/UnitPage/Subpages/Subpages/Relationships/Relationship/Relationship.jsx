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
	const { relationshipRef, relationship, changeRelationship, relationshipCharacterIndex } = RelationshipLogic();

	return (
		<div
			ref={relationshipRef}
			className={
				isDisplayingInfo
					? "unit-page-subpage-relationships-relationship-container unit-page-subpage-relationships-relationship-container-is-displaying"
					: "unit-page-subpage-relationships-relationship-container"
			}
		>
			<ContentItem className='unit-page-subpage-relationships-relationship' hasBg={true}>
				<Header relationship={relationship} changeRelationship={changeRelationship} />
				<Items
					relationship={relationship}
					changeRelationship={changeRelationship}
					relationshipCharacterIndex={relationshipCharacterIndex}
				/>
			</ContentItem>
		</div>
	);
};
