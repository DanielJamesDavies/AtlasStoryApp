// Packages

// Components
import { SearchInput } from "../../../components/SearchInput/SearchInput";
import { SearchResultsList } from "./SearchResultsList/SearchResultsList";

// Logic
import { SearchLogic } from "./SearchLogic";

// Context

// Services

// Styles
import "./Search.css";

// Assets

export const Search = () => {
	const { searchValue, changeSearchValue, searchResults } = SearchLogic();

	return (
		<div className='home-search-container'>
			<SearchInput label='Search for Users and Stories' value={searchValue} onChange={changeSearchValue} />
			<SearchResultsList searchResults={searchResults} />
		</div>
	);
};
