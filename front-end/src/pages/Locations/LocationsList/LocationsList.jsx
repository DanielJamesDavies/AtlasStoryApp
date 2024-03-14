// Packages
import { FaPlus } from "react-icons/fa";

// Components
import { SearchInput } from "../../../components/SearchInput/SearchInput";
import { IconBtn } from "../../../components/IconBtn/IconBtn";
import { FirstAddButton } from "../../../components/FirstAddButton/FirstAddButton";
import { LoadingCircle } from "../../../components/LoadingCircle/LoadingCircle";

// Logic
import { LocationsListLogic } from "./LocationsListLogic";

// Context

// Services

// Styles
import "./LocationsList.css";

// Assets

export const LocationsList = () => {
	const {
		authorized_user_id,
		story,
		locations,
		locationTypes,
		searchedLocations,
		searchValue,
		changeSearchValue,
		onClickLocation,
		setIsDisplayingCreateLocationForm,
	} = LocationsListLogic();

	return (
		<div className='locations-list'>
			<div className='locations-list-primary'>
				<SearchInput label='Search Locations' value={searchValue} onChange={changeSearchValue} />
				{story?.data?.members.findIndex((e) => e?.user_id === authorized_user_id && e?.type !== "viewer") === -1 ? null : (
					<IconBtn
						icon={<FaPlus />}
						iconName='plus'
						onClick={() => setIsDisplayingCreateLocationForm(true)}
						seamless={true}
						label='Create Location'
					/>
				)}
			</div>
			<div className='locations-list-items'>
				{story?.data?.locations?.length === 0 &&
				story?.data?.members.findIndex((e) => e?.user_id === authorized_user_id && e?.type !== "viewer") !== -1 ? (
					<div className='objects-list-add-first-container'>
						<FirstAddButton label='Create Location' onClick={() => setIsDisplayingCreateLocationForm(true)} />
					</div>
				) : locations?.length === 0 ? (
					<div className='locations-list-items-loading-circle-container'>
						<LoadingCircle center={true} />
					</div>
				) : (
					searchedLocations
						?.sort((a, b) => b.views - a.views)
						?.map((location, index) => (
							<div
								key={index}
								className='locations-list-item'
								onMouseDown={(e) => e.preventDefault()}
								onClick={(e) => onClickLocation(e, location)}
								onAuxClick={(e) => onClickLocation(e, location)}
							>
								<div className='locations-list-item-icon'>{locationTypes.find((e) => e?.type === location?.type)?.icon}</div>
								<div className='locations-list-item-name'>{location?.data?.name}</div>
								<div className='location-list-item-bullet'></div>
								<div className='locations-list-item-type'>
									{location?.specific_type?.length !== 0 ? (
										<div className='locations-list-item-type-text'>
											{location?.specific_type.charAt(0).toUpperCase() +
												location?.specific_type.replace(/([A-Z])/g, " $1").slice(1)}
										</div>
									) : (
										<div className='locations-list-item-type-text'>
											{location?.type.charAt(0).toUpperCase() + location?.type.replace(/([A-Z])/g, " $1").slice(1)}
										</div>
									)}
								</div>
							</div>
						))
				)}
			</div>
		</div>
	);
};
