// Packages
import { useState, useContext } from "react";

// Components

// Logic

// Context
import { AIContext } from "../../context/AIContext";

// Services

// Styles

// Assets

export const AIToolsLogic = ({ type, context }) => {
	const { AI_GPT_Request } = useContext(AIContext);

	const [gpt_messages, setGptMessages] = useState([]);

	async function onImproveBtnClick() {
		let newMessages = JSON.parse(JSON.stringify(gpt_messages));
		newMessages.push({ role: "function", content: "Improve" });
		setGptMessages(newMessages);

		const message = { role: "user", content: "Rewrite this to be more concise and more well-written: " + context.text };
		const gpt_response = await AI_GPT_Request([message]);
		if (!gpt_response) return false;
		const responseMessages = JSON.parse(JSON.stringify(gpt_response?.messages));
		setGptMessages((messages) => messages.concat([responseMessages[responseMessages.length - 1]]));
	}

	async function onSummarizeBtnClick() {
		let newMessages = JSON.parse(JSON.stringify(gpt_messages));
		newMessages.push({ role: "function", content: "Summarize" });
		setGptMessages(newMessages);

		const message = { role: "user", content: "Summrize this into concise bullet points: " + context.text };
		const gpt_response = await AI_GPT_Request([message]);
		if (!gpt_response) return false;
		const responseMessages = JSON.parse(JSON.stringify(gpt_response?.messages));
		setGptMessages((messages) => messages.concat([responseMessages[responseMessages.length - 1]]));
	}

	function clearGptMessages() {
		setGptMessages([]);
	}

	function onCopyBtnClick(text) {
		navigator.clipboard.writeText(text);
	}

	return { gpt_messages, onImproveBtnClick, onSummarizeBtnClick, clearGptMessages, onCopyBtnClick };
};
