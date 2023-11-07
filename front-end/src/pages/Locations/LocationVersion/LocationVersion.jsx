// Packages
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Components

// Logic
import { LocationVersionLogic } from "./LocationVersionLogic";

// Context

// Services

// Styles
import "./LocationVersion.css";

// Assets

export const LocationVersion = () => {
	const { locations, currentMapLocationId, mapVersionID, decrementMapVersion, incrementMapVersion } = LocationVersionLogic();

	if (locations?.find((e) => e?._id === currentMapLocationId)?.data?.mapVersions?.length < 2) return null;
	return (
		<div className='locations-surface-map-versions-container'>
			<button onClick={decrementMapVersion}>
				<FaChevronLeft />
			</button>
			<div>
				<div className='locations-surface-map-versions-label'>Version</div>
				<div className='locations-surface-map-versions-value'>
					{locations?.find((e) => e?._id === currentMapLocationId)?.data?.mapVersions?.find((e) => e?._id === mapVersionID)?.title}
				</div>
			</div>
			<button onClick={incrementMapVersion}>
				<FaChevronRight />
			</button>
		</div>
	);
};
