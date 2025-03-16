// Packages

// Components

// Logic
import { LocationTitleLogic } from "./TitleLogic";

// Context

// Services

// Styles
import "./Title.css";

// Assets

export const LocationTitle = () => {
	const { locationTypes, locations, currentMapLocationId, goToLocationBtnRef, goToLocation, onCloseBtnClick } = LocationTitleLogic();

	return (
		<div className='locations-location-title-container'>
			<div className='locations-location-title-label'>
				{locationTypes.find((e) => e?.type === locations.find((e) => e?._id === currentMapLocationId)?.type)?.icon}
				<span>{locationTypes.find((e) => e?.type === locations.find((e) => e?._id === currentMapLocationId)?.type)?.name}</span>
			</div>
			<button
				ref={goToLocationBtnRef}
				className='locations-location-title-btn locations-location-title-go-to-btn'
				onClick={goToLocation}
				onAuxClick={goToLocation}
			>
				Open Location
			</button>
			<button className='locations-location-title-btn locations-location-title-exit-btn' onClick={onCloseBtnClick}>
				View Hierarchy
			</button>
		</div>
	);
};
