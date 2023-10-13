import React, { createContext, useState, useContext, useEffect, useRef } from "react";

import { APIContext } from "../../context/APIContext";
import { RoutesContext } from "../../context/RoutesContext";

export const SettingsContext = createContext();

const SettingsProvider = ({ children }) => {
	const { APIRequest, username } = useContext(APIContext);
	const { location, changeLocationParameters } = useContext(RoutesContext);
	const [isAuthorizedToEdit, setIsAuthorizedToEdit] = useState(false);
	const [user, setUser] = useState(false);
	const [openSubpageID, setOpenSubpageID] = useState("account");
	const [blockedUsers, setBlockedUsers] = useState([]);

	const curr_username = useRef(false);
	useEffect(() => {
		async function getInitial() {
			if (!username) return setStateToDefault();
			if (curr_username.current === username) return false;
			setStateToDefault();

			getBlockedUsers();
			const newUser = await getUser();

			// Document Title
			updateDocumentTitle(newUser);
			setTimeout(() => updateDocumentTitle(newUser), 1000);
		}

		function updateDocumentTitle(newUser) {
			if (newUser?.data?.nickname) {
				document.title = "User Settings | Atlas Story App";
			} else {
				document.title = "https://www.atlas-story.app" + location;
			}
		}

		function setStateToDefault() {
			setUser(false);
			setIsAuthorizedToEdit(false);
		}

		async function getUser() {
			const response = await APIRequest("/user?username=" + username, "GET");
			if (!response || response?.error || !response?.data?.user) {
				setStateToDefault();
				return false;
			}
			curr_username.current = response?.data?.user?.username;
			setIsAuthorizedToEdit(response?.data?.isAuthorizedToEdit);
			setUser(response?.data?.user);
			return response?.data?.user;
		}

		async function getBlockedUsers() {
			const response = await APIRequest("/user-block", "GET");
			if (!response || response?.error || !response?.data?.blockedUsers) {
				return false;
			}
			setBlockedUsers(response?.data?.blockedUsers);
		}

		getInitial();
	}, [location, username, curr_username, APIRequest, setIsAuthorizedToEdit, user, setUser, setBlockedUsers]);

	useEffect(() => {
		changeLocationParameters([]);
	}, [changeLocationParameters]);

	return (
		<SettingsContext.Provider
			value={{
				username,
				auth_username: username,
				isAuthorizedToEdit,
				setIsAuthorizedToEdit,
				user,
				setUser,
				openSubpageID,
				setOpenSubpageID,
				blockedUsers,
				setBlockedUsers,
			}}
		>
			{children}
		</SettingsContext.Provider>
	);
};

export default SettingsProvider;
