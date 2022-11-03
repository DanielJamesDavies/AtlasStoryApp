// Packages

// Components

// Logic
import { LoadingCircleLogic } from "./LoadingCircleLogic";

// Context

// Services

// Styles
import "./LoadingCircle.css";

// Assets

export const LoadingCircle = ({ className, size, center }) => {
	const { loadingCircleContainerClassName } = LoadingCircleLogic({ className, size, center });

	return (
		<div className={loadingCircleContainerClassName}>
			<div className='loading-circle'>
				<div className='loading-circle-circle' />
			</div>
		</div>
	);
};
