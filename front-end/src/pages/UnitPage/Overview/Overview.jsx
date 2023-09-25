// Packages

// Components
import { Background } from "./Background/Background";
import { Description } from "./Description/Description";
import { PrimaryImage } from "./PrimaryImage/PrimaryImage";
import { SummaryItems } from "./SummaryItems/SummaryItems";

// Logic
import { OverviewLogic } from "./OverviewLogic";

// Context

// Services

// Styles
import "./Overview.css";

// Assets

export const Overview = ({ innerRef }) => {
	OverviewLogic();

	return (
		<div className='unit-page-overview-container'>
			<div ref={innerRef} className='unit-page-overview'>
				<div className='unit-page-overview-content'>
					<div className='unit-page-overview-content-section-1'>
						<Description />
					</div>
					<div className='unit-page-overview-content-section-2'>
						<PrimaryImage />
						<SummaryItems />
					</div>
				</div>
				<Background />
			</div>
		</div>
	);
};
