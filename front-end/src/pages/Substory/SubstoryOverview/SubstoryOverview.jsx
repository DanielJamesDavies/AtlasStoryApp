// Packages

// Components
import { SubstoryOverviewPrimaryImage } from "./PrimaryImage/PrimaryImage";
import { SubstoryOverviewSummaryItems } from "./SummaryItems/SummaryItems";
import { SubstoryOverviewDescription } from "./Description/Description";
import { ChangeOverviewBackground } from "./ChangeOverviewBackground/ChangeOverviewBackground";

// Logic
import { SubstoryOverviewLogic } from "./SubstoryOverviewLogic";

// Context

// Services

// Styles
import "./SubstoryOverview.css";

// Assets

export const SubstoryOverview = ({ innerRef }) => {
	const { substoryOverviewBackground } = SubstoryOverviewLogic();

	return (
		<div className='substory-overview-container'>
			<div ref={innerRef} className='substory-overview'>
				<div className='substory-overview-content'>
					<div className='substory-overview-section-1'>
						<SubstoryOverviewDescription />
					</div>
					<div className='substory-overview-section-2'>
						<SubstoryOverviewPrimaryImage />
						<SubstoryOverviewSummaryItems />
					</div>
				</div>
				<ChangeOverviewBackground />
				<div
					className={
						!substoryOverviewBackground || substoryOverviewBackground === "NO_IMAGE"
							? "substory-overview-background substory-overview-background-no-image"
							: "substory-overview-background"
					}
				>
					{!substoryOverviewBackground || substoryOverviewBackground === "NO_IMAGE" ? null : (
						<img src={substoryOverviewBackground} alt='' />
					)}
				</div>
			</div>
		</div>
	);
};
