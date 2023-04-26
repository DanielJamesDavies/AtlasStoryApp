// Packages
import { useEffect, useState, useContext } from "react";

// Components

// Logic

// Context
import { APIContext } from "../../context/APIContext";
import { RoutesContext } from "../../context/RoutesContext";

// Styles

// Assets

export const NavigationBarLogic = () => {
	const [isOnStory, setIsOnStory] = useState(false);
	const { APIRequest, username, userProfilePicture } = useContext(APIContext);
	const { location, changeLocation } = useContext(RoutesContext);
	const [storyIcon, setStoryIcon] = useState(false);

	useEffect(() => {
		setIsOnStory(location.split("/")[1] === "s");
	}, [location]);

	useEffect(() => {
		async function getStory() {
			const locationSplit = location.split("/");
			if (locationSplit.length < 3 || locationSplit[1] !== "s") return setStoryIcon(false);
			const response = await APIRequest("/story?uid=" + locationSplit[2] + "&story_uid=" + locationSplit[2], "GET");
			if (response?.error || !response?.data?.story || locationSplit[2] !== response?.data?.story?.uid) return setStoryIcon(false);
			const story = response.data.story;
			getStoryIcon(story?.data?.icon, story?._id);
		}

		async function getStoryIcon(storyIconID, story_id) {
			if (!storyIconID) return false;
			const response = await APIRequest("/image/" + storyIconID + "?story_id=" + story_id, "GET");
			if (response?.error || !response?.data?.image?.image) return setStoryIcon(false);
			setStoryIcon(response.data.image.image);
			return response.data.image.image;
		}

		getStory();
	}, [APIRequest, location, setStoryIcon]);

	function getBtnClassName(btnName, isWithImage) {
		let newBtnClassName = "navigation-bar-btn";
		if (isWithImage) newBtnClassName += " navigation-bar-btn-with-image";
		if (btnName) {
			newBtnClassName += " navigation-bar-btn-" + btnName;
			const locationSplit = location.split("/").filter((e) => e !== "");
			switch (btnName) {
				case "user":
					if (locationSplit.length === 2 && locationSplit[0] === "u" && locationSplit[1] === username) {
						newBtnClassName += " navigation-bar-btn-active";
					}
					break;
				case "home":
					if (locationSplit.length === 1 && locationSplit[0] === "home") {
						newBtnClassName += " navigation-bar-btn-active";
					}
					break;
				case "story":
					if (
						(locationSplit.length === 2 && locationSplit[0] === "s") ||
						(locationSplit.length === 3 && locationSplit[0] === "s" && locationSplit[2] === "notes")
					) {
						newBtnClassName += " navigation-bar-btn-active";
					}
					break;
				case "characters":
					if (
						(locationSplit.length === 3 && locationSplit[2] === "characters") ||
						(locationSplit.length === 4 && locationSplit[2] === "c") ||
						(locationSplit.length === 4 && locationSplit[2] === "characters" && locationSplit[3] === "notes")
					) {
						newBtnClassName += " navigation-bar-btn-active";
					}
					break;
				case "substories":
					if (
						(locationSplit.length === 3 && locationSplit[2] === "substories") ||
						(locationSplit.length === 4 && locationSplit[2] === "s") ||
						(locationSplit.length === 4 && locationSplit[2] === "substories" && locationSplit[3] === "notes")
					) {
						newBtnClassName += " navigation-bar-btn-active";
					}
					break;
				case "world":
					if (
						(locationSplit.length === 3 && locationSplit[2] === "world") ||
						(locationSplit.length === 4 && locationSplit[2] === "world" && locationSplit[3] === "notes") ||
						(locationSplit.length === 3 && locationSplit[2] === "locations") ||
						(locationSplit.length === 3 && locationSplit[2] === "events") ||
						(locationSplit.length === 3 && locationSplit[2] === "objects") ||
						(locationSplit.length === 3 && locationSplit[2] === "lore")
					) {
						newBtnClassName += " navigation-bar-btn-active";
					}
					break;
				default:
					break;
			}
		}
		return newBtnClassName;
	}

	function navigateToProfile(e) {
		if (username) {
			changeLocation("/u/" + username, e.button === 1);
		} else {
			changeLocation("/login", e.button === 1);
		}
	}

	function navigateToHome(e) {
		if (username) {
			changeLocation("/home", e.button === 1);
		} else {
			changeLocation("/login", e.button === 1);
		}
	}

	function navigateToStory(e) {
		if (location.split("/")[1] === "s" && location.split("/").length < 3) return;
		changeLocation("/s/" + location.split("/")[2], e.button === 1);
	}

	function navigateToCharacters(e) {
		if (location.split("/")[1] === "s" && location.split("/").length < 3) return;
		changeLocation("/s/" + location.split("/")[2] + "/characters", e.button === 1);
	}

	function navigateToSubstories(e) {
		if (location.split("/")[1] === "s" && location.split("/").length < 3) return;
		changeLocation("/s/" + location.split("/")[2] + "/substories", e.button === 1);
	}

	function navigateToWorld(e) {
		if (location.split("/")[1] === "s" && location.split("/").length < 3) return;
		changeLocation("/s/" + location.split("/")[2] + "/world", e.button === 1);
	}

	return {
		isOnStory,
		userProfilePicture,
		storyIcon,
		getBtnClassName,
		navigateToProfile,
		navigateToHome,
		navigateToStory,
		navigateToCharacters,
		navigateToSubstories,
		navigateToWorld,
	};
};
