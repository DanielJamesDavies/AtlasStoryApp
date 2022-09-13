// Packages

// Components
import { SubstoryOverviewSummaryItems } from "./SubstoryOverviewSummaryItems";
import { SubstoryOverviewDescription } from "./SubstoryOverviewDescription";

// Logic
import { SubstoryOverviewLogic } from "./SubstoryOverviewLogic";

// Context

// Services

// Styles
import "./SubstoryOverview.css";

// Assets
import stars from "../../../content/stars.png";

export const SubstoryOverview = ({ innerRef }) => {
	const { substoryOverviewBackground } = SubstoryOverviewLogic();

	return (
		<div className='substory-overview-container'>
			<div ref={innerRef} className='substory-overview'>
				<div className='substory-overview-content'>
					<SubstoryOverviewSummaryItems />
					<SubstoryOverviewDescription />
				</div>
				<div className='substory-overview-background'>
					{!substoryOverviewBackground ? null : <img src={substoryOverviewBackground} alt='' />}
					<div className='substory-overview-background-glow' />
					<img className='substory-overview-background-stars' src={stars} alt='' />
				</div>
			</div>
		</div>
	);
};
