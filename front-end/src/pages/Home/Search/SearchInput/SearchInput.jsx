// Packages
import { FaSearch } from "react-icons/fa";

// Components

// Logic

// Context

// Services

// Styles
import "./SearchInput.css";

// Assets

export const SearchInput = ({ searchValue, changeSearchValue }) => {
	return (
		<div className='search-input-container'>
			<input className='search-input' value={searchValue} onChange={changeSearchValue} />
			{searchValue !== "" ? null : (
				<div className='search-input-placeholder-container'>
					<div className='search-input-placeholder-icon'>
						<FaSearch />
					</div>
					<div className='search-input-placeholder-text'>Search for Users and Stories</div>
				</div>
			)}
		</div>
	);
};
