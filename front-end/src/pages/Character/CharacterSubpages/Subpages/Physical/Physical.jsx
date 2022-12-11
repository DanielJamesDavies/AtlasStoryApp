// Packages

// Components
import { PhysicalAttributeItems } from "./PhysicalAttributeItems/PhysicalAttributeItems";
import { PhysicalOutfitItems } from "./PhysicalOutfitItems/PhysicalOutfitItems";

// Logic
import { PhysicalLogic } from "./PhysicalLogic";

// Context

// Services

// Styles
import "./Physical.css";

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
			<div className='character-subpage-physical-section-1'>
				<PhysicalAttributeItems
					characterImagesCurrItem={characterImagesCurrItem}
					characterImages={characterImages}
					openCharacterImages={openCharacterImages}
					closeCharacterImages={closeCharacterImages}
					addImageToItem={addImageToItem}
					onPhysicalItemImageClick={onPhysicalItemImageClick}
				/>
			</div>
			<div className='character-subpage-physical-section-2'>
				<PhysicalOutfitItems
					characterImagesCurrItem={characterImagesCurrItem}
					characterImages={characterImages}
					openCharacterImages={openCharacterImages}
					closeCharacterImages={closeCharacterImages}
					addImageToItem={addImageToItem}
					onPhysicalItemImageClick={onPhysicalItemImageClick}
				/>
			</div>
		</div>
	);
};
