// Packages

// Components
import { GroupOverviewSummaryItems } from "./SummaryItems/SummaryItems";
import { GroupOverviewDescription } from "./Description/Description";
import { ChangeOverviewBackground } from "./ChangeOverviewBackground/ChangeOverviewBackground";

// Logic
import { GroupOverviewLogic } from "./OverviewLogic";

// Context

// Services

// Styles
import "./Overview.css";

// Assets

export const GroupOverview = ({ innerRef }) => {
	const { groupOverviewBackground } = GroupOverviewLogic();

	return (
		<div className='group-overview-container'>
			<div ref={innerRef} className='group-overview'>
				<div className='group-overview-content'>
					<GroupOverviewDescription />
					<GroupOverviewSummaryItems />
				</div>
				<ChangeOverviewBackground />
				<div
					className={
						!groupOverviewBackground || groupOverviewBackground === "NO_IMAGE"
							? "group-overview-background group-overview-background-no-image"
							: "group-overview-background"
					}
				>
					{!groupOverviewBackground || groupOverviewBackground === "NO_IMAGE" ? null : <img src={groupOverviewBackground} alt='' />}
				</div>
			</div>
		</div>
	);
};
