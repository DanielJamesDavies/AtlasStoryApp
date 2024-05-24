// Packages

// Components

// Logic

// Context

// Services

// Styles
import "./SuggestionsMessage.css";

// Assets

export const SuggestionsMessage = ({ suggestions, labelContext, onClick }) => {
	if (!suggestions || !Array.isArray(suggestions) || suggestions?.length === 0) return null;

	return (
		<div className='suggestions-message'>
			{suggestions.length === 0 ? null : (
				<div className='suggestions-message-label'>Suggestions{labelContext === undefined ? "" : " " + labelContext}: </div>
			)}
			{suggestions.map((suggestion, index) => (
				<div
					className='suggestions-message-suggestion'
					key={index}
					onClick={onClick === undefined ? () => {} : (e) => onClick(e, suggestion)}
				>
					{suggestion}
					{index !== suggestions.length - 1 ? "," : ""}
				</div>
			))}
		</div>
	);
};
