// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { GroupContext } from "../../../../GroupContext";
import { APIContext } from "../../../../../../context/APIContext";
import { RoutesContext } from "../../../../../../context/RoutesContext";

// Services

// Styles

// Assets

export const SettingsDeleteLogic = () => {
	const { story_uid, isAuthorizedToEdit, story, group } = useContext(GroupContext);
	const { APIRequest } = useContext(APIContext);
	const { changeLocation } = useContext(RoutesContext);

	const [errors, setErrors] = useState([]);

	async function deleteGroup() {
		if (group?.data?.characters?.length !== 0) {
			setErrors([{ message: "Group Contains Characters and Could Not Be Deleted" }]);
			return false;
		}

		setErrors([]);
		if (!group?._id) return;
		const response = await APIRequest("/group/" + group._id, "DELETE", {
			story_id: story._id,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		changeLocation("/s/" + story_uid + "/characters");
		return true;
	}

	return { isAuthorizedToEdit, group, deleteGroup, errors };
};
