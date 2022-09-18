// Packages
import { useContext, useState, useRef } from "react";

// Components

// Logic

// Context
import { SubstoryContext } from "../../../SubstoryContext";
import { APIContext } from "../../../../../context/APIContext";

// Services

// Styles

// Assets

export const DevelopmentItemsLogic = () => {
	const { isAuthorizedToEdit, story, substory, setSubstory } = useContext(SubstoryContext);
	const { APIRequest } = useContext(APIContext);

	function changeDevelopmentItemTitle(e, index) {
		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			newSubstory.data.development.items[index].title = e.target.value;
			return newSubstory;
		});
	}

	function changeDevelopmentItemValue(e, index) {
		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			newSubstory.data.development.items[index].value = e.target.value.split("\n");
			return newSubstory;
		});
	}

	function addDevelopmentItem() {
		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			newSubstory.data.development.items.push({ title: "", value: [""], images: [] });
			return newSubstory;
		});
	}

	function removeDevelopmentItem(index) {
		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			newSubstory.data.development.items.splice(index, 1);
			return newSubstory;
		});
	}

	const [isReorderingDevelopmentItems, setIsReorderingDevelopmentItems] = useState(false);
	function toggleIsReorderingDevelopmentItems() {
		setIsReorderingDevelopmentItems((oldIsReorderingDevelopmentItems) => !oldIsReorderingDevelopmentItems);
	}

	function reorderDevelopmentItems(res) {
		if (res.from === undefined || res.to === undefined) return false;
		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			const tempDevelopmentItem = newSubstory.data.development.items.splice(res.from, 1)[0];
			newSubstory.data.development.items.splice(res.to, 0, tempDevelopmentItem);
			return newSubstory;
		});
	}

	const [errors, setErrors] = useState([]);

	async function revertDevelopmentItems() {
		setErrors([]);
		const response = await APIRequest("/substory/get-value/" + substory._id, "POST", {
			story_id: story._id,
			path: ["data", "development", "items"],
		});
		if (!response || response?.errors || !response?.data?.value) return false;

		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			newSubstory.data.development.items = response.data.value;
			return newSubstory;
		});

		return true;
	}

	async function saveDevelopmentItems() {
		setErrors([]);
		if (!substory?._id) return;
		const response = await APIRequest("/substory/" + substory._id, "PATCH", {
			story_id: story._id,
			path: ["data", "development", "items"],
			newValue: substory.data.development.items,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	const [substoryImagesCurrDevItemIndex, setSubstoryImagesCurrDevItemIndex] = useState(-1);
	function openSubstoryImages(index) {
		setSubstoryImagesCurrDevItemIndex(index);
	}

	function closeSubstoryImages() {
		setSubstoryImagesCurrDevItemIndex(-1);
	}

	function addImageToDevItem(image_id) {
		const newSubstoryImagesCurrDevItemIndex = JSON.parse(JSON.stringify(substoryImagesCurrDevItemIndex));
		let newSubstory = JSON.parse(JSON.stringify(substory));
		if (newSubstory.data.development.items[newSubstoryImagesCurrDevItemIndex].images.findIndex((e) => e.image === image_id) !== -1)
			return false;
		newSubstory.data.development.items[newSubstoryImagesCurrDevItemIndex].images.push({ image: image_id, caption: "" });
		setSubstory(newSubstory);
	}

	const developmentItemsRef = useRef();
	function onDevelopmentItemsContainerScroll(e) {
		if (developmentItemsRef?.current?.scrollTop === 0) return;
		e.stopPropagation();
	}

	return {
		isAuthorizedToEdit,
		substory,
		changeDevelopmentItemTitle,
		changeDevelopmentItemValue,
		addDevelopmentItem,
		removeDevelopmentItem,
		isReorderingDevelopmentItems,
		toggleIsReorderingDevelopmentItems,
		reorderDevelopmentItems,
		revertDevelopmentItems,
		saveDevelopmentItems,
		errors,
		substoryImagesCurrDevItemIndex,
		openSubstoryImages,
		closeSubstoryImages,
		addImageToDevItem,
		developmentItemsRef,
		onDevelopmentItemsContainerScroll,
	};
};
