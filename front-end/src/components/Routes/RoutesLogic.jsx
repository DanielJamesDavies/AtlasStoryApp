// Packages
import { useContext, useEffect, useState } from "react";

// Components
import { Login } from "../../pages/Login/Login";
import { Register } from "../../pages/Register/Register";
import { UserContainer } from "../../pages/User/UserContainer";

// Logic

// Context
import { RoutesContext } from "../../context/RoutesContext";
import { APIContext } from "../../context/APIContext";

// Services

// Styles

// Assets

export const RoutesLogic = () => {
	const { location, changeLocation, setParams } = useContext(RoutesContext);
	const { authorized, username } = useContext(APIContext);
	const [renderComponent, setRenderComponent] = useState(null);

	useEffect(() => {
		if (location === "/" && authorized && username) {
			console.log(location);
			setRenderComponent(null);
			return changeLocation("/user/" + username);
		}

		let locationSplit = location.split("/");
		locationSplit.splice(0, 1);

		if (locationSplit.length === 0) return null;

		switch (locationSplit[0]) {
			case "login":
				setRenderComponent(<Login />);
				break;
			case "register":
				setRenderComponent(<Register />);
				break;
			case "user":
				setRenderComponent(<UserContainer user_username={locationSplit[1]} />);
				break;
			default:
				setRenderComponent(null);
				break;
		}
	}, [authorized, username, location, changeLocation, setRenderComponent, setParams]);

	return { renderComponent };
};
