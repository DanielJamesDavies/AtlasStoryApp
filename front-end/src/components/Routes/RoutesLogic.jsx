// Packages
import { useContext, useEffect, useState } from "react";

// Components
import { Register } from "../../pages/Register/Register";
import { Verify } from "../../pages/Verify/Verify";
import { Login } from "../../pages/Login/Login";
import { ForgotPassword } from "../../pages/ForgotPassword/ForgotPassword";
import { ChangeForgottenPassword } from "../../pages/ChangeForgottenPassword/ChangeForgottenPassword";
import { UserContainer } from "../../pages/User/UserContainer";
import { Home } from "../../pages/Home/Home";
import { StoryContainer } from "../../pages/Story/StoryContainer";
import { CharactersContainer } from "../../pages/Characters/CharactersContainer";
import { CharacterContainer } from "../../pages/Character/CharacterContainer";
import { SubstoriesContainer } from "../../pages/Substories/SubstoriesContainer";
import { SubstoryContainer } from "../../pages/Substory/SubstoryContainer";
import { WorldContainer } from "../../pages/World/WorldContainer";
import { NotesContainer } from "../../pages/Notes/NotesContainer";

// Logic

// Context
import { RoutesContext } from "../../context/RoutesContext";
import { APIContext } from "../../context/APIContext";
import { AppContext } from "../../context/AppContext";

// Services

// Styles

// Assets

export const RoutesLogic = () => {
	const { location, changeLocation } = useContext(RoutesContext);
	const { APIRequest, user_id, setUserID, username, setUsername, setUserProfilePicture } = useContext(APIContext);
	const { changeAccentColour, changeAccentHoverColour, setUITheme, setFontSizeMultiplier } = useContext(AppContext);
	const [renderComponent, setRenderComponent] = useState(null);
	const [showUnauthorizedNavigationBar, setShowUnauthorizedNavigationBar] = useState(false);

	useEffect(() => {
		function updateRoutesState() {
			const locationSplit = location.split("?")[0].split("/");
			locationSplit.splice(0, 1);
			if (locationSplit.length === 0) return null;

			setRenderComponent(null);
			setShowUnauthorizedNavigationBar(false);
			switch (locationSplit[0]) {
				case "register":
					if (!username) {
						changeAccentColour("default");
						changeAccentHoverColour("default");
						setShowUnauthorizedNavigationBar(true);
						setRenderComponent(<Register />);
						document.title = "Register | Atlas Story App";
					} else {
						changeLocation("/u/" + username);
					}
					break;
				case "verify":
					if (locationSplit.length >= 4) {
						changeAccentColour("default");
						changeAccentHoverColour("default");
						setShowUnauthorizedNavigationBar(true);
						setRenderComponent(<Verify username={locationSplit[1]} email={locationSplit[2]} verificationCode={locationSplit[3]} />);
					}
					break;
				case "login":
					if (!username) {
						changeAccentColour("default");
						changeAccentHoverColour("default");
						setShowUnauthorizedNavigationBar(true);
						setRenderComponent(<Login />);
						document.title = "Login | Atlas Story App";
					} else {
						changeLocation("/u/" + username);
					}
					break;
				case "forgot-password":
					changeAccentColour("default");
					changeAccentHoverColour("default");
					setShowUnauthorizedNavigationBar(true);
					setRenderComponent(<ForgotPassword />);
					break;
				case "change-forgotten-password":
					if (locationSplit.length >= 4) {
						changeAccentColour("default");
						changeAccentHoverColour("default");
						setShowUnauthorizedNavigationBar(true);
						setRenderComponent(
							<ChangeForgottenPassword username={locationSplit[1]} email={locationSplit[2]} verificationCode={locationSplit[3]} />
						);
					}
					break;
				case "u":
					changeAccentColour("default");
					changeAccentHoverColour("default");
					setRenderComponent(<UserContainer user_username={locationSplit[1]} />);
					break;
				case "home":
					changeAccentColour("default");
					changeAccentHoverColour("default");
					setRenderComponent(<Home />);
					document.title = "Home | Atlas Story App";
					break;
				case "s":
					if (locationSplit.length > 2) {
						switch (locationSplit[2]) {
							case "characters":
								if (locationSplit.length > 3 && locationSplit[3] === "notes") {
									setRenderComponent(<NotesContainer story_uid={locationSplit[1]} notes_uid={locationSplit[2]} />);
									break;
								}
								setRenderComponent(<CharactersContainer story_uid={locationSplit[1]} />);
								break;
							case "c":
								if (locationSplit.length > 3)
									setRenderComponent(<CharacterContainer story_uid={locationSplit[1]} character_uid={locationSplit[3]} />);
								break;
							case "g":
								break;
							case "substories":
								if (locationSplit.length > 3 && locationSplit[3] === "notes") {
									setRenderComponent(<NotesContainer story_uid={locationSplit[1]} notes_uid={locationSplit[2]} />);
									break;
								}
								setRenderComponent(<SubstoriesContainer story_uid={locationSplit[1]} />);
								break;
							case "s":
								if (locationSplit.length > 3)
									setRenderComponent(<SubstoryContainer story_uid={locationSplit[1]} substory_uid={locationSplit[3]} />);
								break;
							case "world":
								if (locationSplit.length > 3 && locationSplit[3] === "notes") {
									setRenderComponent(<NotesContainer story_uid={locationSplit[1]} notes_uid={locationSplit[2]} />);
									break;
								}
								setRenderComponent(<WorldContainer story_uid={locationSplit[1]} />);
								break;
							case "w":
								break;
							case "notes":
								setRenderComponent(<NotesContainer story_uid={locationSplit[1]} notes_uid='all' />);
								break;
							default:
								break;
						}
					} else {
						setRenderComponent(<StoryContainer story_uid={locationSplit[1]} />);
					}
					break;
				case "authorize-spotify":
					break;
				case "spotify":
					break;
				default:
					if (username) changeLocation("/home");
					document.title = "Atlas Story App";
					changeAccentColour("default");
					changeAccentHoverColour("default");
					setRenderComponent(null);
					setShowUnauthorizedNavigationBar(true);
					break;
			}
		}

		let reloadTimer = setTimeout(() => updateRoutesState(), 50);
		return () => {
			clearTimeout(reloadTimer);
		};
	}, [username, location, changeLocation, setRenderComponent, setShowUnauthorizedNavigationBar, changeAccentColour, changeAccentHoverColour]);

	useEffect(() => {
		async function getUser() {
			const response = await APIRequest("/user/me", "GET");
			if (!response || response?.errors || !response?.data?.user) return false;

			const user = response.data.user;
			if (user?._id && user._id !== user_id) setUserID(user._id);
			if (user?.username && user.username !== username) setUsername(user.username);
			if (user?.data?.uiTheme) setUITheme(user.data.uiTheme);
			if (user?.data?.fontSizeMultiplier) {
				const newFontSizeMultiplier = Number(user.data.fontSizeMultiplier);
				setFontSizeMultiplier(isNaN(newFontSizeMultiplier) ? 1 : newFontSizeMultiplier);
			}

			getUserProfilePicture(user?.data?.profilePicture);

			return response?.data?.user;
		}

		async function getUserProfilePicture(userProfilePictureID) {
			if (!userProfilePictureID) return false;
			const response = await APIRequest("/image/" + userProfilePictureID, "GET");
			if (response?.error || !response?.data?.image?.image) return false;
			setUserProfilePicture(response.data.image.image);
			return response.data.image.image;
		}

		getUser();
	}, [APIRequest, user_id, setUserID, username, setUsername, setUITheme, setFontSizeMultiplier, setUserProfilePicture]);

	return { renderComponent, showUnauthorizedNavigationBar };
};
