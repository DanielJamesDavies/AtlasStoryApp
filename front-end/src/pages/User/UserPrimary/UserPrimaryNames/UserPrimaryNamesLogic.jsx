// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { UserContext } from "../../UserContext";
import { APIContext } from "../../../../context/APIContext";

// Services

// Styles

// Assets

export const UserPrimaryNamesLogic = () => {
	const { isAuthorizedToEdit, user, setUser } = useContext(UserContext);
	const { APIRequest } = useContext(APIContext);

	async function changeNickname(e) {
		setUser((oldUser) => {
			let newUser = JSON.parse(JSON.stringify(oldUser));
			newUser.data.nickname = e.target.value;
			return newUser;
		});
	}

	async function revertNickname() {
		const response = await APIRequest("/user/", "GET");
		if (!response || response?.errors || !response?.data?.user?.data?.nickname) return false;
		setUser((oldUser) => {
			let newUser = JSON.parse(JSON.stringify(oldUser));
			newUser.data.nickname = response.data.user.data?.nickname;
			return newUser;
		});
		return true;
	}

	async function saveNickname() {
		if (!user?.data?.nickname) return false;
		const response = await APIRequest("/user/", "PATCH", { path: ["data", "nickname"], newValue: user.data.nickname });
		if (!response || response?.errors) return false;
		return true;
	}

	return { isAuthorizedToEdit, user, changeNickname, revertNickname, saveNickname };
};
