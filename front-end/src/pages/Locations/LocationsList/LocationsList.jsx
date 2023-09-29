// Packages
import { FaPlus } from "react-icons/fa";

// Components
import { SearchInput } from "../../../components/SearchInput/SearchInput";
import { IconBtn } from "../../../components/IconBtn/IconBtn";
import { FirstAddButton } from "../../../components/FirstAddButton/FirstAddButton";

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
				<IconBtn
					icon={<FaPlus />}
					iconName='plus'
					onClick={() => setIsDisplayingCreateLocationForm(true)}
					seamless={true}
					label='Create Location'
				/>
			</div>
			<div className='locations-list-items'>
				{locations?.length === 0 && story?.data?.members.findIndex((e) => e?.user_id === authorized_user_id) !== -1 ? (
					<div className='objects-list-add-first-container'>
						<FirstAddButton label='Create Location' onClick={() => setIsDisplayingCreateLocationForm(true)} />
					</div>
				) : (
					searchedLocations?.map((location, index) => (
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
					))
				)}
			</div>
		</div>
	);
};
