// Packages

// Components

// Logic

// Context

// Services

// Styles
import "./Text.css";

// Assets

export const Text = ({ className, value, isLightText }) => (
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
		{value === undefined ? null : value.map((paragraph, index) => <Paragraph key={index} text={paragraph} />)}
	</div>
);

const Paragraph = ({ text }) => {
	if (text.split("")[0] === "-" && text.split("")[1] === " ") {
		return (
			<div className='text-paragraph-container'>
				<div className='text-paragraph-bullet-point-container'>
					<div className='text-paragraph-bullet-point'></div>
				</div>
				<div className='text-paragraph'>{text.substring(2)}</div>
			</div>
		);
	}
	return <div className='text-paragraph'>{text}</div>;
};
