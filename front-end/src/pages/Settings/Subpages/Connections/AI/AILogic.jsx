// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { AppContext } from "../../../../../context/AppContext";
import { AIContext } from "../../../../../context/AIContext";
import { APIContext } from "../../../../../context/APIContext";

// Services

// Styles

// Assets

export const AILogic = () => {
	const { isDisplayingAiAssistant, setIsDisplayingAiAssistant } = useContext(AppContext);
	const { GPT_API_Key, updateGptApiKey, GPT_Max_Tokens, updateGptMaxTokens } = useContext(AIContext);
	const { APIRequest } = useContext(APIContext);

	async function toggleIsDisplayingAiAssistant() {
		const newValue = !isDisplayingAiAssistant;

		const response = await APIRequest("/user/", "PATCH", { path: ["data", "isDisplayingAiAssistant"], newValue });
		if (!response?.errors) setIsDisplayingAiAssistant(newValue);

		return true;
	}

	return {
		isDisplayingAiAssistant,
		toggleIsDisplayingAiAssistant,
		GPT_API_Key,
		updateGptApiKey,
		GPT_Max_Tokens,
		updateGptMaxTokens,
	};
};
