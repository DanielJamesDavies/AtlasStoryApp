// Packages

// Components
import { LocationOverviewDescription } from "./Description/Description";
import { ChangeOverviewBackground } from "./ChangeOverviewBackground/ChangeOverviewBackground";

// Logic
import { LocationOverviewLogic } from "./LocationOverviewLogic";

// Context

// Services

// Styles
import "./LocationOverview.css";

// Assets

export const LocationOverview = ({ innerRef }) => {
	const { locationOverviewBackground } = LocationOverviewLogic();

	return (
		<div className='location-overview-container'>
			<div ref={innerRef} className='location-overview'>
				<div className='location-overview-content'>
					<div className='location-overview-section-1'></div>
					<div className='location-overview-section-2'>
						<LocationOverviewDescription />
					</div>
				</div>
				<ChangeOverviewBackground />
				<div
					className={
						!locationOverviewBackground || locationOverviewBackground === "NO_IMAGE"
							? "location-overview-background location-overview-background-no-image"
							: "location-overview-background"
					}
				>
					{!locationOverviewBackground || locationOverviewBackground === "NO_IMAGE" ? null : (
						<img src={locationOverviewBackground} alt='' />
					)}
				</div>
			</div>
		</div>
	);
};
