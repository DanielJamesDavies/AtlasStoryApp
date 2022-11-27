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

export const MiscellaneousItemsLogic = () => {
	const { isAuthorizedToEdit, story, substory, setSubstory } = useContext(SubstoryContext);
	const { APIRequest } = useContext(APIContext);

	function changeMiscellaneousItemTitle(e, index) {
		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			newSubstory.data.miscellaneous.items[index].title = e.target.value;
			return newSubstory;
		});
	}

	function changeMiscellaneousItemText(e, index) {
		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			newSubstory.data.miscellaneous.items[index].text = e.target.value.split("\n");
			return newSubstory;
		});
	}

	function addMiscellaneousItem() {
		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			newSubstory.data.miscellaneous.items.push({ title: "", text: [""], images: [] });
			return newSubstory;
		});
	}

	function removeMiscellaneousItem(index) {
		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			newSubstory.data.miscellaneous.items.splice(index, 1);
			return newSubstory;
		});
	}

	const [isReorderingMiscellaneousItems, setIsReorderingMiscellaneousItems] = useState(false);
	function toggleIsReorderingMiscellaneousItems() {
		setIsReorderingMiscellaneousItems((oldIsReorderingMiscellaneousItems) => !oldIsReorderingMiscellaneousItems);
	}

	function reorderMiscellaneousItems(res) {
		if (res.from === undefined || res.to === undefined) return false;
		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			const tempMiscellaneousItem = newSubstory.data.miscellaneous.items.splice(res.from, 1)[0];
			newSubstory.data.miscellaneous.items.splice(res.to, 0, tempMiscellaneousItem);
			return newSubstory;
		});
	}

	const [errors, setErrors] = useState([]);

	async function revertMiscellaneousItems() {
		setErrors([]);
		const response = await APIRequest("/substory/get-value/" + substory._id, "POST", {
			story_id: story._id,
			path: ["data", "miscellaneous", "items"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			newSubstory.data.miscellaneous.items = response.data.value;
			return newSubstory;
		});

		return true;
	}

	async function saveMiscellaneousItems() {
		setErrors([]);
		if (!substory?._id) return;
		const response = await APIRequest("/substory/" + substory._id, "PATCH", {
			story_id: story._id,
			path: ["data", "miscellaneous", "items"],
			newValue: substory.data.miscellaneous.items,
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
		if (newSubstory.data.miscellaneous.items[newSubstoryImagesCurrDevItemIndex].images.findIndex((e) => e.image === image_id) !== -1)
			return false;
		newSubstory.data.miscellaneous.items[newSubstoryImagesCurrDevItemIndex].images.push({ image: image_id, caption: "" });
		setSubstory(newSubstory);
	}

	const miscellaneousItemsRef = useRef();
	function onMiscellaneousItemsContainerScroll(e) {
		if (miscellaneousItemsRef?.current?.scrollTop === 0) return;
		e.stopPropagation();
	}

	return {
		isAuthorizedToEdit,
		substory,
		changeMiscellaneousItemTitle,
		changeMiscellaneousItemText,
		addMiscellaneousItem,
		removeMiscellaneousItem,
		isReorderingMiscellaneousItems,
		toggleIsReorderingMiscellaneousItems,
		reorderMiscellaneousItems,
		revertMiscellaneousItems,
		saveMiscellaneousItems,
		errors,
		substoryImagesCurrDevItemIndex,
		openSubstoryImages,
		closeSubstoryImages,
		addImageToDevItem,
		miscellaneousItemsRef,
		onMiscellaneousItemsContainerScroll,
	};
};
