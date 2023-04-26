// Packages

// Components
import { TextInput } from "../../../../components/TextInput/TextInput";

// Logic
import { AILogic } from "./AILogic";

// Context

// Services

// Styles
import "./AI.css";

// Assets

export const AI = () => {
	const { GPT_API_Key, updateGptApiKey, GPT_Max_Tokens, updateGptMaxTokens } = AILogic();

	return (
		<>
			<div className='user-settings-ai-subtitle'>OpenAI API Key</div>
			<TextInput value={GPT_API_Key} onChange={(e) => updateGptApiKey(e.target.value)} hideValue={true} />
			<div className='user-settings-ai-subtitle'>GPT Token Limit</div>
			<TextInput
				value={GPT_Max_Tokens}
				onChange={(e) =>
					updateGptMaxTokens(e.target.value === "" ? "" : isNaN(parseInt(e.target.value)) ? GPT_Max_Tokens : parseInt(e.target.value))
				}
			/>
		</>
	);
};
