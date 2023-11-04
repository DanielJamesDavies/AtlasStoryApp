// Packages
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpaceShuttle, faGlobe, faLandmark, faClock } from "@fortawesome/free-solid-svg-icons";

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
		{ id: "events", title: "Events", icon: <FontAwesomeIcon icon={faClock} />, link: "events" },
		{ id: "world-building", title: "World Building", icon: <FontAwesomeIcon icon={faLandmark} />, link: "world-building" },
		{ id: "objects", title: "Objects", icon: <FontAwesomeIcon icon={faSpaceShuttle} />, link: "objects" },
	];

	return (
		<div className='world-items'>
			{items.map((item, index) => (
				<WorldItem key={index} item={item} />
			))}
		</div>
	);
};
