// Packages

// Components

// Logic

// Context

// Services

// Styles
import "./SuggestionsMessage.css";

// Assets

export const SuggestionsMessage = ({ suggestions, labelContext }) => {
	if (!suggestions || !Array.isArray(suggestions)) return null;

	return (
		<div className='suggestions-message'>
			{suggestions.length === 0 ? null : (
				<div className='suggestions-message-label'>Suggestions{labelContext === undefined ? "" : " " + labelContext}: </div>
			)}
			{suggestions.map((suggestion, index) => (
				<div className='suggestions-message-suggestion' key={index}>
					{suggestion}
					{index !== suggestions.length - 1 ? "," : ""}
				</div>
			))}
		</div>
	);
};
