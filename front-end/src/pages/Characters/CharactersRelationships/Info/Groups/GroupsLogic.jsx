// Packages
import { useContext, useEffect, useState } from "react";

// Components

// Logic
import { CharactersContext } from "../../../CharactersContext";
import { APIContext } from "../../../../../context/APIContext";

// Context

// Services

// Styles

// Assets

export const GroupsLogic = () => {
	const { isAuthorizedToEdit, story, setStory, storyGroups } = useContext(CharactersContext);
	const { APIRequest } = useContext(APIContext);

	useEffect(() => {
		if (story?.data?.characterRelationshipsGroups && storyGroups) {
			const storyGroupIDs = storyGroups?.map((e) => e?._id);
			const characterRelationshipsGroupIDs = story?.data?.characterRelationshipsGroups?.map((e) => e?._id);

			const onlyInCharacterRelationshipsGroupIDs = characterRelationshipsGroupIDs.filter((value) => !storyGroupIDs.includes(value));
			const onlyInStoryGroupIDs = storyGroupIDs.filter((value) => !characterRelationshipsGroupIDs.includes(value));

			if ([...onlyInCharacterRelationshipsGroupIDs, ...onlyInStoryGroupIDs].length > 0) {
				setStory((oldStory) => {
					let newStory = JSON.parse(JSON.stringify(oldStory));
					newStory.data.characterRelationshipsGroups = newStory.data.characterRelationshipsGroups.filter((e) =>
						storyGroupIDs.includes(e?._id)
					);
					newStory.data.characterRelationshipsGroups = newStory.data.characterRelationshipsGroups.concat(
						onlyInStoryGroupIDs?.map((id) => ({ _id: id, reversed: false }))
					);
					return newStory;
				});
			}
		}
	}, [setStory, story, storyGroups]);

	async function revertGroups() {
		const response = await APIRequest("/story/get-value/" + story._id, "POST", {
			story_id: story._id,
			path: ["data", "characterRelationshipsGroups"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setStory((oldStory) => {
			let newStory = JSON.parse(JSON.stringify(oldStory));
			newStory.data.characterRelationshipsGroups = response.data.value;
			return newStory;
		});

		return true;
	}

	async function saveGroups() {
		const response = await APIRequest("/story/" + story._id, "PATCH", {
			story_id: story._id,
			path: ["data", "characterRelationshipsGroups"],
			newValue: story.data.characterRelationshipsGroups,
		});
		console.log(response);
		if (!response || response?.errors) return false;
		return true;
	}

	const [isReorderingRelationshipsGroups, setIsReorderingRelationshipsGroups] = useState(false);

	function toggleIsReorderingRelationshipsGroups() {
		setIsReorderingRelationshipsGroups((oldIsReorderingRelationshipsGroups) => !oldIsReorderingRelationshipsGroups);
	}

	function changeRelationshipsGroupsOrder(res) {
		if (res.from === undefined || res.to === undefined) return;

		let newStory = JSON.parse(JSON.stringify(story));
		const tempRelationshipType = newStory.data.characterRelationshipsGroups.splice(res.from, 1)[0];
		newStory.data.characterRelationshipsGroups.splice(res.to, 0, tempRelationshipType);
		setStory(newStory);
	}

	return {
		isAuthorizedToEdit,
		story,
		storyGroups,
		revertGroups,
		saveGroups,
		toggleIsReorderingRelationshipsGroups,
		isReorderingRelationshipsGroups,
		changeRelationshipsGroupsOrder,
	};
};
