// Packages
import { useContext, useEffect, useState } from "react";

// Components

// Logic

// Context
import { CharactersContext } from "../../CharactersContext";
import { APIContext } from "../../../../context/APIContext";

// Services

// Styles

// Assets

export const CharactersGroupCharacterCardsLogic = () => {
	const { story, storyGroups, setStoryGroups, group, changeGroup, isReorderingCharacters } = useContext(CharactersContext);
	const { APIRequest } = useContext(APIContext);

	const [prevGroupID, setPrevGroupID] = useState("");
	useEffect(() => {
		if (group._id !== prevGroupID) {
			setPrevGroupID(group._id);
		}
	}, [group, prevGroupID, setPrevGroupID]);

	// Reorder Characters
	async function changeCharactersOrder(res) {
		if (res.from === undefined || res.to === undefined) return;

		let newStory = JSON.parse(JSON.stringify(story));
		let newGroups = JSON.parse(JSON.stringify(storyGroups));
		const openGroup = JSON.parse(JSON.stringify(newGroups.findIndex((e) => e._id === group._id)));
		if (openGroup === -1) return;
		if (!newGroups[openGroup]?.data?.characters) return;

		if (res.listId === undefined) {
			const tempCharacter = newGroups[openGroup].data.characters.splice(res.from, 1)[0];
			newGroups[openGroup].data.characters.splice(res.to, 0, tempCharacter);

			setStoryGroups(newGroups);
			changeGroup(newGroups[openGroup]._id, newGroups);

			await APIRequest("/group/" + newGroups[openGroup]._id, "PATCH", {
				story_id: newStory._id,
				path: ["data", "characters"],
				newValue: newGroups[openGroup].data.characters,
			});
		} else if (res.listId === "characters-groups-group-items") {
			const tempCharacter = newGroups[openGroup].data.characters.splice(res.from, 1)[0];
			newGroups[res.to].data.characters.push(tempCharacter);
			setStoryGroups(newGroups);
			changeGroup(newGroups[openGroup]._id, newGroups);

			await APIRequest("/group/" + newGroups[openGroup]._id, "PATCH", {
				story_id: newStory._id,
				path: ["data", "characters"],
				newValue: newGroups[openGroup].data.characters,
			});

			await APIRequest("/group/" + newGroups[res.to]._id, "PATCH", {
				story_id: newStory._id,
				path: ["data", "characters"],
				newValue: newGroups[res.to].data.characters,
			});

			await APIRequest("/character/" + tempCharacter?.character_id, "PATCH", {
				story_id: newStory._id,
				path: ["group_id"],
				newValue: newGroups[res.to]._id,
			});
		}
	}

	return { group, isReorderingCharacters, changeCharactersOrder };
};
