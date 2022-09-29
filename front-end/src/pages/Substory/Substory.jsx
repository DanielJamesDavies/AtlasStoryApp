// Packages

// Components
import { SubstoryPrimary } from "./SubstoryPrimary/SubstoryPrimary";
import { SubstoryOverview } from "./SubstoryOverview/SubstoryOverview";
import { SubstorySectionSwitcher } from "./SubstorySectionSwitcher/SubstorySectionSwitcher";
import { SubstorySubpages } from "./SubstorySubpages/SubstorySubpages";
import { LoadingCircle } from "../../components/LoadingCircle/LoadingCircle";

// Logic
import { SubstoryLogic } from "./SubstoryLogic";

// Context

// Services

// Styles
import "./Substory.css";

// Assets

export const Substory = () => {
	const {
		substoryStyle,
		isOnOverviewSection,
		substoryContainerRef,
		substoryOverviewContainerRef,
		substorySubpagesContainerRef,
		substoryPrimaryTitleRef,
	} = SubstoryLogic();

	return (
		<div ref={substoryContainerRef} className='substory-container' style={substoryStyle ? substoryStyle : {}}>
			<div className={substoryStyle ? "substory" : "substory substory-hidden"}>
				<SubstoryPrimary substoryPrimaryTitleRef={substoryPrimaryTitleRef} />
				<div
					className={
						isOnOverviewSection
							? "substory-content-container substory-content-container-is-on-overview"
							: "substory-content-container substory-content-container-is-on-subpages"
					}
				>
					<SubstoryOverview innerRef={substoryOverviewContainerRef} />
					<SubstorySectionSwitcher />
					<SubstorySubpages innerRef={substorySubpagesContainerRef} substoryPrimaryTitleRef={substoryPrimaryTitleRef} />
				</div>
			</div>
			<div className='substory-loading-container'>
				<LoadingCircle size='l' />
			</div>
		</div>
	);
};
