// Packages
import { FaArrowRight, FaKeyboard, FaListUl } from "react-icons/fa";

// Components
import { Hierarchy } from "./Hierarchy/Hierarchy";
import { LocationContainer } from "./Location/LocationContainer";
import { ControlScheme } from "./ControlScheme/ControlScheme";
import { Credits } from "./Credits/Credits.jsx";

// Logic
import { MenuLogic } from "./MenuLogic";

// Context

// Services

// Styles
import "./Menu.css";

// Assets

export const Menu = () => {
	const {
		locationsMenuContainerClassName,
		selectedLocationId,
		setSelectedLocationId,
		isDisplayingHierarchy,
		setIsDisplayingHierarchy,
		toggleIsDisplayingHierarchy,
		isDisplayingControlScheme,
		setIsDisplayingControlScheme,
		playerSpeed,
		setPlayerSpeed,
		speedIcons,
		isOnSpaceMap,
	} = MenuLogic();

	return (
		<div
			className={locationsMenuContainerClassName}
			onClick={() => {
				if (selectedLocationId) {
					setSelectedLocationId(false);
				} else {
					setIsDisplayingHierarchy(false);
				}
			}}
		>
			{!isOnSpaceMap ? null : <Credits />}
			<div className='locations-menu-buttons' onClick={(e) => e.stopPropagation()}>
				{!isOnSpaceMap ? null : (
					<div className='locations-menu-speed-container'>
						{speedIcons.map((icon, index) => (
							<div
								key={index}
								className={playerSpeed === index + 1 ? "locations-menu-speed locations-menu-speed-active" : "locations-menu-speed"}
								onClick={() => setPlayerSpeed(index + 1)}
							>
								{icon}
							</div>
						))}
					</div>
				)}
				{[/Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i].some((toMatchItem) => {
					return navigator.userAgent.match(toMatchItem);
				}) || !isOnSpaceMap ? null : (
					<div
						className='locations-menu-btn locations-menu-toggle-control-scheme-visible-btn'
						onMouseEnter={() => setIsDisplayingControlScheme(true)}
						onMouseLeave={() => setIsDisplayingControlScheme(false)}
					>
						<FaKeyboard />
					</div>
				)}
				<div className='locations-menu-btn locations-menu-toggle-hierarchy-visible-btn' onClick={toggleIsDisplayingHierarchy}>
					{!isDisplayingHierarchy ? <FaListUl /> : <FaArrowRight />}
				</div>
			</div>
			{!isOnSpaceMap ? null : <ControlScheme isDisplayingControlScheme={isDisplayingControlScheme} />}
			<Hierarchy />
			<LocationContainer location_id={selectedLocationId} />
		</div>
	);
};
