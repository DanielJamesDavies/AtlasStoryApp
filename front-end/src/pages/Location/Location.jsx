// Packages

// Components
import { LocationPrimary } from "./LocationPrimary/LocationPrimary";
import { LocationOverview } from "./LocationOverview/LocationOverview";
import { LocationSectionSwitcher } from "./LocationSectionSwitcher/LocationSectionSwitcher";
import { LocationSubpages } from "./LocationSubpages/LocationSubpages";
import { LoadingCircle } from "../../components/LoadingCircle/LoadingCircle";

// Logic
import { LocationLogic } from "./LocationLogic";

// Context

// Services

// Styles
import "./Location.css";

// Assets

export const Location = () => {
	const {
		location,
		locationOverviewBackground,
		locationStyle,
		isOnOverviewSection,
		locationContainerRef,
		locationOverviewContainerRef,
		locationSubpagesContainerRef,
		locationPrimaryTitleRef,
		setLocationPrimaryPaddingTop,
	} = LocationLogic();

	return (
		<div
			ref={locationContainerRef}
			className={isOnOverviewSection ? "location-container location-container-is-on-overview" : "location-container"}
			style={locationStyle ? locationStyle : {}}
		>
			<div
				className={
					location && locationStyle && locationOverviewBackground
						? "location-loading-container location-loading-container-hidden"
						: "location-loading-container"
				}
			>
				<LoadingCircle size='l' />
			</div>
			<div className={location && locationStyle && locationOverviewBackground ? "location" : "location location-hidden"}>
				<LocationPrimary locationPrimaryTitleRef={locationPrimaryTitleRef} />
				<div
					className={
						isOnOverviewSection
							? "location-content-container location-content-container-is-on-overview"
							: "location-content-container location-content-container-is-on-subpages"
					}
				>
					<LocationOverview innerRef={locationOverviewContainerRef} />
					<LocationSectionSwitcher />
					<LocationSubpages
						innerRef={locationSubpagesContainerRef}
						locationPrimaryTitleRef={locationPrimaryTitleRef}
						setLocationPrimaryPaddingTop={setLocationPrimaryPaddingTop}
					/>
				</div>
			</div>
		</div>
	);
};
