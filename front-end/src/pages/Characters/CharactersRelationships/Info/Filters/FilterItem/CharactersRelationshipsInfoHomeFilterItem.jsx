// Packages
import { FaCheck } from "react-icons/fa";

// Components

// Logic

// Context

// Services

// Styles
import "./CharactersRelationshipsInfoHomeFilterItem.css";

// Assets

export const CharactersRelationshipsInfoHomeFilterItem = ({ name, isActive, onClick }) => {
	return (
		<div
			className={
				isActive
					? "characters-relationship-info-home-filter-item characters-relationship-info-home-filter-item-active"
					: "characters-relationship-info-home-filter-item"
			}
			onClick={onClick}
		>
			<div className='characters-relationship-info-home-filter-item-check-box'>
				<FaCheck />
			</div>
			<div className='characters-relationship-info-home-filter-item-name'>{name}</div>
		</div>
	);
};
