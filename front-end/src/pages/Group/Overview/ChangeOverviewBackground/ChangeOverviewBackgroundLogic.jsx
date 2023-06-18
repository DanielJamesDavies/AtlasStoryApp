// Packages
import { useContext, useRef } from "react";

// Components

// Logic

// Context
import { GroupContext } from "../../GroupContext";
import { APIContext } from "../../../../context/APIContext";

// Services
import getImageFromFile from "../../../../services/GetImageFromFile";

// Styles

// Assets

export const ChangeOverviewBackgroundLogic = () => {
	const { isAuthorizedToEdit, story, group, groupOverviewBackground, setGroupOverviewBackground } = useContext(GroupContext);
	const { APIRequest } = useContext(APIContext);
	const inputRef = useRef();

	async function changeOverviewBackground(e) {
		if (!group?._id) return;

		let image = await getImageFromFile(e.target.files[0]);
		inputRef.current.value = [];
		if (image?.error || !image?.data) return;
		image = image.data;

		setGroupOverviewBackground(image);

		await APIRequest("/group/" + group?._id, "PATCH", {
			path: ["data", "overviewBackground"],
			newValue: group?.data?.overviewBackground,
			story_id: story._id,
			group_id: group._id,
		});
		const response = await APIRequest("/image/" + group?.data?.overviewBackground, "PATCH", {
			newValue: image,
			story_id: story._id,
			group_id: group._id,
		});
		if (!response || response?.errors) return false;
		return true;
	}

	return {
		isAuthorizedToEdit,
		inputRef,
		groupOverviewBackground,
		changeOverviewBackground,
	};
};
