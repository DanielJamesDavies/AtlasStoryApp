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
	if (searchResults.length === 0) {
		return (
			<div className='search-results-list-container'>
				<div className='search-results-list-item-placeholder'></div>
				<div className='search-results-list-item-placeholder'></div>
				<div className='search-results-list-item-placeholder'></div>
			</div>
		);
	}

	return (
		<div className='search-results-list-container'>
			{searchResults.map((searchResult, index) => (
				<SearchResultListItem key={index} searchResult={searchResult} />
			))}
		</div>
	);
};
