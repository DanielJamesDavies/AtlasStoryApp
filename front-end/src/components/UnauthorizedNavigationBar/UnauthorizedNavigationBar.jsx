// Packages

// Components

// Logic
import { UnauthorizedNavigationBarLogic } from "./UnauthorizedNavigationBarLogic";

// Context

// Styles
import "./UnauthorizedNavigationBar.css";

// Assets
import logo from "../../content/logo.svg";

export const UnauthorizedNavigationBar = () => {
	const { navigateToLanding, navigateToLogin, navigateToRegister } = UnauthorizedNavigationBarLogic();

	return (
		<div className='unauthorized-navigation-bar'>
			<button className='unauthorized-navigation-bar-landing-btn' onClick={navigateToLanding}>
				<img className='unauthorized-navigation-bar-landing-btn-logo' src={logo} alt='' />
				<div className='unauthorized-navigation-bar-landing-btn-text'>Atlas Story App</div>
			</button>
			<button className='unauthorized-navigation-bar-btn unauthorized-navigation-bar-btn-login' onClick={navigateToLogin}>
				Login
			</button>
			<button className='unauthorized-navigation-bar-btn unauthorized-navigation-bar-btn-register' onClick={navigateToRegister}>
				Get Started
			</button>
		</div>
	);
};
