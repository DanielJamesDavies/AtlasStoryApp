// Packages

// Components
import { LocationPrimary } from "./Primary/Primary";
import { LocationSubpages } from "./Subpages/Subpages";

// Logic

// Context

// Services

// Styles
import "./Location.css";

// Assets

export const Location = () => {
	return (
		<div className='locations-location-container' onClick={(e) => e.stopPropagation()}>
			<div className='locations-location'>
				<LocationPrimary />
				<LocationSubpages />
			</div>
		</div>
	);
};
