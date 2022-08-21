// Packages

// Components

// Logic

// Context

// Services

// Styles
import "./Text.css";

// Assets

export const Text = ({ className, value, isLightText }) => {
	return (
		<div
			className={
				className
					? isLightText
						? "text-container text-container-light-text " + className
						: "text-container " + className
					: isLightText
					? "text-container text-container-light-text"
					: "text-container"
			}
		>
			{value === undefined
				? null
				: value.map((paragraph, index) => (
						<p className='text-paragraph' key={index}>
							{paragraph}
						</p>
				  ))}
		</div>
	);
};
