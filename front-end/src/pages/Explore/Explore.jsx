// Packages
import { useContext, useEffect } from "react";

// Components
import { Search } from "./Search/Search";
import { Stories } from "./Stories/Stories";
import { Genres } from "./Genres/Genres";

// Logic

// Context
import { RoutesContext } from "../../context/RoutesContext";
import { APIContext } from "../../context/APIContext";

// Services

// Styles
import "./Explore.css";

// Assets

export const Explore = () => {
	const { changeLocationParameters } = useContext(RoutesContext);
	const { user_id } = useContext(APIContext);

	useEffect(() => {
		changeLocationParameters([]);
	}, [changeLocationParameters]);

	return (
		<div className='home-container'>
			<Search />
			{user_id ? (
				<div className='home-content'>
					<Stories isAuthorized={true} />
					<Genres />
				</div>
			) : (
				<div className='home-content home-content-unauthorized'>
					<Stories isAuthorized={false} />
				</div>
			)}
		</div>
	);
};
