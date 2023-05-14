// Packages

// Components
import { GroupOverviewSummaryItems } from "./SummaryItems/SummaryItems";
import { GroupOverviewDescription } from "./Description/Description";

// Logic
import { GroupOverviewLogic } from "./OverviewLogic";

// Context

// Services

// Styles
import "./Overview.css";

// Assets
import stars from "../../../content/stars.png";

export const GroupOverview = ({ innerRef }) => {
	const { groupOverviewBackground } = GroupOverviewLogic();

	return (
		<div className='group-overview-container'>
			<div ref={innerRef} className='group-overview'>
				<div className='group-overview-content'>
					<GroupOverviewSummaryItems />
					<GroupOverviewDescription />
				</div>
				<div className='group-overview-background'>
					{!groupOverviewBackground ? null : <img src={groupOverviewBackground} alt='' />}
					<div className='group-overview-background-glow' />
					<img className='group-overview-background-stars' src={stars} alt='' />
				</div>
			</div>
		</div>
	);
};
