// Packages

// Components

// Logic
import { RegisterBtnLogic } from "./RegisterBtnLogic";

// Context

// Services

// Styles
import "./RegisterBtn.css";

// Assets

export const RegisterBtn = () => {
	const { goToRegisterPage } = RegisterBtnLogic();

	return (
		<div className='landing-hero-register-btn-container'>
			<button className='landing-hero-register-btn' onClick={goToRegisterPage}>
				Get Started
			</button>
		</div>
	);
};
