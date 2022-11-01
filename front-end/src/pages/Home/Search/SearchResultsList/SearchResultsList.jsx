// Packages

// Components
import { SearchResultListItem } from "./SearchResultListItem";

// Logic

// Context

// Services

// Styles
import "./SearchResultsList.css";

// Assets

export const SearchResultsList = ({ searchResults }) => {
	if (searchResults.length === 0) return null;
	return (
		<div className='search-results-list-container'>
			{searchResults.map((searchResult, index) => (
				<SearchResultListItem key={index} searchResult={searchResult} />
			))}
		</div>
	);
};
