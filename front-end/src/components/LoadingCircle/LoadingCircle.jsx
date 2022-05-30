// Packages

// Components

// Logic

// Context

// Services

// Styles
import "./LoadingCircle.css";

// Assets

export const LoadingCircle = ({ className, size }) => {
	return (
		<div
			className={className ? "loading-circle-container " + className : "loading-circle-container"}
			style={size === undefined ? {} : { width: size, height: size }}
		>
			<div className='loading-circle' />
		</div>
	);
};
