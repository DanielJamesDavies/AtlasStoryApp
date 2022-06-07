// Packages

// Components

// Logic

// Context

// Services

// Styles
import "./Text.css";

// Assets

export const Text = ({ className, value }) => {
	return (
		<div className={className ? "text-container " + className : "text-container"}>
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
