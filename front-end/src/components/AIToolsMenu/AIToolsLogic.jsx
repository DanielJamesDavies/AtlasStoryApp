// Packages
import { useState, useContext, useRef, useLayoutEffect } from "react";

// Components

// Logic

// Context
import { AIContext } from "../../context/AIContext";

// Services

// Styles

// Assets

export const AIToolsLogic = ({ type, context }) => {
	const { AI_GPT_Request } = useContext(AIContext);

	const aiToolsContainerRef = useRef();
	const [aiToolsStyles, setAiToolsStyles] = useState({});

	useLayoutEffect(() => {
		function getAiToolsStyles() {
			if (!aiToolsContainerRef?.current?.clientWidth) return;
			setAiToolsStyles({ width: aiToolsContainerRef.current.clientWidth + "px" });
		}
		getAiToolsStyles();
		setTimeout(() => getAiToolsStyles(), 200);
		window.addEventListener("resize", getAiToolsStyles);
		return () => window.removeEventListener("resize", getAiToolsStyles);
	}, [aiToolsContainerRef]);

	const [gpt_messages, setGptMessages] = useState([]);

	async function onImproveBtnClick() {
		let newMessages = JSON.parse(JSON.stringify(gpt_messages));
		const id = newMessages.length - 1;
		newMessages.push({ id, role: "function", content: "Improve" });
		setGptMessages(newMessages);

		const message = {
			role: "user",
			content:
				"Rewrite the following text, delimited by triple backticks, to be more concise and more well-written. Text: ```" +
				context.text +
				"```",
		};
		const gpt_response = await AI_GPT_Request([message], 0.7);
		if (!gpt_response) return false;
		const responseMessages = JSON.parse(JSON.stringify(gpt_response?.messages));
		let newMessage = responseMessages[responseMessages.length - 1];
		newMessage.id = id;
		setGptMessages((messages) => messages.concat([newMessage]).sort((a, b) => a.id - b.id));
	}

	async function onSummarizeBtnClick() {
		let newMessages = JSON.parse(JSON.stringify(gpt_messages));
		const id = newMessages.length - 1;
		newMessages.push({ id: newMessages.length - 1, role: "function", content: "Summarize" });
		setGptMessages(newMessages);

		const message = {
			role: "user",
			content:
				"Summarize and extract relevant information from the following text, delimited by triple backticks, into a concise list using bullet points. Text: ```" +
				context.text +
				"```",
		};
		const gpt_response = await AI_GPT_Request([message], 0.5);
		if (!gpt_response) return false;
		const responseMessages = JSON.parse(JSON.stringify(gpt_response?.messages));
		let newMessage = responseMessages[responseMessages.length - 1];
		newMessage.id = id;
		setGptMessages((messages) => messages.concat([newMessage]).sort((a, b) => a.id - b.id));
	}

	function clearGptMessages() {
		setGptMessages([]);
	}

	function onCopyBtnClick(text) {
		navigator.clipboard.writeText(text);
	}

	return { aiToolsContainerRef, aiToolsStyles, gpt_messages, onImproveBtnClick, onSummarizeBtnClick, clearGptMessages, onCopyBtnClick };
};
