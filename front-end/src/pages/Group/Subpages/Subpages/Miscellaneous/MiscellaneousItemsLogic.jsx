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

export const MiscellaneousItemsLogic = () => {
	const { isAuthorizedToEdit, story, group, setGroup } = useContext(GroupContext);
	const { APIRequest } = useContext(APIContext);

	function changeMiscellaneousItemTitle(e, index) {
		setGroup((oldGroup) => {
			let newGroup = JSON.parse(JSON.stringify(oldGroup));
			newGroup.data.miscellaneous.items[index].title = e.target.value;
			return newGroup;
		});
	}

	function changeMiscellaneousItemText(e, index) {
		setGroup((oldGroup) => {
			let newGroup = JSON.parse(JSON.stringify(oldGroup));
			newGroup.data.miscellaneous.items[index].text = e.target.value.split("\n");
			return newGroup;
		});
	}

	function addMiscellaneousItem() {
		setGroup((oldGroup) => {
			let newGroup = JSON.parse(JSON.stringify(oldGroup));
			newGroup.data.miscellaneous.items.push({ title: "", text: [""], images: [] });
			return newGroup;
		});
	}

	function removeMiscellaneousItem(index) {
		setGroup((oldGroup) => {
			let newGroup = JSON.parse(JSON.stringify(oldGroup));
			newGroup.data.miscellaneous.items.splice(index, 1);
			return newGroup;
		});
	}

	const [isReorderingMiscellaneousItems, setIsReorderingMiscellaneousItems] = useState(false);
	function toggleIsReorderingMiscellaneousItems() {
		setIsReorderingMiscellaneousItems((oldIsReorderingMiscellaneousItems) => !oldIsReorderingMiscellaneousItems);
	}

	function reorderMiscellaneousItems(res) {
		if (res?.from === undefined || res?.to === undefined) return false;
		setGroup((oldGroup) => {
			let newGroup = JSON.parse(JSON.stringify(oldGroup));
			const tempMiscellaneousItem = newGroup.data.miscellaneous.items.splice(res.from, 1)[0];
			newGroup.data.miscellaneous.items.splice(res.to, 0, tempMiscellaneousItem);
			return newGroup;
		});
	}

	const [errors, setErrors] = useState([]);

	async function revertMiscellaneousItems() {
		setErrors([]);
		const response = await APIRequest("/group/get-value/" + group._id, "POST", {
			story_id: story._id,
			path: ["data", "miscellaneous", "items"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setGroup((oldGroup) => {
			let newGroup = JSON.parse(JSON.stringify(oldGroup));
			newGroup.data.miscellaneous.items = response.data.value;
			return newGroup;
		});

		return true;
	}

	async function saveMiscellaneousItems() {
		setErrors([]);
		if (!group?._id) return;
		const response = await APIRequest("/group/" + group._id, "PATCH", {
			story_id: story._id,
			path: ["data", "miscellaneous", "items"],
			newValue: group.data.miscellaneous.items,
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
		if (newGroup.data.miscellaneous.items[newGroupImagesCurrDevItemIndex].images.findIndex((e) => e.image === image_id) !== -1) return false;
		newGroup.data.miscellaneous.items[newGroupImagesCurrDevItemIndex].images.push({ image: image_id, caption: "" });
		setGroup(newGroup);
	}

	const miscellaneousItemsRef = useRef();
	function onMiscellaneousItemsContainerScroll(e) {
		if (miscellaneousItemsRef?.current?.scrollTop === 0) return;
		e.stopPropagation();
	}

	return {
		isAuthorizedToEdit,
		group,
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
		groupImagesCurrDevItemIndex,
		openGroupImages,
		closeGroupImages,
		addImageToDevItem,
		miscellaneousItemsRef,
		onMiscellaneousItemsContainerScroll,
	};
};
