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

export const DevelopmentItemLogic = ({ developmentItem, index, groupImagesCurrDevItemIndex, isEditing }) => {
	const { groupImages, setGroup } = useContext(GroupContext);
	const { setLightboxImageIDs, setLightboxIndex } = useContext(LightboxContext);

	async function reorderDevelopmentItemImages(res) {
		if (res.from === undefined || res.to === undefined) return false;
		setGroup((oldGroup) => {
			let newGroup = JSON.parse(JSON.stringify(oldGroup));
			const tempDevImageItem = newGroup.data.development.items[index].images.splice(res.from, 1)[0];
			newGroup.data.development.items[index].images.splice(res.to, 0, tempDevImageItem);
			return newGroup;
		});
	}

	function changeDevelopmentItemImageCaption(e, imageIndex) {
		setGroup((oldGroup) => {
			let newGroup = JSON.parse(JSON.stringify(oldGroup));
			newGroup.data.development.items[index].images[imageIndex].caption = e.target.value;
			return newGroup;
		});
	}

	function removeDevItemImage(imageIndex) {
		setGroup((oldGroup) => {
			let newGroup = JSON.parse(JSON.stringify(oldGroup));
			newGroup.data.development.items[index].images.splice(imageIndex, 1);
			return newGroup;
		});
	}

	function onDevelopmentItemImageClick(imageIndex) {
		setLightboxImageIDs(developmentItem.images);
		setLightboxIndex(imageIndex);
	}

	const [devItemTextContainerClassName, setDevItemTextContainerClassName] = useState("group-subpage-development-item-text-container");
	const [devItemImagesContainerClassName, setDevItemImagesContainerClassName] = useState("group-subpage-development-item-images-container");
	useEffect(() => {
		function getDevItemTextContainerClassName() {
			let newClassName = "group-subpage-development-item-text-container";
			if (developmentItem?.images?.length === 0) newClassName += " group-subpage-development-item-text-container-full-width";
			if (developmentItem?.value?.join("").split(" ").join("").length === 0)
				newClassName += " group-subpage-development-item-text-container-no-width";
			return newClassName;
		}
		function getDevItemImagesContainerClassName() {
			let newClassName = "group-subpage-development-item-images-container";
			if (groupImagesCurrDevItemIndex === index) newClassName += " group-subpage-development-item-images-container-is-current";
			if (developmentItem?.images?.length === 0) newClassName += " group-subpage-development-item-images-container-no-width";
			if (developmentItem?.value?.join("").split(" ").join("").length === 0)
				newClassName += " group-subpage-development-item-images-container-full-width";
			return newClassName;
		}
		setDevItemTextContainerClassName(getDevItemTextContainerClassName());
		setDevItemImagesContainerClassName(getDevItemImagesContainerClassName());
	}, [setDevItemTextContainerClassName, setDevItemImagesContainerClassName, developmentItem, index, groupImagesCurrDevItemIndex, isEditing]);

	return {
		groupImages,
		reorderDevelopmentItemImages,
		changeDevelopmentItemImageCaption,
		removeDevItemImage,
		onDevelopmentItemImageClick,
		devItemTextContainerClassName,
		devItemImagesContainerClassName,
	};
};
