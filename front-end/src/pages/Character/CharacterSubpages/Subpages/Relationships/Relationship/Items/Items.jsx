// Packages

// Components

// Logic
import { ItemsLogic } from "./ItemsLogic";

// Context

// Services

// Styles
import "./Items.css";

// Assets

export const Items = ({ relationship, setRelationship, relationshipCharacterIndex }) => {
	const { itemsRef } = ItemsLogic({ relationship, setRelationship });

	return (
		<div ref={itemsRef} className='character-subpage-relationships-relationship-items'>
			{!relationshipCharacterIndex
				? null
				: relationship["character_" + relationshipCharacterIndex + "_items"].map((item, index) => <div key={index}></div>)}
		</div>
	);
};
