// Packages
import { useContext, useEffect, useRef, useState } from "react";

// Components
import { Landing } from "../../pages/Landing/Landing";
import { Login } from "../../pages/Login/Login";
import { ForgotPassword } from "../../pages/ForgotPassword/ForgotPassword";
import { ChangeForgottenPassword } from "../../pages/ChangeForgottenPassword/ChangeForgottenPassword";
import { Register } from "../../pages/Register/Register";
import { Verify } from "../../pages/Verify/Verify";
import { UserContainer } from "../../pages/User/UserContainer";
import { SettingsContainer } from "../../pages/Settings/SettingsContainer";
import { Home } from "../../pages/Home/Home";
import { Story } from "../../pages/Story/Story";
import { UnitPageContainer } from "../../pages/UnitPage/UnitPageContainer";
import { CharactersContainer } from "../../pages/Characters/CharactersContainer";
import { SubstoriesContainer } from "../../pages/Substories/SubstoriesContainer";
import { WorldContainer } from "../../pages/World/WorldContainer";
import { LocationsContainer } from "../../pages/Locations/LocationsContainer";
import { EventsContainer } from "../../pages/Events/EventsContainer";
import { ObjectsContainer } from "../../pages/Objects/ObjectsContainer";
import { LoreContainer } from "../../pages/Lore/LoreContainer";
import { NotesContainer } from "../../pages/Notes/NotesContainer";
import { Spotify } from "../../pages/Spotify/Spotify";

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
	const { APIRequest, user_id, setUserID, username, setUsername, setUserProfilePicture, setUserBanner } = useContext(APIContext);
	const { changeAccentColour, changeAccentHoverColour, setUITheme } = useContext(AppContext);

	const contentContainerRef = useRef();
	const [renderComponent, setRenderComponent] = useState(null);
	const [showUnauthorizedNavigationBar, setShowUnauthorizedNavigationBar] = useState(false);

	useEffect(() => {
		function setFaviconToDefault() {
			document.getElementById("favicon").setAttribute("href", "/favicon.ico");
		}

		function updateRoutesState() {
			const locationSplit = location.split("?")[0].split("/");
			locationSplit.splice(0, 1);
			if (locationSplit.length === 0) return null;
			document.title = "https://www.atlas-story.app" + location;

			setRenderComponent(null);
			setShowUnauthorizedNavigationBar(false);

			if (window !== window.parent) return null;
			if (["authorize-spotify"].includes(locationSplit[0])) return null;

			if (locationSplit[0] !== "s") setFaviconToDefault();
			switch (locationSplit[0]) {
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
				case "u":
					changeAccentColour("default");
					changeAccentHoverColour("default");
					setRenderComponent(<UserContainer user_username={locationSplit[1]} />);
					break;
				case "settings":
					changeAccentColour("default");
					changeAccentHoverColour("default");
					setRenderComponent(<SettingsContainer />);
					break;
				case "home":
					changeAccentColour("default");
					changeAccentHoverColour("default");
					setRenderComponent(<Home />);
					document.title = "Home | Atlas Story App";
					break;
				case "spotify":
					setRenderComponent(<Spotify />);
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
									setRenderComponent(
										<UnitPageContainer
											story_uid={locationSplit[1]}
											unit_uid={locationSplit[3]}
											unit_type='character'
											unit_type_title='Character'
											type_url_key='c'
										/>
									);
								break;
							case "g":
								if (locationSplit.length > 3)
									setRenderComponent(
										<UnitPageContainer
											story_uid={locationSplit[1]}
											unit_uid={locationSplit[3]}
											unit_type='group'
											unit_type_title='Group'
											type_url_key='g'
										/>
									);
								break;
							case "plots":
								if (locationSplit.length > 3 && locationSplit[3] === "notes") {
									setRenderComponent(<NotesContainer story_uid={locationSplit[1]} notes_uid={locationSplit[2]} />);
									break;
								}
								setRenderComponent(<SubstoriesContainer story_uid={locationSplit[1]} />);
								break;
							case "p":
								if (locationSplit.length > 3)
									setRenderComponent(
										<UnitPageContainer
											story_uid={locationSplit[1]}
											unit_uid={locationSplit[3]}
											unit_type='plot'
											unit_type_title='Plot'
											type_url_key='p'
										/>
									);
								break;
							case "world":
								if (locationSplit.length > 3 && locationSplit[3] === "notes") {
									setRenderComponent(<NotesContainer story_uid={locationSplit[1]} notes_uid={locationSplit[2]} />);
									break;
								}
								setRenderComponent(<WorldContainer story_uid={locationSplit[1]} />);
								break;
							case "locations":
							case "map":
								if (locationSplit.length > 3 && locationSplit[3] === "notes") {
									setRenderComponent(<NotesContainer story_uid={locationSplit[1]} notes_uid={locationSplit[2]} />);
									break;
								}
								setRenderComponent(<LocationsContainer story_uid={locationSplit[1]} />);
								break;
							case "l":
								if (locationSplit.length > 3)
									setRenderComponent(
										<UnitPageContainer
											story_uid={locationSplit[1]}
											unit_uid={locationSplit[3]}
											unit_type='location'
											unit_type_title='Location'
											type_url_key='l'
										/>
									);
								break;
							case "events":
								if (locationSplit.length > 3 && locationSplit[3] === "notes") {
									setRenderComponent(<NotesContainer story_uid={locationSplit[1]} notes_uid={locationSplit[2]} />);
									break;
								}
								setRenderComponent(<EventsContainer story_uid={locationSplit[1]} />);
								break;
							case "e":
								if (locationSplit.length > 3)
									setRenderComponent(
										<UnitPageContainer
											story_uid={locationSplit[1]}
											unit_uid={locationSplit[3]}
											unit_type='event'
											unit_type_title='Event'
											type_url_key='e'
										/>
									);
								break;
							case "objects":
								if (locationSplit.length > 3 && locationSplit[3] === "notes") {
									setRenderComponent(<NotesContainer story_uid={locationSplit[1]} notes_uid={locationSplit[2]} />);
									break;
								}
								setRenderComponent(<ObjectsContainer story_uid={locationSplit[1]} />);
								break;
							case "o":
								if (locationSplit.length > 3)
									setRenderComponent(
										<UnitPageContainer
											story_uid={locationSplit[1]}
											unit_uid={locationSplit[3]}
											unit_type='object'
											unit_type_title='Object'
											type_url_key='o'
										/>
									);
								break;
							case "world-building":
								if (locationSplit.length > 3 && locationSplit[3] === "notes") {
									setRenderComponent(<NotesContainer story_uid={locationSplit[1]} notes_uid={locationSplit[2]} />);
									break;
								}
								setRenderComponent(<LoreContainer story_uid={locationSplit[1]} />);
								break;
							case "w":
								if (locationSplit.length > 3)
									setRenderComponent(
										<UnitPageContainer
											story_uid={locationSplit[1]}
											unit_uid={locationSplit[3]}
											unit_type='lore'
											unit_type_title='World Item'
											type_url_key='w'
										/>
									);
								break;
							case "notes":
								setRenderComponent(<NotesContainer story_uid={locationSplit[1]} notes_uid='all' />);
								break;
							default:
								break;
						}
					} else {
						setRenderComponent(<Story story_uid={locationSplit[1]} />);
					}
					break;
				default:
					if (username) changeLocation("/home");
					document.title = "Atlas Story App";

					changeAccentColour("default");
					changeAccentHoverColour("default");
					setRenderComponent(<Landing />);
					setShowUnauthorizedNavigationBar(true);
					break;
			}
		}

		updateRoutesState();
	}, [username, location, changeLocation, setRenderComponent, setShowUnauthorizedNavigationBar, changeAccentColour, changeAccentHoverColour]);

	useEffect(() => {
		async function getUser() {
			const response = await APIRequest("/user/me", "GET");
			if (!response || response?.errors || !response?.data?.user) return false;

			const user = response.data.user;
			if (user?._id && user._id !== user_id) setUserID(user._id);
			if (user?.username && user.username !== username) setUsername(user.username);
			if (user?.data?.uiTheme) setUITheme(user.data.uiTheme);

			getUserProfilePicture(user?.data?.profilePicture);
			getUserBanner(user?.data?.banner);

			return response?.data?.user;
		}

		async function getUserProfilePicture(profilePictureID) {
			if (!profilePictureID) return false;
			const response = await APIRequest("/image/" + profilePictureID, "GET");
			if (response?.error || !response?.data?.image?.image) return false;
			setUserProfilePicture(response.data.image.image);
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
	}, [APIRequest, user_id, setUserID, username, setUsername, setUITheme, setUserProfilePicture, setUserBanner]);

	useEffect(() => {
		contentContainerRef.current.scrollTop = 0;
	}, [contentContainerRef, location]);

	return { contentContainerRef, renderComponent, showUnauthorizedNavigationBar };
};
