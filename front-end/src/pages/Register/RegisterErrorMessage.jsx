// Packages

// Components

// Logic

// Context

// Services

// Styles
import "./RegisterErrorMessage.css";

// Assets

export const RegisterErrorMessage = ({ errors, attribute }) => {
	const errorMessage = errors.find((e) => e.attribute === attribute)?.message;

	if (!errorMessage) return null;

	return <div className='register-error-message'>{errorMessage}</div>;
};
