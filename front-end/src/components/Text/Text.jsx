// Packages
import ReactMarkdown from "react-markdown";

// Components

// Logic
import { TextLogic } from "./TextLogic";

// Context

// Services

// Styles
import "./Text.css";

// Assets

export const Text = ({ className, value, isLightText }) => {
	const { text } = TextLogic({ value });

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
			<ReactMarkdown children={text} components={{ br: () => <span className='line-break'></span> }} />
		</div>
	);
};
