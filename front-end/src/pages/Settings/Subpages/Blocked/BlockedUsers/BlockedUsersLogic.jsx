// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { SettingsContext } from "../../../SettingsContext";
import { APIContext } from "../../../../../context/APIContext";

// Services

// Styles

// Assets

export const BlockedUsersLogic = () => {
	const { blockedUsers, setBlockedUsers } = useContext(SettingsContext);
	const { APIRequest } = useContext(APIContext);

	async function unblockUser(user_id) {
		const response = await APIRequest("/user-block/" + user_id, "DELETE");
		if (!response || response?.errors) {
			return false;
		}
		setBlockedUsers((oldBlockedUsers) => oldBlockedUsers.filter((e) => JSON.stringify(e._id) !== JSON.stringify(user_id)));
		return true;
	}

	return { blockedUsers, unblockUser };
};
