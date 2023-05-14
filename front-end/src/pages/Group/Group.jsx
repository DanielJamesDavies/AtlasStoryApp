// Packages

// Components
import { GroupPrimary } from "./Primary/Primary";
import { GroupOverview } from "./Overview/Overview";
import { GroupSectionSwitcher } from "./SectionSwitcher/SectionSwitcher";
import { GroupSubpages } from "./Subpages/Subpages";
import { LoadingCircle } from "../../components/LoadingCircle/LoadingCircle";

// Logic
import { GroupLogic } from "./GroupLogic";

// Context

// Services

// Styles
import "./Group.css";

// Assets

export const Group = () => {
	const { group, groupStyle, groupPrimaryRef, isOnOverviewSection, groupContainerRef, groupOverviewContainerRef, groupSubpagesContainerRef } =
		GroupLogic();

	return (
		<div
			ref={groupContainerRef}
			className={isOnOverviewSection ? "group-container group-container-is-on-overview" : "group-container group-container-is-on-subpages"}
			style={groupStyle ? groupStyle : {}}
		>
			<div className={group && groupStyle ? "group" : "group group-hidden"}>
				<GroupPrimary groupPrimaryRef={groupPrimaryRef} />
				<div
					className={
						isOnOverviewSection
							? "group-content-container group-content-container-is-on-overview"
							: "group-content-container group-content-container-is-on-subpages"
					}
				>
					<GroupOverview innerRef={groupOverviewContainerRef} />
					<GroupSectionSwitcher />
					<GroupSubpages innerRef={groupSubpagesContainerRef} />
				</div>
			</div>
			<div className='group-loading-container'>
				<LoadingCircle size='l' />
			</div>
		</div>
	);
};