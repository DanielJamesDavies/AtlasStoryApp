// Packages

// Components

// Logic

// Context

// Services

// Styles
import "./LoginErrorMessage.css";

// Assets

export const LoginErrorMessage = ({ errors, attribute }) => {
	const errorMessage = errors.find((e) => e.attribute === attribute)?.message;

	if (!errorMessage) return null;

	return <div className='login-error-message'>{errorMessage}</div>;
};
