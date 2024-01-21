// Packages
import { useContext, useEffect } from "react";

// Components
import { Search } from "./Search/Search";
import { Stories } from "./Stories/Stories";
import { Genres } from "./Genres/Genres";

// Logic

// Context
import { RoutesContext } from "../../context/RoutesContext";

// Services

// Styles
import "./Explore.css";

// Assets

export const Explore = () => {
	const { changeLocationParameters } = useContext(RoutesContext);

	useEffect(() => {
		changeLocationParameters([]);
	}, [changeLocationParameters]);

	return (
		<div className='home-container'>
			<Search />
			<div className='home-content'>
				<Stories />
				<Genres />
			</div>
		</div>
	);
};
