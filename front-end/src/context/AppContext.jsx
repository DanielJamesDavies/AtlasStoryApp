import React, { createContext, useState, useContext, useEffect } from "react";

import { APIContext } from "./APIContext";

import hexToHSL from "../services/HexToHSL";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
	const { APIRequest, user_id, setUserID, username, setUsername, setUserProfilePicture, setUserBanner, setUserFollowingStories } =
		useContext(APIContext);
	const [uiTheme, setUITheme] = useState("dim");
	const [fontSize, setFontSize] = useState("m");
	const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
	const defaultAccentColour = "#0044ff";
	const defaultAccentHoverColour = "#0088ff";
	const [accentColour, setAccentColour] = useState(defaultAccentColour);
	const [accentHoverColour, setAccentHoverColour] = useState(defaultAccentHoverColour);
	const [accentHSL_H, setAccentHSL_H] = useState(0);
	const [coverImage, setCoverImage] = useState(false);

	useEffect(() => {
		if (username === false) {
			setUITheme("dim");
			setFontSize("m");
		} else {
			const font_size = localStorage.getItem("atlas_font_size");
			if (font_size) setFontSize(font_size);
		}
	}, [username, setUITheme, setFontSize]);

	function changeAccentColour(newAccentColour) {
		if (newAccentColour === "default") return setAccentColour(defaultAccentColour);
		setAccentHSL_H(hexToHSL(newAccentColour)[0]);
		setAccentColour(newAccentColour);
	}

	function changeAccentHoverColour(newaccentHoverColour) {
		if (newaccentHoverColour === "default") return setAccentHoverColour(defaultAccentHoverColour);
		setAccentHoverColour(newaccentHoverColour);
	}

	useEffect(() => {
		async function getUser() {
			const response = await APIRequest("/user/me", "GET");
			if (!response || response?.errors || !response?.data?.user) return false;

			const user = response.data.user;
			if (user?._id && user._id !== user_id) setUserID(user._id);
			if (user?.username && user.username !== username) setUsername(user.username);
			if (user?.data?.uiTheme) setUITheme(user.data.uiTheme);
			setUserFollowingStories(user?.data?.followingStories);

			getUserProfilePicture(user?.data?.profilePicture);
			getUserBanner(user?.data?.banner);

			return response?.data?.user;
		}

		async function getUserProfilePicture(profilePictureID) {
			if (!profilePictureID) return false;
			const response = await APIRequest("/image/" + profilePictureID, "GET");
			if (response?.error || !response?.data?.image?.image) return false;
			setUserProfilePicture(response.data.image.image);
			setTimeout(() => setUserProfilePicture(false), 1);
			setTimeout(() => setUserProfilePicture(response.data.image.image), 2);
			return response.data.image.image;
		}

		async function getUserBanner(bannerID) {
			if (!bannerID) return false;
			const response = await APIRequest("/image/" + bannerID, "GET");
			if (response?.error || !response?.data?.image?.image) return false;
			setUserBanner(response.data.image.image);
			return response.data.image.image;
		}

		getUser();
	}, [APIRequest, user_id, setUserID, username, setUsername, setUITheme, setUserProfilePicture, setUserBanner, setUserFollowingStories]);

	return (
		<AppContext.Provider
			value={{
				uiTheme,
				setUITheme,
				fontSize,
				setFontSize,
				fontSizeMultiplier,
				setFontSizeMultiplier,
				accentColour,
				accentHoverColour,
				accentHSL_H,
				changeAccentColour,
				changeAccentHoverColour,
				coverImage,
				setCoverImage,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppProvider;
