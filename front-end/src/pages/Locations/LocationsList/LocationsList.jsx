// Packages

// Components

// Logic
import { LocationsListLogic } from "./LocationsListLogic";

// Context

// Services

// Styles
import "./LocationsList.css";
import { SearchInput } from "../../../components/SearchInput/SearchInput";

// Assets

export const LocationsList = () => {
	const { locationTypes, searchedLocations, searchValue, changeSearchValue, onClickLocation } = LocationsListLogic();

	return (
		<div className='locations-list'>
			<SearchInput label='Search Locations' value={searchValue} onChange={changeSearchValue} />
			<div className='locations-list-items'>
				{searchedLocations?.map((location, index) => (
					<div key={index}>
						{index === 0 ? null : <div className='locations-list-item-divider'></div>}
						<div className='locations-list-item' onClick={() => onClickLocation(location)}>
							<div className='locations-list-item-name'>{location?.data?.name}</div>
							<div className='locations-list-item-type'>
								{locationTypes.find((e) => e?.type === location?.type)?.icon}
								<div className='locations-list-item-type-text'>
									{location?.type.charAt(0).toUpperCase() + location?.type.replace(/([A-Z])/g, " $1").slice(1)}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
