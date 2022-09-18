// Packages
import { useContext, useEffect, useState } from "react";

// Components
import { Login } from "../../pages/Login/Login";
import { Register } from "../../pages/Register/Register";
import { Verify } from "../../pages/Verify/Verify";
import { UserContainer } from "../../pages/User/UserContainer";
import { StoryContainer } from "../../pages/Story/StoryContainer";
import { CharactersContainer } from "../../pages/Characters/CharactersContainer";
import { CharacterContainer } from "../../pages/Character/CharacterContainer";
import { SubstoriesContainer } from "../../pages/Substories/SubstoriesContainer";
import { SubstoryContainer } from "../../pages/Substory/SubstoryContainer";
import { WorldContainer } from "../../pages/World/WorldContainer";

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
	const { username } = useContext(APIContext);
	const { changeAccentColour, changeAccentHoverColour } = useContext(AppContext);
	const [renderComponent, setRenderComponent] = useState(null);
	const [showUnauthorizedNavigationBar, setShowUnauthorizedNavigationBar] = useState(false);

	useEffect(() => {
		function updateRoutesState() {
			const locationSplit = location.split("?")[0].split("/");
			locationSplit.splice(0, 1);
			if (locationSplit.length === 0) return null;

			// const parametersSplit = location.split("?").length < 2 ? [] : location.split("?")[1].split("&");

			setRenderComponent(null);
			setShowUnauthorizedNavigationBar(false);
			switch (locationSplit[0]) {
				case "login":
					if (!username) {
						changeAccentColour("default");
						changeAccentHoverColour("default");
						setShowUnauthorizedNavigationBar(true);
						setRenderComponent(<Login />);
					} else {
						changeLocation("/u/" + username);
					}
					break;
				case "register":
					if (!username) {
						changeAccentColour("default");
						changeAccentHoverColour("default");
						setShowUnauthorizedNavigationBar(true);
						setRenderComponent(<Register />);
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
				case "s":
					if (locationSplit.length > 2) {
						switch (locationSplit[2]) {
							case "characters":
								setRenderComponent(<CharactersContainer story_uid={locationSplit[1]} />);
								break;
							case "c":
								if (locationSplit.length > 3)
									setRenderComponent(<CharacterContainer story_uid={locationSplit[1]} character_uid={locationSplit[3]} />);
								break;
							case "g":
								break;
							case "substories":
								setRenderComponent(<SubstoriesContainer story_uid={locationSplit[1]} />);
								break;
							case "s":
								if (locationSplit.length > 3)
									setRenderComponent(<SubstoryContainer story_uid={locationSplit[1]} substory_uid={locationSplit[3]} />);
								break;
							case "world":
								setRenderComponent(<WorldContainer story_uid={locationSplit[1]} />);
								break;
							case "w":
								break;
							default:
								break;
						}
					} else {
						setRenderComponent(<StoryContainer story_uid={locationSplit[1]} />);
					}
					break;
				case "search":
					changeAccentColour("default");
					changeAccentHoverColour("default");
					setRenderComponent(null);
					break;
				default:
					if (username) changeLocation("/u/" + username);
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

	return { renderComponent, showUnauthorizedNavigationBar };
};
