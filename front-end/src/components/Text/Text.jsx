// Packages
import { useState } from "react";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";

// Components

// Logic

// Context

// Services

// Styles
import "./Text.css";

// Assets

export const Text = ({ className, value, isLightText }) => {
	const [text, setText] = useState("");

	useEffect(() => {
		function getNewValue() {
			let newText = [];
			for (let i = 0; i < value.length; i++) {
				newText.push(value[i]);
				if (value[i].split(" ").join("").split("").length === 0 && i !== value.length - 1) newText.push("\\");
			}
			setText(newText.join("\n"));
		}
		getNewValue();
	}, [value]);

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
			{value === undefined ? null : <ReactMarkdown children={text} />}
		</div>
	);
};
