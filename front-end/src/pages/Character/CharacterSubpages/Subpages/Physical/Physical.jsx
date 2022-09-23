// Packages

// Components
import { PhysicalAttributeItems } from "./PhysicalAttributeItems/PhysicalAttributeItems";
import { PhysicalOutfitItems } from "./PhysicalOutfitItems/PhysicalOutfitItems";

// Logic
import { PhysicalLogic } from "./PhysicalLogic";

// Context

// Services

// Styles

// Assets

export const Physical = () => {
	const { characterImagesCurrItem, characterImages, openCharacterImages, closeCharacterImages, addImageToItem, onPhysicalItemImageClick } =
		PhysicalLogic();

	return (
		<div
			className={
				characterImagesCurrItem === false
					? "character-subpage-physical"
					: characterImagesCurrItem?.type === "attributes"
					? "character-subpage-physical character-subpage-physical-attribute-character-images-open"
					: "character-subpage-physical character-subpage-physical-outfit-character-images-open"
			}
		>
			<PhysicalAttributeItems
				characterImagesCurrItem={characterImagesCurrItem}
				characterImages={characterImages}
				openCharacterImages={openCharacterImages}
				closeCharacterImages={closeCharacterImages}
				addImageToItem={addImageToItem}
				onPhysicalItemImageClick={onPhysicalItemImageClick}
			/>
			<PhysicalOutfitItems
				characterImagesCurrItem={characterImagesCurrItem}
				characterImages={characterImages}
				openCharacterImages={openCharacterImages}
				closeCharacterImages={closeCharacterImages}
				addImageToItem={addImageToItem}
				onPhysicalItemImageClick={onPhysicalItemImageClick}
			/>
		</div>
	);
};
