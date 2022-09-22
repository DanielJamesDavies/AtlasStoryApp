// Packages
import { useState, useEffect } from "react";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const TextLogic = ({ value }) => {
	const [text, setText] = useState("");

	useEffect(() => {
		function getNewValue() {
			if (value === undefined) return setText("");

			let newText = [];
			for (let i = 0; i < value.length; i++) {
				if (
					value[i]?.split(" ")?.join("")?.split("")?.length === 0 &&
					i !== value.length - 1 &&
					value[i + 1]?.split(" ")?.join("")?.split("")?.length === 0 &&
					value[i + 1]?.split("")[0] !== "#"
				) {
					newText.push("&nbsp;");
				} else if (
					i !== 0 &&
					value[i - 1]?.split(" ")?.join("")?.split("\t")?.join("")?.split("")[0] === "-" &&
					i !== 0 &&
					value[i]?.split(" ")?.join("")?.split("\t")?.join("")?.split("")[0] !== "-" &&
					i !== 0 &&
					value[i + 1]?.split(" ")?.join("")?.split("\t")?.join("")?.split("")[0] === "-"
				) {
					newText.push("&nbsp;");
				} else {
					newText.push(value[i]);

					if (value[i]?.split(" ")?.join("")?.split("")?.length === 0 && i !== value.length - 1 && value[i + 1]?.split("")[0] !== "#") {
						newText.push("\\");
					}
				}
			}
			setText(newText.join("\n"));
		}
		getNewValue();
	}, [value]);

	return { text };
};
