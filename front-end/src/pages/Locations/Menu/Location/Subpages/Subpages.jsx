// Packages

// Components
import { LocationSubpagesBtns } from "./SubpagesBtns/SubpagesBtns";

// Logic
import { LocationSubpagesLogic } from "./SubpagesLogic";

// Context

// Services

// Styles
import "./Subpages.css";

// Assets

export const LocationSubpages = ({ innerRef }) => {
	const { subpageContainerRef, subpage } = LocationSubpagesLogic();

	return (
		<div className='locations-location-subpages-container'>
			<div ref={innerRef} className='locations-location-subpages'>
				<LocationSubpagesBtns />
				<div ref={subpageContainerRef} className='locations-location-subpage-container'>
					{subpage}
				</div>
			</div>
		</div>
	);
};
