// Packages

// Components
import { Background } from "./Background/Background";
import { Description } from "./Description/Description";
import { PrimaryImage } from "./PrimaryImage/PrimaryImage";
import { Date } from "./Date/Date";
import { SummaryItems } from "./SummaryItems/SummaryItems";
import { LocationProperties } from "./LocationProperties/LocationProperties";
import { JournalViewBtn } from "./JournalViewBtn/JournalViewBtn";

// Logic

// Context

// Services

// Styles
import "./Overview.css";

// Assets

export const Overview = ({ innerRef }) => {
	return (
		<div className='unit-page-overview-container'>
			<div ref={innerRef} className='unit-page-overview'>
				<div className='unit-page-overview-content'>
					<div className='unit-page-overview-content-section-1'>
						<Description />
					</div>
					<div className='unit-page-overview-content-section-2'>
						<PrimaryImage />
						<Date />
						<SummaryItems />
						<LocationProperties />
					</div>
					<div className='unit-page-overview-content-section-3'>
						<JournalViewBtn />
					</div>
				</div>
				<Background />
			</div>
		</div>
	);
};
