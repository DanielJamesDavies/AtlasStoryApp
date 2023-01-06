// Packages
import { FaSearch } from "react-icons/fa";

// Components

// Logic

// Context

// Services

// Styles
import "./SearchInput.css";

// Assets

export const SearchInput = ({ label, value, onChange }) => {
	return (
		<div className='search-input-container'>
			<input className='search-input' value={value} onChange={onChange} />
			{value !== "" ? null : (
				<div className='search-input-placeholder-container'>
					<div className='search-input-placeholder-icon'>
						<FaSearch />
					</div>
					<div className='search-input-placeholder-text'>{label}</div>
				</div>
			)}
		</div>
	);
};
