// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../UnitPageContext";
import { LightboxContext } from "../../../../../context/LightboxContext";

// Services

// Styles

// Assets

export const MiscellaneousItemLogic = ({ miscellaneousItem, index, unitImagesCurrDevItemIndex, isEditing }) => {
	const { unitImages, setUnit } = useContext(UnitPageContext);
	const { setLightboxImageIDs, setLightboxIndex } = useContext(LightboxContext);

	async function reorderMiscellaneousItemImages(res) {
		if (res.from === undefined || res.to === undefined) return false;
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			const tempDevImageItem = newUnit.data.miscellaneous.items[index].images.splice(res.from, 1)[0];
			newUnit.data.miscellaneous.items[index].images.splice(res.to, 0, tempDevImageItem);
			return newUnit;
		});
	}

	function changeMiscellaneousItemImageCaption(e, imageIndex) {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.data.miscellaneous.items[index].images[imageIndex].caption = e.target.value;
			return newUnit;
		});
	}

	function removeDevItemImage(imageIndex) {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.data.miscellaneous.items[index].images.splice(imageIndex, 1);
			return newUnit;
		});
	}

	function onMiscellaneousItemImageClick(imageIndex) {
		setLightboxImageIDs(miscellaneousItem.images);
		setLightboxIndex(imageIndex);
	}

	const [devItemTextContainerClassName, setDevItemTextContainerClassName] = useState("unit-page-subpage-miscellaneous-item-text-container");
	const [devItemImagesContainerClassName, setDevItemImagesContainerClassName] = useState("unit-page-subpage-miscellaneous-item-images-container");
	useEffect(() => {
		function getDevItemTextContainerClassName() {
			let newClassName = "unit-page-subpage-miscellaneous-item-text-container";
			if (!isEditing) {
				if (miscellaneousItem?.images?.length === 0) newClassName += " unit-page-subpage-miscellaneous-item-text-container-full-width";
				if (!miscellaneousItem?.text || miscellaneousItem?.text?.join("")?.replaceAll(" ", "")?.length === 0)
					newClassName += " unit-page-subpage-miscellaneous-item-text-container-no-width";
			}
			return newClassName;
		}
		function getDevItemImagesContainerClassName() {
			let newClassName = "unit-page-subpage-miscellaneous-item-images-container";
			if (unitImagesCurrDevItemIndex === index) newClassName += " unit-page-subpage-miscellaneous-item-images-container-is-current";
			if (!isEditing) {
				if (miscellaneousItem?.images?.length === 0) newClassName += " unit-page-subpage-miscellaneous-item-images-container-no-width";
				if (!miscellaneousItem?.text || miscellaneousItem?.text?.join("")?.replaceAll(" ", "")?.length === 0)
					newClassName += " unit-page-subpage-miscellaneous-item-images-container-full-width";
			}
			return newClassName;
		}
		setDevItemTextContainerClassName(getDevItemTextContainerClassName());
		setDevItemImagesContainerClassName(getDevItemImagesContainerClassName());
	}, [setDevItemTextContainerClassName, setDevItemImagesContainerClassName, miscellaneousItem, index, unitImagesCurrDevItemIndex, isEditing]);

	return {
		unitImages,
		reorderMiscellaneousItemImages,
		changeMiscellaneousItemImageCaption,
		removeDevItemImage,
		onMiscellaneousItemImageClick,
		devItemTextContainerClassName,
		devItemImagesContainerClassName,
	};
};
