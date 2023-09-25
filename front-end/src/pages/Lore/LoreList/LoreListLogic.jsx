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
	const { story, setStory, lore, isReorderingLore } = useContext(LoreContext);
	const { APIRequest } = useContext(APIContext);

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

	return { story, lore, isReorderingLore, changeLoreOrder };
};
