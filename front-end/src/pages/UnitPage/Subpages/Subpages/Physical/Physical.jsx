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
	const { unitImagesCurrItem, unitImages, openUnitImages, closeUnitImages, addImageToItem, onPhysicalItemImageClick } = PhysicalLogic();

	return (
		<div
			className={
				unitImagesCurrItem === false
					? "unit-page-subpage-physical"
					: unitImagesCurrItem?.type === "attributes"
					? "unit-page-subpage-physical unit-page-subpage-physical-attribute-unit-page-images-open"
					: "unit-page-subpage-physical unit-page-subpage-physical-outfit-unit-page-images-open"
			}
		>
			<div className='unit-page-subpage-physical-section-1'>
				<PhysicalAttributeItems
					unitImagesCurrItem={unitImagesCurrItem}
					unitImages={unitImages}
					openUnitImages={openUnitImages}
					closeUnitImages={closeUnitImages}
					addImageToItem={addImageToItem}
					onPhysicalItemImageClick={onPhysicalItemImageClick}
				/>
			</div>
			<div className='unit-page-subpage-physical-section-2'>
				<PhysicalOutfitItems
					unitImagesCurrItem={unitImagesCurrItem}
					unitImages={unitImages}
					openUnitImages={openUnitImages}
					closeUnitImages={closeUnitImages}
					addImageToItem={addImageToItem}
					onPhysicalItemImageClick={onPhysicalItemImageClick}
				/>
			</div>
		</div>
	);
};
