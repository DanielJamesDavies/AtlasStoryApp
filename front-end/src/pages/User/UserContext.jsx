import React, { createContext, useState, useContext, useEffect } from "react";

import { APIContext } from "../../context/APIContext";
import { RoutesContext } from "../../context/RoutesContext";

export const UserContext = createContext();

const UserProvider = ({ children, user_username }) => {
	const [user, setUser] = useState(false);
	const [isAuthorizedUserProfile, setIsAuthorizedUserProfile] = useState(false);
	const { APIRequest } = useContext(APIContext);
	const { location } = useContext(RoutesContext);

	useEffect(() => {
		let reloadTimer = setTimeout(() => getUser(), 1);

		async function getUser() {
			if (user.username === user_username) return;
			if (!user_username) return setUser(false);

			// User Data
			const response = await APIRequest("/user/?username=" + user_username, "GET");
			if (!response?.data?.user || response?.error) return;

			setIsAuthorizedUserProfile(response.data?.isAuthorizedUser);

			// Profile Picture Data
			const profilePicture = await getUserProfilePicture(response.data.user.profilePicture);
			if (profilePicture) {
				response.data.user.profilePicture = profilePicture;
			} else {
				response.data.user.profilePicture = false;
			}

			console.log(response.data.user);
			if (user_username === response.data.user.username) setUser(response.data.user);
		}

		async function getUserProfilePicture(profilePictureID) {
			const response = await APIRequest("/image/" + profilePictureID, "GET");
			if (response?.error || !response?.data?.image) return false;
			return response.data.image;
		}

		if (user.username !== user_username) getUser();

		return () => {
			clearTimeout(reloadTimer);
		};
	}, [location, user_username, APIRequest, user, setUser]);

	return <UserContext.Provider value={{ user, setUser, isAuthorizedUserProfile }}>{children}</UserContext.Provider>;
};

export default UserProvider;
