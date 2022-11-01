// Packages
import { FaSearch } from "react-icons/fa";

// Components
import { SearchInput } from "./SearchInput/SearchInput";
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
			<SearchInput searchValue={searchValue} changeSearchValue={changeSearchValue} />
			<SearchResultsList searchResults={searchResults} />
		</div>
	);
};
