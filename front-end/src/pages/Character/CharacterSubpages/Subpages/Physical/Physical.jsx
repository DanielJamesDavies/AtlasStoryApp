// Packages

// Components
import { PhysicalAttributeItems } from "./PhysicalAttributeItems/PhysicalAttributeItems";
import { PhysicalOutfitItems } from "./PhysicalOutfitItems/PhysicalOutfitItems";

// Logic

// Context

// Services

// Styles

// Assets

export const Physical = () => {
	return (
		<div className='character-subpage-physical'>
			<PhysicalAttributeItems />
			<PhysicalOutfitItems />
		</div>
	);
};
