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
		substory,
		substoryOverviewBackground,
		substoryStyle,
		isOnOverviewSection,
		substoryContainerRef,
		substoryOverviewContainerRef,
		substorySubpagesContainerRef,
		substoryPrimaryTitleRef,
		setSubstoryPrimaryPaddingTop,
	} = SubstoryLogic();

	return (
		<div
			ref={substoryContainerRef}
			className={isOnOverviewSection ? "substory-container substory-container-is-on-overview" : "substory-container"}
			style={substoryStyle ? substoryStyle : {}}
		>
			<div
				className={
					substory && substoryStyle && substoryOverviewBackground
						? "substory-loading-container substory-loading-container-hidden"
						: "substory-loading-container"
				}
			>
				<LoadingCircle size='l' />
			</div>
			<div className={substory && substoryStyle && substoryOverviewBackground ? "substory" : "substory substory-hidden"}>
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
					<SubstorySubpages
						innerRef={substorySubpagesContainerRef}
						substoryPrimaryTitleRef={substoryPrimaryTitleRef}
						setSubstoryPrimaryPaddingTop={setSubstoryPrimaryPaddingTop}
					/>
				</div>
			</div>
		</div>
	);
};
