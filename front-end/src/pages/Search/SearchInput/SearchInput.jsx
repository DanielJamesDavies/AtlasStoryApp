// Packages

// Components

// Logic
import { SearchInputLogic } from "./SearchInputLogic";

// Context

// Services

// Styles
import "./SearchInput.css";

// Assets

export const SearchInput = ({ searchValue, changeSearchValue }) => {
	const { searchInputRef } = SearchInputLogic();

	return (
		<div className='search-input-container'>
			<input
				ref={searchInputRef}
				className='search-input'
				value={searchValue}
				onChange={changeSearchValue}
				placeholder='Search for Users and Stories'
			/>
		</div>
	);
};
