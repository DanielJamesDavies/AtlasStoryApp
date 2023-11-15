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

	const GPT_Request = useCallback(
		async (messages, temperature = 0) => {
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
					model: "gpt-3.5-turbo",
					messages: messages,
					max_tokens: isNaN(parseInt(GPT_Max_Tokens)) ? 100 : GPT_Max_Tokens,
					temperature,
				}),
			};

			try {
				const API_URL = "https://api.openai.com/v1/chat/completions";

				const response = await fetch(API_URL, data);

				const responseData = await response.json();

				if (responseData?.error?.code) {
					return { error_code: responseData?.error?.code };
				}

				return { role: responseData?.choices[0]?.message?.role, content: responseData?.choices[0]?.message?.content };
			} catch (e) {
				return { error_code: 0 };
			}
		},
		[GPT_API_Key, GPT_Max_Tokens]
	);

	const AI_GPT_Request = useCallback(
		async (messages, temperature = 0) => {
			const gpt_system_message = [
				"I am Atlas AI.",
				"I am always clear, concise, and honest.",
				"I don't describe the question, I just answer.",
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

			const response = await GPT_Request(newMessages, temperature);

			if (response?.error_code) {
				switch (response?.error_code) {
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

			newMessages.push({ role: response?.role, content: response?.content });
			newMessages.splice(0, 1);
			return { messages: newMessages };
		},
		[GPT_Request]
	);

	const AI_Whisper_Request = useCallback(
		async (audio_file, keywords) => {
			if (!GPT_API_Key) return false;

			let form_data = new FormData();
			form_data.append("model", "whisper-1");
			form_data.append("file", new File([audio_file], "audio.webm"));

			if (keywords) {
				let prompt = "Please listen out for these keywords: " + keywords?.join(", ");
				form_data.append("prompt", prompt);
			}

			const data = {
				method: "POST",
				headers: {
					Authorization: "Bearer " + GPT_API_Key,
				},
				body: form_data,
			};

			try {
				const API_URL = "https://api.openai.com/v1/audio/transcriptions";

				const response = await new Promise((resolve) => {
					fetch(API_URL, data)
						.then((res) => res.json())
						.then((res) => resolve(res))
						.catch(() => {
							resolve(false);
						});
				});

				return response;
			} catch (e) {
				return false;
			}
		},
		[GPT_API_Key]
	);

	const AI_TTS_Request = useCallback(
		async (input, pronunciations) => {
			if (!GPT_API_Key) return false;

			let new_input = JSON.parse(JSON.stringify(input));
			if (pronunciations) {
				pronunciations?.map((pronunciation) => {
					new_input = new_input.replaceAll(pronunciation?.from, pronunciation?.to);
					new_input = new_input.replaceAll(pronunciation?.from.toLowerCase(), pronunciation?.to);
					return true;
				});
			}

			const data = {
				method: "POST",
				headers: {
					Authorization: "Bearer " + GPT_API_Key,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					model: "tts-1",
					input: new_input,
					voice: "fable",
				}),
			};

			try {
				const API_URL = "https://api.openai.com/v1/audio/speech";

				const ctx = new AudioContext();

				const response = await new Promise((resolve) => {
					fetch(API_URL, data)
						.then((data) => data.arrayBuffer())
						.then((arrayBuffer) => ctx.decodeAudioData(arrayBuffer))
						.then((decodedAudio) => {
							resolve(decodedAudio);
						})
						.catch((e) => {
							resolve(false);
						});
				});

				return response;
			} catch (e) {
				return false;
			}
		},
		[GPT_API_Key]
	);

	return (
		<AIContext.Provider
			value={{
				AI_GPT_Request,
				AI_Whisper_Request,
				AI_TTS_Request,
				GPT_Request,
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
