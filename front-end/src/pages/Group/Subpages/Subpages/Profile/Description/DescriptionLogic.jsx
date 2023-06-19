// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { GroupContext } from "../../../../GroupContext";
import { APIContext } from "../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const GroupProfileDescriptionLogic = () => {
	const { isAuthorizedToEdit, story, group, groupVersion, changeGroupVersion } = useContext(GroupContext);
	const { APIRequest } = useContext(APIContext);

	function changeDescription(e) {
		let newGroupVersion = JSON.parse(JSON.stringify(groupVersion));
		newGroupVersion.description = e.target.value.split("\n");
		changeGroupVersion(newGroupVersion);
	}

	async function revertDescription() {
		const response = await APIRequest("/group/get-value/" + group._id, "POST", {
			story_id: story._id,
			path: ["data", "versions", groupVersion._id, "description"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		let newGroupVersion = JSON.parse(JSON.stringify(groupVersion));
		newGroupVersion.description = response.data.value;
		changeGroupVersion(newGroupVersion);

		return true;
	}

	async function saveDescription() {
		const response = await APIRequest("/group/" + group._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions", groupVersion._id, "description"],
			newValue: groupVersion.description,
		});
		if (!response || response?.errors) return false;
		return true;
	}

	return { isAuthorizedToEdit, groupVersion, changeDescription, revertDescription, saveDescription };
};
