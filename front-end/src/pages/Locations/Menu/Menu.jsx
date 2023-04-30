// Packages
import { FaArrowRight, FaKeyboard, FaListUl } from "react-icons/fa";

// Components
import { Hierarchy } from "./Hierarchy/Hierarchy";
import { ControlScheme } from "./ControlScheme/ControlScheme";
import { Credits } from "./Credits/Credits.jsx";

// Logic
import { MenuLogic } from "./MenuLogic";

// Context

// Services

// Styles
import "./Menu.css";
import { Details } from "./Details/Details";

// Assets

export const Menu = () => {
	const {
		isDisplayingHierarchy,
		toggleIsDisplayingHierarchy,
		isDisplayingControlScheme,
		setIsDisplayingControlScheme,
		playerSpeed,
		setPlayerSpeed,
		speedIcons,
	} = MenuLogic();

	return (
		<div className={isDisplayingHierarchy ? "locations-menu-container locations-menu-container-is-displaying" : "locations-menu-container"}>
			<Credits />
			<div className='locations-menu-buttons'>
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
				<div
					className='locations-menu-btn locations-menu-toggle-control-scheme-visible-btn'
					onMouseEnter={() => setIsDisplayingControlScheme(true)}
					onMouseLeave={() => setIsDisplayingControlScheme(false)}
				>
					<FaKeyboard />
				</div>
				<div className='locations-menu-btn locations-menu-toggle-hierarchy-visible-btn' onClick={toggleIsDisplayingHierarchy}>
					{!isDisplayingHierarchy ? <FaListUl /> : <FaArrowRight />}
				</div>
			</div>
			<ControlScheme isDisplayingControlScheme={isDisplayingControlScheme} />
			<Hierarchy />
			<Details />
		</div>
	);
};
