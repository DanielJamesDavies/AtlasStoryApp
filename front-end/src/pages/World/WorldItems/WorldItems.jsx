// Packages
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpaceShuttle, faCalendarAlt, faGlobe, faLandmark } from "@fortawesome/free-solid-svg-icons";

// Components
import { WorldItem } from "./WorldItem/WorldItem";

// Logic

// Context

// Services

// Styles
import "./WorldItems.css";

// Assets

export const WorldItems = () => {
	const items = [
		{ id: "locations", title: "Locations", icon: <FontAwesomeIcon icon={faGlobe} />, link: "locations" },
		{ id: "events", title: "Events", icon: <FontAwesomeIcon icon={faCalendarAlt} />, link: "events" },
		{ id: "objects", title: "Objects", icon: <FontAwesomeIcon icon={faSpaceShuttle} />, link: "objects" },
		{ id: "lore", title: "Lore", icon: <FontAwesomeIcon icon={faLandmark} />, link: "lore" },
	];

	return (
		<div className='world-items'>
			{items.map((item, index) => (
				<WorldItem key={index} item={item} />
			))}
		</div>
	);
};
