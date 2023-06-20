// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { GroupContext } from "../../../GroupContext";
import { LightboxContext } from "../../../../../context/LightboxContext";

// Services

// Styles

// Assets

export const CustomItemLogic = ({ customItem, index, groupImagesCurrDevItemIndex, isEditing }) => {
	const { groupImages, setGroup, openSubpageID } = useContext(GroupContext);
	const { setLightboxImageIDs, setLightboxIndex } = useContext(LightboxContext);

	async function reorderCustomItemImages(res) {
		if (res.from === undefined || res.to === undefined) return false;
		setGroup((oldGroup) => {
			let newGroup = JSON.parse(JSON.stringify(oldGroup));
			const customSubpageIndex = newGroup.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			const tempDevImageItem = newGroup.data.custom_subpages[customSubpageIndex].items[index].images.splice(res.from, 1)[0];
			newGroup.data.custom_subpages[customSubpageIndex].items[index].images.splice(res.to, 0, tempDevImageItem);
			return newGroup;
		});
	}

	function changeCustomItemImageCaption(e, imageIndex) {
		setGroup((oldGroup) => {
			let newGroup = JSON.parse(JSON.stringify(oldGroup));
			const customSubpageIndex = newGroup.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			newGroup.data.custom_subpages[customSubpageIndex].items[index].images[imageIndex].caption = e.target.value;
			return newGroup;
		});
	}

	function removeDevItemImage(imageIndex) {
		setGroup((oldGroup) => {
			let newGroup = JSON.parse(JSON.stringify(oldGroup));
			const customSubpageIndex = newGroup.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			newGroup.data.custom_subpages[customSubpageIndex].items[index].images.splice(imageIndex, 1);
			return newGroup;
		});
	}

	function onCustomItemImageClick(imageIndex) {
		setLightboxImageIDs(customItem.images);
		setLightboxIndex(imageIndex);
	}

	const [devItemTextContainerClassName, setDevItemTextContainerClassName] = useState("group-subpage-custom-item-text-container");
	const [devItemImagesContainerClassName, setDevItemImagesContainerClassName] = useState("group-subpage-custom-item-images-container");
	useEffect(() => {
		function getDevItemTextContainerClassName() {
			let newClassName = "group-subpage-custom-item-text-container";
			if (customItem?.images?.length === 0) newClassName += " group-subpage-custom-item-text-container-full-width";
			if (customItem?.value?.join("").split(" ").join("").length === 0) newClassName += " group-subpage-custom-item-text-container-no-width";
			return newClassName;
		}
		function getDevItemImagesContainerClassName() {
			let newClassName = "group-subpage-custom-item-images-container";
			if (groupImagesCurrDevItemIndex === index) newClassName += " group-subpage-custom-item-images-container-is-current";
			if (customItem?.images?.length === 0) newClassName += " group-subpage-custom-item-images-container-no-width";
			if (customItem?.value?.join("").split(" ").join("").length === 0)
				newClassName += " group-subpage-custom-item-images-container-full-width";
			return newClassName;
		}
		setDevItemTextContainerClassName(getDevItemTextContainerClassName());
		setDevItemImagesContainerClassName(getDevItemImagesContainerClassName());
	}, [setDevItemTextContainerClassName, setDevItemImagesContainerClassName, customItem, index, groupImagesCurrDevItemIndex, isEditing]);

	return {
		groupImages,
		reorderCustomItemImages,
		changeCustomItemImageCaption,
		removeDevItemImage,
		onCustomItemImageClick,
		devItemTextContainerClassName,
		devItemImagesContainerClassName,
	};
};
