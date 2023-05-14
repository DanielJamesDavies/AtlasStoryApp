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

export const MiscellaneousItemLogic = ({ miscellaneousItem, index, groupImagesCurrDevItemIndex, isEditing }) => {
	const { groupImages, setGroup } = useContext(GroupContext);
	const { setLightboxImageIDs, setLightboxIndex } = useContext(LightboxContext);

	async function reorderMiscellaneousItemImages(res) {
		if (res.from === undefined || res.to === undefined) return false;
		setGroup((oldGroup) => {
			let newGroup = JSON.parse(JSON.stringify(oldGroup));
			const tempDevImageItem = newGroup.data.miscellaneous.items[index].images.splice(res.from, 1)[0];
			newGroup.data.miscellaneous.items[index].images.splice(res.to, 0, tempDevImageItem);
			return newGroup;
		});
	}

	function changeMiscellaneousItemImageCaption(e, imageIndex) {
		setGroup((oldGroup) => {
			let newGroup = JSON.parse(JSON.stringify(oldGroup));
			newGroup.data.miscellaneous.items[index].images[imageIndex].caption = e.target.value;
			return newGroup;
		});
	}

	function removeDevItemImage(imageIndex) {
		setGroup((oldGroup) => {
			let newGroup = JSON.parse(JSON.stringify(oldGroup));
			newGroup.data.miscellaneous.items[index].images.splice(imageIndex, 1);
			return newGroup;
		});
	}

	function onMiscellaneousItemImageClick(imageIndex) {
		setLightboxImageIDs(miscellaneousItem.images);
		setLightboxIndex(imageIndex);
	}

	const [devItemTextContainerClassName, setDevItemTextContainerClassName] = useState("group-subpage-miscellaneous-item-text-container");
	const [devItemImagesContainerClassName, setDevItemImagesContainerClassName] = useState("group-subpage-miscellaneous-item-images-container");
	useEffect(() => {
		function getDevItemTextContainerClassName() {
			let newClassName = "group-subpage-miscellaneous-item-text-container";
			if (miscellaneousItem?.images?.length === 0) newClassName += " group-subpage-miscellaneous-item-text-container-full-width";
			if (miscellaneousItem?.value?.join("").split(" ").join("").length === 0)
				newClassName += " group-subpage-miscellaneous-item-text-container-no-width";
			return newClassName;
		}
		function getDevItemImagesContainerClassName() {
			let newClassName = "group-subpage-miscellaneous-item-images-container";
			if (groupImagesCurrDevItemIndex === index) newClassName += " group-subpage-miscellaneous-item-images-container-is-current";
			if (miscellaneousItem?.images?.length === 0) newClassName += " group-subpage-miscellaneous-item-images-container-no-width";
			if (miscellaneousItem?.value?.join("").split(" ").join("").length === 0)
				newClassName += " group-subpage-miscellaneous-item-images-container-full-width";
			return newClassName;
		}
		setDevItemTextContainerClassName(getDevItemTextContainerClassName());
		setDevItemImagesContainerClassName(getDevItemImagesContainerClassName());
	}, [setDevItemTextContainerClassName, setDevItemImagesContainerClassName, miscellaneousItem, index, groupImagesCurrDevItemIndex, isEditing]);

	return {
		groupImages,
		reorderMiscellaneousItemImages,
		changeMiscellaneousItemImageCaption,
		removeDevItemImage,
		onMiscellaneousItemImageClick,
		devItemTextContainerClassName,
		devItemImagesContainerClassName,
	};
};
