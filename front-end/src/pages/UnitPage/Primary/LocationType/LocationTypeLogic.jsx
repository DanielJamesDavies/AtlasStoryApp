// Packages
import { useContext } from "react";
import { FaBullseye, FaDiceD6, FaDotCircle, FaGlobe, FaGlobeEurope, FaMap, FaMoon, FaProjectDiagram, FaSatellite, FaSun } from "react-icons/fa";

// Components

// Logic

// Context
import { UnitPageContext } from "../../UnitPageContext";

// Services

// Styles

// Assets

export const LocationTypeLogic = () => {
	const { unit } = useContext(UnitPageContext);

	const location_types_names = {
		reality: "Reality",
		universe: "Universe",
		galaxy: "Galaxy",
		starCluster: "Star Cluster",
		starSystem: "Star System",
		star: "Star",
		planet: "Planet",
		moon: "Moon",
		artificialSatellite: "Artificial Satellite",
		surfaceLocation: "Surface Location",
	};

	const location_types_icons = {
		reality: <FaDiceD6 />,
		universe: <FaGlobe />,
		galaxy: <FaBullseye />,
		starCluster: <FaProjectDiagram />,
		starSystem: <FaDotCircle />,
		star: <FaSun />,
		planet: <FaGlobeEurope />,
		moon: <FaMoon />,
		artificialSatellite: <FaSatellite />,
		surfaceLocation: <FaMap />,
	};

	return { unit, location_types_icons, location_types_names };
};
