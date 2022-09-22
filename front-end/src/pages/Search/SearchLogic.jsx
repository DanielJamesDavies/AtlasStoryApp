// Packages
import { useState, useContext } from "react";

// Components

// Logic

// Context
import { APIContext } from "../../context/APIContext";

// Services

// Styles

// Assets

export const SearchLogic = () => {
	const [searchValue, setSearchValue] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const { APIRequest } = useContext(APIContext);

	async function changeSearchValue(e) {
		setSearchValue(e.target.value);
		if (e.target.value === "") return setSearchResults([]);

		const response = await APIRequest("/search?value=" + e.target.value, "GET");
		if (!response?.data?.searchResults || response?.error) return setSearchResults([]);
		setSearchResults(response.data.searchResults);
	}

	return { searchValue, changeSearchValue, searchResults };
};
