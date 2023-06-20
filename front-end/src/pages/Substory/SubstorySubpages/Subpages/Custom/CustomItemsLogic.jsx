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

export const CustomItemsLogic = () => {
	const { isAuthorizedToEdit, story, substory, setSubstory, openSubpageID } = useContext(SubstoryContext);
	const { APIRequest } = useContext(APIContext);

	function changeCustomItemTitle(e, index) {
		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			const customSubpageIndex = newSubstory.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			newSubstory.data.custom_subpages[customSubpageIndex].items[index].title = e.target.value;
			return newSubstory;
		});
	}

	function changeCustomItemText(e, index) {
		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			const customSubpageIndex = newSubstory.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			newSubstory.data.custom_subpages[customSubpageIndex].items[index].text = e.target.value.split("\n");
			return newSubstory;
		});
	}

	function addCustomItem() {
		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			const customSubpageIndex = newSubstory.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			newSubstory.data.custom_subpages[customSubpageIndex].items.push({ title: "", text: [""], images: [] });
			return newSubstory;
		});
	}

	function removeCustomItem(index) {
		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			const customSubpageIndex = newSubstory.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			newSubstory.data.custom_subpages[customSubpageIndex].items.splice(index, 1);
			return newSubstory;
		});
	}

	const [isReorderingCustomItems, setIsReorderingCustomItems] = useState(false);
	function toggleIsReorderingCustomItems() {
		setIsReorderingCustomItems((oldIsReorderingCustomItems) => !oldIsReorderingCustomItems);
	}

	function reorderCustomItems(res) {
		if (res?.from === undefined || res?.to === undefined) return false;
		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			const customSubpageIndex = newSubstory.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			const tempCustomItem = newSubstory.data.custom_subpages[customSubpageIndex].items.splice(res.from, 1)[0];
			newSubstory.data.custom_subpages[openSubpageID].items.splice(res.to, 0, tempCustomItem);
			return newSubstory;
		});
	}

	const [errors, setErrors] = useState([]);

	async function revertCustomItems() {
		setErrors([]);
		const response = await APIRequest("/substory/get-value/" + substory._id, "POST", {
			story_id: story._id,
			path: ["data", "custom_subpages", openSubpageID, "items"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			const customSubpageIndex = newSubstory.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			newSubstory.data.custom_subpages[customSubpageIndex].items = response.data.value;
			return newSubstory;
		});

		return true;
	}

	async function saveCustomItems() {
		setErrors([]);
		if (!substory?._id) return;
		const response = await APIRequest("/substory/" + substory._id, "PATCH", {
			story_id: story._id,
			path: ["data", "custom_subpages", openSubpageID, "items"],
			newValue: substory.data.custom_subpages.find((e) => e.id === openSubpageID).items,
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
		const customSubpageIndex = newSubstory.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
		if (
			newSubstory.data.custom_subpages[customSubpageIndex].items[newSubstoryImagesCurrDevItemIndex].images.findIndex(
				(e) => e.image === image_id
			) !== -1
		)
			return false;
		newSubstory.data.custom_subpages[customSubpageIndex].items[newSubstoryImagesCurrDevItemIndex].images.push({
			image: image_id,
			caption: "",
		});
		setSubstory(newSubstory);
	}

	const customItemsRef = useRef();
	function onCustomItemsContainerScroll(e) {
		if (customItemsRef?.current?.scrollTop === 0) return;
		e.stopPropagation();
	}

	return {
		isAuthorizedToEdit,
		substory,
		openSubpageID,
		changeCustomItemTitle,
		changeCustomItemText,
		addCustomItem,
		removeCustomItem,
		isReorderingCustomItems,
		toggleIsReorderingCustomItems,
		reorderCustomItems,
		revertCustomItems,
		saveCustomItems,
		errors,
		substoryImagesCurrDevItemIndex,
		openSubstoryImages,
		closeSubstoryImages,
		addImageToDevItem,
		customItemsRef,
		onCustomItemsContainerScroll,
	};
};
