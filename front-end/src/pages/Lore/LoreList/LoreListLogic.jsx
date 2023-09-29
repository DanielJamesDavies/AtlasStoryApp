// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { LoreContext } from "../LoreContext";
import { APIContext } from "../../../context/APIContext";

// Services

// Styles

// Assets

export const LoreListLogic = () => {
	const { story, setStory, lore, loreImages, isReorderingLore, setIsDisplayingCreateLoreItemForm } = useContext(LoreContext);
	const { authorized_user_id, APIRequest } = useContext(APIContext);

	async function changeLoreOrder(res) {
		if (res.from === undefined || res.to === undefined) return;

		let newStory = JSON.parse(JSON.stringify(story));
		const tempItem = newStory.data.lore.splice(res.from, 1)[0];
		newStory.data.lore.splice(res.to, 0, tempItem);
		setStory(newStory);

		await APIRequest("/story/" + newStory._id, "PATCH", {
			story_id: newStory._id,
			path: ["data", "lore"],
			newValue: newStory.data.lore,
		});
	}

	return { authorized_user_id, story, lore, loreImages, isReorderingLore, changeLoreOrder, setIsDisplayingCreateLoreItemForm };
};
