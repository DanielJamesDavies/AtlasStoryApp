// Packages

// Components

// Logic

// Context

// Services

// Styles
import "./ErrorMessage.css";

// Assets

export const ErrorMessage = ({ errors, attribute }) => {
	const errorMessage = errors?.find((e) => e.attribute === attribute)?.message;

	if (!errorMessage) return null;

	return <div className='error-message'>{errorMessage}</div>;
};
