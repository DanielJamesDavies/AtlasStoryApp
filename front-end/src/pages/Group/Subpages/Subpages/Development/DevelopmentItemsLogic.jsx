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

export const DevelopmentItemsLogic = () => {
	const { isAuthorizedToEdit, story, group, setGroup } = useContext(GroupContext);
	const { APIRequest } = useContext(APIContext);

	function changeDevelopmentItemTitle(e, index) {
		setGroup((oldGroup) => {
			let newGroup = JSON.parse(JSON.stringify(oldGroup));
			newGroup.data.development.items[index].title = e.target.value;
			return newGroup;
		});
	}

	function changeDevelopmentItemText(e, index) {
		setGroup((oldGroup) => {
			let newGroup = JSON.parse(JSON.stringify(oldGroup));
			newGroup.data.development.items[index].text = e.target.value.split("\n");
			return newGroup;
		});
	}

	function addDevelopmentItem() {
		setGroup((oldGroup) => {
			let newGroup = JSON.parse(JSON.stringify(oldGroup));
			newGroup.data.development.items.push({ title: "", text: [""], images: [] });
			return newGroup;
		});
	}

	function removeDevelopmentItem(index) {
		setGroup((oldGroup) => {
			let newGroup = JSON.parse(JSON.stringify(oldGroup));
			newGroup.data.development.items.splice(index, 1);
			return newGroup;
		});
	}

	const [isReorderingDevelopmentItems, setIsReorderingDevelopmentItems] = useState(false);
	function toggleIsReorderingDevelopmentItems() {
		setIsReorderingDevelopmentItems((oldIsReorderingDevelopmentItems) => !oldIsReorderingDevelopmentItems);
	}

	function reorderDevelopmentItems(res) {
		if (res?.from === undefined || res?.to === undefined) return false;
		setGroup((oldGroup) => {
			let newGroup = JSON.parse(JSON.stringify(oldGroup));
			const tempDevelopmentItem = newGroup.data.development.items.splice(res.from, 1)[0];
			newGroup.data.development.items.splice(res.to, 0, tempDevelopmentItem);
			return newGroup;
		});
	}

	const [errors, setErrors] = useState([]);

	async function revertDevelopmentItems() {
		setErrors([]);
		const response = await APIRequest("/group/get-value/" + group._id, "POST", {
			story_id: story._id,
			path: ["data", "development", "items"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setGroup((oldGroup) => {
			let newGroup = JSON.parse(JSON.stringify(oldGroup));
			newGroup.data.development.items = response.data.value;
			return newGroup;
		});

		return true;
	}

	async function saveDevelopmentItems() {
		setErrors([]);
		if (!group?._id) return;
		const response = await APIRequest("/group/" + group._id, "PATCH", {
			story_id: story._id,
			path: ["data", "development", "items"],
			newValue: group.data.development.items,
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
		if (newGroup.data.development.items[newGroupImagesCurrDevItemIndex].images.findIndex((e) => e.image === image_id) !== -1) return false;
		newGroup.data.development.items[newGroupImagesCurrDevItemIndex].images.push({ image: image_id, caption: "" });
		setGroup(newGroup);
	}

	const developmentItemsRef = useRef();
	function onDevelopmentItemsContainerScroll(e) {
		if (developmentItemsRef?.current?.scrollTop === 0) return;
		e.stopPropagation();
	}

	return {
		isAuthorizedToEdit,
		group,
		changeDevelopmentItemTitle,
		changeDevelopmentItemText,
		addDevelopmentItem,
		removeDevelopmentItem,
		isReorderingDevelopmentItems,
		toggleIsReorderingDevelopmentItems,
		reorderDevelopmentItems,
		revertDevelopmentItems,
		saveDevelopmentItems,
		errors,
		groupImagesCurrDevItemIndex,
		openGroupImages,
		closeGroupImages,
		addImageToDevItem,
		developmentItemsRef,
		onDevelopmentItemsContainerScroll,
	};
};
