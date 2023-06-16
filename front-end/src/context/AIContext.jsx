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
				"I am Atlas AI, a large language model trained by OpenAI.",
				"I am always clear, concise, and honest. I don't describe the question, I just answer.",
			];
			const gpt_initial_user_message = [
				"You are a British polymath and are an expert at writing with several decades of experience.",
				"You only write using British english.",
				"You only respond with what is asked of you and never describe what is asked.",
				"Do you understand?",
			];
			const initial_messages = [
				{ role: "system", content: gpt_system_message.join(" ") },
				{ role: "user", content: gpt_initial_user_message.join(" ") },
				{ role: "assistant", content: "Yes, I understand." },
			];

			let newMessages = initial_messages.concat(messages);

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

				if (responseData?.error?.code) {
					switch (responseData?.error?.code) {
						case "invalid_api_key":
							return {
								messages: newMessages.concat([
									{ role: "error", content: "Error: Invalid OpenAI API key. Please enter a valid key in user settings." },
								]),
							};
						default:
							return { messages: newMessages.concat([{ role: "error", content: "Error: Request failed. Please try again." }]) };
					}
				}

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
