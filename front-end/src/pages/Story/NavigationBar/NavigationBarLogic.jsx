// Packages
import { useContext } from "react";
import { FaUser, FaBookOpen, FaGlobeEurope, FaCalendarAlt, FaGlobe, FaLandmark, FaSpaceShuttle } from "react-icons/fa";

// Components

// Logic

// Context
import { RoutesContext } from "../../../context/RoutesContext";

// Services

// Styles

// Assets

export const NavigationBarLogic = () => {
	const { location, changeLocation } = useContext(RoutesContext);

	const pages = [
		{ title: "Characters", icon: <FaUser />, path: "/characters" },
		{ title: "Plots", icon: <FaBookOpen />, path: "/plots" },
		{ title: "World", icon: <FaGlobeEurope />, path: "/world" },
		{ title: "Locations", icon: <FaGlobe />, path: "/locations" },
		{ title: "Events", icon: <FaCalendarAlt />, path: "/events" },
		{ title: "Objects", icon: <FaSpaceShuttle />, path: "/objects" },
		{ title: "Lore", icon: <FaLandmark />, path: "/lore" },
	];

	function goToPage(e, page_path) {
		changeLocation(location + page_path, e.button === 1);
	}

	return { pages, goToPage };
};
