// Packages
import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";

// Components

// Logic

// Context
import { APIContext } from "../../context/APIContext";

// Services

// Styles

// Assets

export const UserLogic = () => {
	const [user, setUser] = useState(false);
	const { APIRequest } = useContext(APIContext);
	const location = useLocation();

	useEffect(() => {
		console.log(location);
		// getUser();
	}, []);

	async function getUser() {
		const response = await APIRequest("/user/", "GET");
		console.log(response);
	}

	return { user };
};
