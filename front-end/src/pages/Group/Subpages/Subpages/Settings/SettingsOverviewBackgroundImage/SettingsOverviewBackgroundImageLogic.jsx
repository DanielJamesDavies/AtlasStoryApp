// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { GroupContext } from "../../../../GroupContext";
import { APIContext } from "../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const SettingsOverviewBackgroundImageLogic = () => {
	const { isAuthorizedToEdit, story, group, groupOverviewBackground, setGroupOverviewBackground } = useContext(GroupContext);
	const { APIRequest } = useContext(APIContext);

	const [errors, setErrors] = useState([]);

	function changeOverviewBackground(image) {
		setGroupOverviewBackground(image);
	}

	async function revertOverviewBackground() {
		setErrors([]);
		const response = await APIRequest("/image/" + group?.data?.overviewBackground, "GET");
		if (!response || response?.errors || !response?.data?.image?.image) return false;
		setGroupOverviewBackground(response.data.image.image);
		return true;
	}

	async function saveOverviewBackground() {
		setErrors([]);
		if (!group?._id) return;
		await APIRequest("/group/" + group?._id, "PATCH", {
			path: ["data", "overviewBackground"],
			newValue: group?.data?.overviewBackground,
			story_id: story._id,
			group_id: group._id,
		});
		const response = await APIRequest("/image/" + group?.data?.overviewBackground, "PATCH", {
			newValue: groupOverviewBackground,
			story_id: story._id,
			group_id: group._id,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	return { isAuthorizedToEdit, groupOverviewBackground, changeOverviewBackground, revertOverviewBackground, saveOverviewBackground, errors };
};
