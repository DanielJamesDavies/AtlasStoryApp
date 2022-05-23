// Packages
import { useEffect, useState, useContext } from "react";

// Components

// Logic

// Context
import { APIContext } from "../../context/APIContext";
import { RoutesContext } from "../../context/RoutesContext";

// Services

// Styles

// Assets

export const UserLogic = ({ user_id }) => {
	const [user, setUser] = useState(false);
	const { APIRequest } = useContext(APIContext);
	const { location } = useContext(RoutesContext);

	useEffect(() => {
		async function getUser() {
			if (!user_id) return;
			const response = await APIRequest("/user/?username=" + user_id, "GET");
			if (!response.data || response.error) return;

			setUser(response.data);
		}

		getUser();
	}, [location, user_id, APIRequest, setUser]);

	return { user };
};
