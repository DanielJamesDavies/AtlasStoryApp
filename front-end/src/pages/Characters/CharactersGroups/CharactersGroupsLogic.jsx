// Packages
import { useContext, useEffect, useState } from "react";

// Components

// Logic

// Context
import { CharactersContext } from "../CharactersContext";
import { APIContext } from "../../../context/APIContext";

// Services

// Styles

// Assets

export const CharactersGroupsLogic = () => {
	const {
		isAuthorizedToEdit,
		story,
		setStory,
		storyGroups,
		setStoryGroups,
		group,
		changeGroup,
		setIsDisplayingCreateGroupForm,
		isReorderingGroups,
		toggleIsReorderingGroups,
	} = useContext(CharactersContext);
	const { APIRequest } = useContext(APIContext);

	function openCreateGroupForm() {
		setIsDisplayingCreateGroupForm(true);
	}

	async function changeGroupsOrder(res) {
		if (res.from === undefined || res.to === undefined) return;

		let newStory = JSON.parse(JSON.stringify(story));
		const tempStoryGroup = newStory.data.groups.splice(res.from, 1)[0];
		newStory.data.groups.splice(res.to, 0, tempStoryGroup);
		setStory(newStory);

		let newGroups = JSON.parse(JSON.stringify(storyGroups));
		const tempGroup = newGroups.splice(res.from, 1)[0];
		newGroups.splice(res.to, 0, tempGroup);
		setStoryGroups(newGroups);

		await APIRequest("/story/" + newStory._id, "PATCH", {
			story_id: newStory._id,
			path: ["data", "groups"],
			newValue: newStory.data.groups,
		});
	}

	const [activeGroupColourTint, setActiveGroupColourTint] = useState(false);

	useEffect(() => {
		function getColourTint(hex, amount) {
			let [r, g, b] = hex.match(/.{2}/g);

			r = Math.max(Math.min(255, parseInt(r, 16) + amount), 0).toString(16);
			if (parseInt(r, 16) + amount > 255) amount *= 0.5;
			g = Math.max(Math.min(255, parseInt(g, 16) + amount), 0).toString(16);
			b = Math.max(Math.min(255, parseInt(b, 16) + amount), 0).toString(16);

			return `#${(r.length < 2 ? "0" : "") + r}${(g.length < 2 ? "0" : "") + g}${(b.length < 2 ? "0" : "") + b}`;
		}

		if (group?.data?.colour) {
			try {
				let bigint = parseInt(group?.data?.colour.substring(1), 16);
				let r = (bigint >> 16) & 255;
				let g = (bigint >> 8) & 255;
				let b = bigint & 255;
				const brightness = (r + g + b) / 3;
				const new_hex = getColourTint(group?.data?.colour.substring(1), brightness > 128 ? -28 : 60);
				setActiveGroupColourTint(new_hex);
			} catch {
				setActiveGroupColourTint(group?.data?.colour);
			}
		}
	}, [group]);

	return {
		isAuthorizedToEdit,
		story,
		storyGroups,
		group,
		changeGroup,
		openCreateGroupForm,
		isReorderingGroups,
		toggleIsReorderingGroups,
		changeGroupsOrder,
		activeGroupColourTint,
	};
};
