// Packages
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faGlobeEurope, faUser, faSpaceShuttle, faClock, faGlobe, faLandmark, faMap } from "@fortawesome/free-solid-svg-icons";

// Components
import { CarouselContainer } from "../../../components/CarouselContainer/CarouselContainer";

// Logic

// Context

// Services

// Styles
import "./StoryIcons.css";

// Assets

export const StoryIcons = () => {
	const pages = [
		{ title: "Characters", icon: <FontAwesomeIcon icon={faUser} /> },
		{ title: "Plots", icon: <FontAwesomeIcon icon={faBookOpen} /> },
		{ title: "World", icon: <FontAwesomeIcon icon={faGlobeEurope} /> },
		{ title: "Locations", icon: <FontAwesomeIcon icon={faGlobe} /> },
		{ title: "Map", icon: <FontAwesomeIcon icon={faMap} /> },
		{ title: "Events", icon: <FontAwesomeIcon icon={faClock} /> },
		{ title: "World Building", icon: <FontAwesomeIcon icon={faLandmark} /> },
		{ title: "Objects", icon: <FontAwesomeIcon icon={faSpaceShuttle} /> },
	];

	return (
		<div className='landing-story-icons-container'>
			<div className='landing-story-icons-title'>Atlas provides tools to store and structure many apsects of a story!</div>
			<CarouselContainer speed={1.1} fallback={true} buttonScroll={true}>
				<div className='landing-story-icons'>
					{pages.map((page, index) => (
						<div key={index} className='landing-story-icons-item'>
							<div className='landing-story-icons-item-icon'>{page.icon}</div>
							<div className='landing-story-icons-item-title'>{page.title}</div>
						</div>
					))}
				</div>
			</CarouselContainer>
		</div>
	);
};
