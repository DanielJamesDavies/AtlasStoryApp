// Packages
import { FaCalendarAlt, FaGlobe, FaLandmark, FaSpaceShuttle } from "react-icons/fa";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const WorldItemsLogic = () => {
	const items = [
		{ id: "locations", title: "Locations", icon: <FaGlobe />, link: "locations" },
		{ id: "events", title: "Events", icon: <FaCalendarAlt />, link: "events" },
		{ id: "objects", title: "Objects", icon: <FaSpaceShuttle />, link: "objects" },
		{ id: "lore", title: "Lore", icon: <FaLandmark />, link: "lore" },
	];

	return { items };
};
