// Packages
import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Components

// Logic

// Context
import { APIContext } from "../../context/APIContext";

// Services

// Styles

// Assets

export const BrowserContainerLogic = () => {
	const { token } = useContext(APIContext);
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const unauthorizedPages = ["/", "/login/", "/register/"];
		if (!token && unauthorizedPages.findIndex((e) => e === location.pathname || e === location.pathname + "/") === -1) {
			navigate("/login");
		}
	}, [location, navigate, token]);

	return { token };
};
