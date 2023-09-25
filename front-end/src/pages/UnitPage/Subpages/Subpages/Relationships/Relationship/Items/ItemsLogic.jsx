// Packages
import { useRef, useEffect, useContext, useState } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../../../UnitPageContext";
import { APIContext } from "../../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const ItemsLogic = ({ relationship, changeRelationship, relationshipCharacterIndex }) => {
	const { isAuthorizedToEdit, story } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);
	const itemsRef = useRef();

	useEffect(() => {
		const itemsRefCurrent = itemsRef?.current;
		const onWheel = (e) => (itemsRefCurrent?.scrollTop !== 0 ? e.stopPropagation() : null);
		if (itemsRefCurrent) itemsRefCurrent.addEventListener("wheel", onWheel);
		return () => (itemsRefCurrent ? itemsRefCurrent.removeEventListener("wheel", onWheel) : null);
	}, [itemsRef]);

	function changeItemTitle(e, index) {
		const newRelationship = JSON.parse(JSON.stringify(relationship));
		newRelationship["character_" + relationshipCharacterIndex + "_items"][index].title = e.target.value;
		changeRelationship(newRelationship);
	}

	function changeItemDescription(e, index) {
		const newRelationship = JSON.parse(JSON.stringify(relationship));
		newRelationship["character_" + relationshipCharacterIndex + "_items"][index].text = e.target.value.split("\n");
		changeRelationship(newRelationship);
	}

	function addNote() {
		const newRelationship = JSON.parse(JSON.stringify(relationship));
		newRelationship["character_" + relationshipCharacterIndex + "_items"].push({ title: "", text: [""] });
		changeRelationship(newRelationship);
	}

	function removeItem(index) {
		const newRelationship = JSON.parse(JSON.stringify(relationship));
		newRelationship["character_" + relationshipCharacterIndex + "_items"].splice(index, 1);
		changeRelationship(newRelationship);
	}

	const [isReorderingRelationshipItems, setIsReorderingRelationshipItems] = useState(false);
	function toggleIsReorderingRelationshipItems() {
		setIsReorderingRelationshipItems((oldIsReorderingRelationshipItems) => !oldIsReorderingRelationshipItems);
	}

	function reorderRelationshipItems(res) {
		if (res.from === undefined || res.to === undefined) return false;
		const newRelationship = JSON.parse(JSON.stringify(relationship));
		const tempItem = newRelationship["character_" + relationshipCharacterIndex + "_items"].splice(res.from, 1)[0];
		newRelationship["character_" + relationshipCharacterIndex + "_items"].splice(res.to, 0, tempItem);
		changeRelationship(newRelationship);
	}

	async function saveNotes() {
		const response = await APIRequest("/character-relationship/" + relationship._id, "PATCH", {
			story_id: story._id,
			path: ["character_" + relationshipCharacterIndex + "_items"],
			newValue: relationship["character_" + relationshipCharacterIndex + "_items"],
		});
		if (!response || response?.errors) return false;
		return true;
	}

	async function revertNotes() {
		const response = await APIRequest("/character-relationship/get-value/" + relationship._id, "POST", {
			story_id: story._id,
			path: ["character_" + relationshipCharacterIndex + "_items"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		let newRelationship = JSON.parse(JSON.stringify(relationship));
		newRelationship["character_" + relationshipCharacterIndex + "_items"] = response.data.value;
		changeRelationship(newRelationship);
		return true;
	}

	function onItemsContainerScroll(e) {
		if (itemsRef?.current?.scrollTop === 0) return;
		e.stopPropagation();
	}

	return {
		isAuthorizedToEdit,
		itemsRef,
		changeItemTitle,
		changeItemDescription,
		addNote,
		removeItem,
		isReorderingRelationshipItems,
		toggleIsReorderingRelationshipItems,
		reorderRelationshipItems,
		revertNotes,
		saveNotes,
		onItemsContainerScroll,
	};
};
