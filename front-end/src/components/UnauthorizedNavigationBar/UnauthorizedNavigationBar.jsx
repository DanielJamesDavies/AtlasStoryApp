// Packages

// Components

// Logic
import { UnauthorizedNavigationBarLogic } from "./UnauthorizedNavigationBarLogic";

// Context

// Styles
import "./UnauthorizedNavigationBar.css";

// Assets

export const UnauthorizedNavigationBar = () => {
	const { navigateToLanding, navigateToLogin, navigateToRegister } = UnauthorizedNavigationBarLogic();

	return (
		<div className='unauthorized-navigation-bar'>
			<button className='unauthorized-navigation-bar-landing-btn' onClick={navigateToLanding}>
				Atlas Story App
			</button>
			<button className='unauthorized-navigation-bar-btn' onClick={navigateToLogin}>
				Login
			</button>
			<button className='unauthorized-navigation-bar-btn' onClick={navigateToRegister}>
				Register
			</button>
		</div>
	);
};
