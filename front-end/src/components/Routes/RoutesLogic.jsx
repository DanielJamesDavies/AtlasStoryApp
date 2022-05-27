// Packages
import { useContext, useEffect, useState } from "react";

// Components
import { Login } from "../../pages/Login/Login";
import { Register } from "../../pages/Register/Register";
import { UserContainer } from "../../pages/User/UserContainer";
import { StoryContainer } from "../../pages/Story/StoryContainer";
import { CharactersContainer } from "../../pages/Characters/CharactersContainer";
import { SubstoriesContainer } from "../../pages/Substories/SubstoriesContainer";
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
	const { location, changeLocation, setParams } = useContext(RoutesContext);
	const { authorized, username } = useContext(APIContext);
	const { changeAccentColour, changeAccentColourHover } = useContext(AppContext);
	const [renderComponent, setRenderComponent] = useState(null);

	useEffect(() => {
		if (location === "/" && authorized && username) {
			console.log(location);
			setRenderComponent(null);
			return changeLocation("/u/" + username);
		}

		let locationSplit = location.split("/");
		locationSplit.splice(0, 1);

		if (locationSplit.length === 0) return null;

		setRenderComponent(null);
		switch (locationSplit[0]) {
			case "login":
				changeAccentColour("default");
				changeAccentColourHover("default");
				if (!authorized) setRenderComponent(<Login />);
				break;
			case "register":
				changeAccentColour("default");
				changeAccentColourHover("default");
				if (!authorized) setRenderComponent(<Register />);
				break;
			case "u":
				changeAccentColour("default");
				changeAccentColourHover("default");
				setRenderComponent(<UserContainer user_username={locationSplit[1]} />);
				break;
			case "s":
				if (locationSplit.length > 2) {
					switch (locationSplit[2]) {
						case "characters":
							setRenderComponent(<CharactersContainer story_url={locationSplit[1]} />);
							break;
						case "c":
							break;
						case "g":
							break;
						case "substories":
							setRenderComponent(<SubstoriesContainer story_url={locationSplit[1]} />);
							break;
						case "s":
							break;
						case "world":
							setRenderComponent(<WorldContainer story_url={locationSplit[1]} />);
							break;
						case "w":
							break;
						default:
							break;
					}
				} else {
					setRenderComponent(<StoryContainer story_url={locationSplit[1]} />);
				}
				break;
			default:
				changeAccentColour("default");
				changeAccentColourHover("default");
				setRenderComponent(null);
				break;
		}
	}, [authorized, username, location, changeLocation, setRenderComponent, setParams]);

	return { renderComponent };
};
