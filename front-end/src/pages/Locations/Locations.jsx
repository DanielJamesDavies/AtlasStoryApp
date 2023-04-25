// Packages

// Components
import { LoadingCircle } from "../../components/LoadingCircle/LoadingCircle";
import { Hierarchy } from "./Hierarchy/Hierarchy";

// Logic
import { LocationsLogic } from "./LocationsLogic";

// Context

// Services

// Styles
import "./Locations.css";

// Assets

export const Locations = () => {
	const { story, locations } = LocationsLogic();

	if (!story || !locations)
		return (
			<div className='locations-loading-container'>
				<LoadingCircle center={true} />
			</div>
		);

	return (
		<div className='locations'>
			<Hierarchy />
		</div>
	);
};
