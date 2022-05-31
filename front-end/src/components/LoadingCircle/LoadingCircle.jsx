// Packages

// Components

// Logic
import { LoadingCircleLogic } from "./LoadingCircleLogic";

// Context

// Services

// Styles
import "./LoadingCircle.css";

// Assets

export const LoadingCircle = ({ className, size }) => {
	const { loadingCircleContainerClassName } = LoadingCircleLogic({ className, size });

	return (
		<div className={loadingCircleContainerClassName}>
			<div className='loading-circle' />
		</div>
	);
};
