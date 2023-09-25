// Packages
import { useContext, useEffect, useState } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../UnitPageContext";

// Services

// Styles

// Assets

export const GalleryItemLogic = ({ image, index }) => {
	const { unit_type, unit, setUnit, unitImages, unitVersion, changeUnitVersion } = useContext(UnitPageContext);

	const [galleryItemImage, setGalleryItemImage] = useState(false);

	useEffect(() => {
		function getGalleryItemImage() {
			if (!image?.image) return false;
			let newGalleryItemImage = unitImages.find((e) => e._id === image.image);
			if (!newGalleryItemImage) return false;
			return newGalleryItemImage.image;
		}
		setGalleryItemImage(getGalleryItemImage());
	}, [setGalleryItemImage, unitImages, image]);

	function changeGalleryItemCaption(e) {
		if (["character", "group"].includes(unit_type)) {
			let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
			newUnitVersion.gallery[index].caption = e.target.value;
			changeUnitVersion(newUnitVersion);
		} else {
			let newUnit = JSON.parse(JSON.stringify(unit));
			newUnit.data.gallery[index].caption = e.target.value;
			setUnit(newUnit);
		}
	}

	return { galleryItemImage, changeGalleryItemCaption };
};
