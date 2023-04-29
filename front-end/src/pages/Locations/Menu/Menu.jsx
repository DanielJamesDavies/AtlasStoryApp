// Packages
import { FaArrowRight, FaFighterJet, FaKeyboard, FaListUl } from "react-icons/fa";
import { GiRabbit, GiSnail } from "react-icons/gi";

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
		playerActions,
		playerSpeed,
	} = MenuLogic();

	return (
		<div className={isDisplayingHierarchy ? "locations-menu-container locations-menu-container-is-displaying" : "locations-menu-container"}>
			<Credits />
			<div className='locations-menu-buttons'>
				<div className='locations-menu-btn locations-menu-speed'>
					{Object.entries(playerActions).filter(([_, value]) => value).length === 0 ? null : (
						<>
							{!(playerSpeed >= 3) ? null : <FaFighterJet />}
							{!(playerSpeed === 2) ? null : <GiRabbit />}
							{!(playerSpeed === 1) ? null : <GiSnail />}
						</>
					)}
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
