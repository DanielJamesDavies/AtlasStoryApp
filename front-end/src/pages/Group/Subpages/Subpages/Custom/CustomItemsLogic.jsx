// Packages
import { useContext, useState, useRef } from "react";

// Components

// Logic

// Context
import { GroupContext } from "../../../GroupContext";
import { APIContext } from "../../../../../context/APIContext";

// Services

// Styles

// Assets

export const CustomItemsLogic = () => {
	const { isAuthorizedToEdit, story, group, setGroup, openSubpageID } = useContext(GroupContext);
	const { APIRequest } = useContext(APIContext);

	function changeCustomItemTitle(e, index) {
		setGroup((oldGroup) => {
			let newGroup = JSON.parse(JSON.stringify(oldGroup));
			const customSubpageIndex = newGroup.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			newGroup.data.custom_subpages[customSubpageIndex].items[index].title = e.target.value;
			return newGroup;
		});
	}

	function changeCustomItemText(e, index) {
		setGroup((oldGroup) => {
			let newGroup = JSON.parse(JSON.stringify(oldGroup));
			const customSubpageIndex = newGroup.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			newGroup.data.custom_subpages[customSubpageIndex].items[index].text = e.target.value.split("\n");
			return newGroup;
		});
	}

	function addCustomItem() {
		setGroup((oldGroup) => {
			let newGroup = JSON.parse(JSON.stringify(oldGroup));
			const customSubpageIndex = newGroup.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			newGroup.data.custom_subpages[customSubpageIndex].items.push({ title: "", text: [""], images: [] });
			return newGroup;
		});
	}

	function removeCustomItem(index) {
		setGroup((oldGroup) => {
			let newGroup = JSON.parse(JSON.stringify(oldGroup));
			const customSubpageIndex = newGroup.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			newGroup.data.custom_subpages[customSubpageIndex].items.splice(index, 1);
			return newGroup;
		});
	}

	const [isReorderingCustomItems, setIsReorderingCustomItems] = useState(false);
	function toggleIsReorderingCustomItems() {
		setIsReorderingCustomItems((oldIsReorderingCustomItems) => !oldIsReorderingCustomItems);
	}

	function reorderCustomItems(res) {
		if (res?.from === undefined || res?.to === undefined) return false;
		setGroup((oldGroup) => {
			let newGroup = JSON.parse(JSON.stringify(oldGroup));
			const customSubpageIndex = newGroup.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			const tempCustomItem = newGroup.data.custom_subpages[customSubpageIndex].items.splice(res.from, 1)[0];
			newGroup.data.custom_subpages[openSubpageID].items.splice(res.to, 0, tempCustomItem);
			return newGroup;
		});
	}

	const [errors, setErrors] = useState([]);

	async function revertCustomItems() {
		setErrors([]);
		const response = await APIRequest("/group/get-value/" + group._id, "POST", {
			story_id: story._id,
			path: ["data", "custom_subpages", openSubpageID, "items"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setGroup((oldGroup) => {
			let newGroup = JSON.parse(JSON.stringify(oldGroup));
			const customSubpageIndex = newGroup.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			newGroup.data.custom_subpages[customSubpageIndex].items = response.data.value;
			return newGroup;
		});

		return true;
	}

	async function saveCustomItems() {
		setErrors([]);
		if (!group?._id) return;
		const response = await APIRequest("/group/" + group._id, "PATCH", {
			story_id: story._id,
			path: ["data", "custom_subpages", openSubpageID, "items"],
			newValue: group.data.custom_subpages.find((e) => e.id === openSubpageID).items,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	const [groupImagesCurrDevItemIndex, setGroupImagesCurrDevItemIndex] = useState(-1);
	function openGroupImages(index) {
		setGroupImagesCurrDevItemIndex(index);
	}

	function closeGroupImages() {
		setGroupImagesCurrDevItemIndex(-1);
	}

	function addImageToDevItem(image_id) {
		const newGroupImagesCurrDevItemIndex = JSON.parse(JSON.stringify(groupImagesCurrDevItemIndex));
		let newGroup = JSON.parse(JSON.stringify(group));
		const customSubpageIndex = newGroup.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
		if (
			newGroup.data.custom_subpages[customSubpageIndex].items[newGroupImagesCurrDevItemIndex].images.findIndex(
				(e) => e.image === image_id
			) !== -1
		)
			return false;
		newGroup.data.custom_subpages[customSubpageIndex].items[newGroupImagesCurrDevItemIndex].images.push({
			image: image_id,
			caption: "",
		});
		setGroup(newGroup);
	}

	const customItemsRef = useRef();
	function onCustomItemsContainerScroll(e) {
		if (customItemsRef?.current?.scrollTop === 0) return;
		e.stopPropagation();
	}

	return {
		isAuthorizedToEdit,
		group,
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
		groupImagesCurrDevItemIndex,
		openGroupImages,
		closeGroupImages,
		addImageToDevItem,
		customItemsRef,
		onCustomItemsContainerScroll,
	};
};
