// Packages

// Components

// Logic

// Context

// Services

// Styles
import "./Text.css";

// Assets

export const Text = (props) => {
	return (
		<div className='text-container'>
			{props.value.map((paragraph, index) => (
				<p className='text-paragraph' key={index}>
					{paragraph}
				</p>
			))}
		</div>
	);
};
