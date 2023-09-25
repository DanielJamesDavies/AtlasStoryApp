// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../UnitPageContext";
import { LightboxContext } from "../../../../../context/LightboxContext";

// Services

// Styles

// Assets

export const PhysicalLogic = () => {
	const { unitVersion, changeUnitVersion, unitImages } = useContext(UnitPageContext);
	const { setLightboxImageIDs, setLightboxIndex } = useContext(LightboxContext);

	const [unitImagesCurrItem, setUnitImagesCurrItem] = useState(false);
	function openUnitImages(type, index) {
		setUnitImagesCurrItem({ type, index });
	}

	function closeUnitImages() {
		setUnitImagesCurrItem(false);
	}

	function addImageToItem(image_id) {
		const newUnitImagesCurrItem = JSON.parse(JSON.stringify(unitImagesCurrItem));
		if (newUnitImagesCurrItem === false) return;
		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		if (newUnitVersion.physical[newUnitImagesCurrItem?.type][newUnitImagesCurrItem?.index].images.findIndex((e) => e.image === image_id) !== -1)
			return false;
		newUnitVersion.physical[newUnitImagesCurrItem?.type][newUnitImagesCurrItem?.index].images.push({
			image: image_id,
			caption: "",
		});
		changeUnitVersion(newUnitVersion);
	}

	function onPhysicalItemImageClick(type, itemIndex, imageIndex) {
		setLightboxImageIDs(unitVersion.physical[type][itemIndex].images);
		setLightboxIndex(imageIndex);
	}

	return { unitImagesCurrItem, unitImages, openUnitImages, closeUnitImages, addImageToItem, onPhysicalItemImageClick };
};
