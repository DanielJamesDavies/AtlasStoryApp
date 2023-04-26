// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { AIContext } from "../../../../context/AIContext";

// Services

// Styles

// Assets

export const AILogic = () => {
	const { GPT_API_Key, updateGptApiKey, GPT_Max_Tokens, updateGptMaxTokens } = useContext(AIContext);

	return { GPT_API_Key, updateGptApiKey, GPT_Max_Tokens, updateGptMaxTokens };
};
