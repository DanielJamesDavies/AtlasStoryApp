// Packages
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faGlobeEurope, faUser, faSpaceShuttle, faCalendarAlt, faGlobe, faLandmark, faMap } from "@fortawesome/free-solid-svg-icons";

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
		{ title: "Characters", icon: <FontAwesomeIcon icon={faUser} />, path: "/characters" },
		{ title: "Plots", icon: <FontAwesomeIcon icon={faBookOpen} />, path: "/plots" },
		{ title: "World", icon: <FontAwesomeIcon icon={faGlobeEurope} />, path: "/world" },
		{ title: "Locations", icon: <FontAwesomeIcon icon={faGlobe} />, path: "/locations" },
		{ title: "Map", icon: <FontAwesomeIcon icon={faMap} />, path: "/map" },
		{ title: "Events", icon: <FontAwesomeIcon icon={faCalendarAlt} />, path: "/events" },
		{ title: "Objects", icon: <FontAwesomeIcon icon={faSpaceShuttle} />, path: "/objects" },
		{ title: "Lore", icon: <FontAwesomeIcon icon={faLandmark} />, path: "/lore" },
	];

	function goToPage(e, page_path) {
		changeLocation(location + page_path, e.button === 1);
	}

	return { pages, goToPage };
};
