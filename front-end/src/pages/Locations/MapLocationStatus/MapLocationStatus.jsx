// Packages

// Components

// Logic
import { MapLocationStatusLogic } from "./MapLocationStatusLogic";

// Context

// Services

// Styles
import "./MapLocationStatus.css";
import { FaChevronLeft } from "react-icons/fa";

// Assets

export const MapLocationStatus = () => {
	const {
		locations,
		locationTypes,
		statusPath,
		currentMapLocationId,
		selectedLocationId,
		hoverMapLocationId,
		goBackLocation,
		isOnSpaceMap,
		surfaceMapHoveringRegion,
	} = MapLocationStatusLogic();

	if (!locations) return null;
	return (
		<div className='locations-map-location-status-container'>
			<div className='locations-map-location-status-current-container'>
				<div
					className={
						statusPath.length < 3
							? "locations-map-location-status-back-location-btn-container locations-map-location-status-back-location-btn-container-hidden"
							: "locations-map-location-status-back-location-btn-container"
					}
				>
					<button className='locations-map-location-status-back-location-btn' onClick={goBackLocation}>
						<FaChevronLeft />
					</button>
				</div>
				<div className='locations-map-location-status-path'>
					{statusPath.map((item, index) => (
						<div key={index} className='locations-map-location-status-path-item'>
							<div>{item}</div>
							{index === statusPath.length - 1 ? null : <div className='locations-map-location-status-path-item-arrow'>{">"}</div>}
						</div>
					))}
				</div>
			</div>
			{isOnSpaceMap ? (
				<>
					{!hoverMapLocationId && !selectedLocationId ? null : (
						<div className='locations-map-location-status-next-location-container'>
							<div className='locations-map-location-status-divider'>|</div>
							<div className='locations-map-location-status-next-location'>
								<div className='locations-map-location-status-next-location-icon'>
									{!hoverMapLocationId
										? locationTypes.find(
												(type) =>
													type.type ===
													locations.find((e) => JSON.stringify(e?._id) === JSON.stringify(selectedLocationId))?.type
										  )?.icon
										: locationTypes.find(
												(type) =>
													type.type ===
													locations.find((e) => JSON.stringify(e?._id) === JSON.stringify(hoverMapLocationId))?.type
										  )?.icon}
								</div>
								<div className='locations-map-location-status-next-location-name'>
									{!hoverMapLocationId
										? locations.find((e) => JSON.stringify(e?._id) === JSON.stringify(selectedLocationId))?.data?.name
										: locations.find((e) => JSON.stringify(e?._id) === JSON.stringify(hoverMapLocationId))?.data?.name}
								</div>
							</div>
						</div>
					)}
				</>
			) : (
				<>
					{!surfaceMapHoveringRegion ? null : (
						<div className='locations-map-location-status-next-location-container'>
							<div className='locations-map-location-status-divider'>|</div>
							<div className='locations-map-location-status-next-location'>
								<div className='locations-map-location-status-next-location-name'>
									{
										locations
											.find((e) => JSON.stringify(e?._id) === JSON.stringify(currentMapLocationId))
											?.data?.regions?.find((e) => e?._id === surfaceMapHoveringRegion)?.name
									}
								</div>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
};
