// Packages

// Components
import { LocationSubpagesBtns } from "./LocationSubpagesBtns/LocationSubpagesBtns";

// Logic
import { LocationSubpagesLogic } from "./LocationSubpagesLogic";

// Context

// Services

// Styles
import "./LocationSubpages.css";

// Assets

export const LocationSubpages = ({ innerRef, locationPrimaryTitleRef, setLocationPrimaryPaddingTop }) => {
	const { subpageContainerRef, subpagesContainerStyles, subpage } = LocationSubpagesLogic({
		locationPrimaryTitleRef,
		setLocationPrimaryPaddingTop,
	});

	return (
		<div className='location-subpages-container' style={subpagesContainerStyles}>
			<div ref={innerRef} className='location-subpages'>
				<LocationSubpagesBtns />
				<div ref={subpageContainerRef} className='location-subpage-container'>
					{subpage}
				</div>
			</div>
		</div>
	);
};
