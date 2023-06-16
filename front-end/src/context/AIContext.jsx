import React, { createContext, useState, useCallback, useEffect } from "react";

export const AIContext = createContext();

const AIProvider = ({ children }) => {
	const [GPT_API_Key, setGptApiKey] = useState(false);
	const [GPT_Max_Tokens, setGptMaxTokens] = useState(400);

	useEffect(() => {
		function getGptApiKey() {
			const savedGptApiKey = localStorage.getItem("AtlasStoryAppGptApiKey");
			setGptApiKey(savedGptApiKey);
		}
		getGptApiKey();
	}, [setGptApiKey]);

	function updateGptApiKey(key) {
		localStorage.setItem("AtlasStoryAppGptApiKey", key);
		setGptApiKey(key);
	}

	function updateGptMaxTokens(tokens) {
		localStorage.setItem("AtlasStoryAppGptMaxTokens", tokens);
		setGptMaxTokens(tokens);
	}

	const AI_GPT_Request = useCallback(
		async (messages, temperature = 0) => {
			const gpt_system_message = [
				"You are Atlas AI, a large language model trained by OpenAI.",
				"Be clear, concise, and honest. Don't describe the question, just answer.",
				"Thank you!",
			];

			let newMessages = [{ role: "system", content: gpt_system_message.join(" ") }].concat(messages);

			if (!GPT_API_Key)
				return { messages: [{ role: "error", content: "Error: No API Key Given. Please add an OpenAI API Key in your user settings." }] };

			if (isNaN(parseInt(GPT_Max_Tokens))) updateGptMaxTokens(100);

			const data = {
				method: "POST",
				headers: {
					Authorization: "Bearer " + GPT_API_Key,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					model: "gpt-3.5-turbo-0613",
					messages: newMessages,
					max_tokens: isNaN(parseInt(GPT_Max_Tokens)) ? 100 : GPT_Max_Tokens,
					temperature,
				}),
			};

			try {
				const API_URL = "https://api.openai.com/v1/chat/completions";

				const response = await fetch(API_URL, data);

				const responseData = await response.json();

				newMessages.push(responseData?.choices[0]?.message);
				newMessages.splice(0, 1);
				return { messages: newMessages };
			} catch (e) {
				return { messages: newMessages.concat([{ role: "error", content: "Error: Request failed. Please try again." }]) };
			}
		},
		[GPT_API_Key, GPT_Max_Tokens]
	);

	return (
		<AIContext.Provider
			value={{
				AI_GPT_Request,
				GPT_API_Key,
				updateGptApiKey,
				GPT_Max_Tokens,
				updateGptMaxTokens,
			}}
		>
			{children}
		</AIContext.Provider>
	);
};

export default AIProvider;
