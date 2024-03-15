// Packages

// Components
import { LoadingCircle } from "../../components/LoadingCircle/LoadingCircle";
import { Primary } from "./Primary/Primary";
import { Overview } from "./Overview/Overview";
import { Subpages } from "./Subpages/Subpages";
import { SectionSwitcher } from "./SectionSwitcher/SectionSwitcher";

// Logic
import { UnitPageLogic } from "./UnitPageLogic";

// Context

// Services

// Styles
import "./UnitPage.css";

// Assets

export const UnitPage = () => {
	const {
		unit,
		unit_type,
		unitOverviewBackground,
		unitOverviewForegrounds,
		unitPageStyle,
		isOnOverviewSection,
		unitPageContainerRef,
		unitOverviewContainerRef,
		unitSubpagesContainerRef,
		unitPagePrimaryRef,
		isUnitPageSubpagesHeaderFullSize,
	} = UnitPageLogic();

	return (
		<div
			ref={unitPageContainerRef}
			className={
				"unit-page-container" +
				(isOnOverviewSection ? " unit-page-container-is-on-overview" : " unit-page-container-is-on-subpages") +
				(isUnitPageSubpagesHeaderFullSize
					? " unit-page-container-subpages-header-full-size"
					: " unit-page-container-subpages-header-not-full-size") +
				" unit-page-container-" +
				unit_type
			}
			style={
				unitPageStyle
					? {
							...unitPageStyle,
							...{
								"--unitPagePaddingTop": isUnitPageSubpagesHeaderFullSize ? "275px" : "95px",
								"--unitPagePaddingTopVariable":
									unitPagePrimaryRef?.current?.clientHeight +
									parseFloat(window.getComputedStyle(unitPagePrimaryRef?.current)?.marginTop) +
									parseFloat(window.getComputedStyle(unitPagePrimaryRef?.current)?.marginBottom) +
									"px",
							},
					  }
					: {}
			}
		>
			<div
				className={
					unit && unitPageStyle && unitOverviewBackground && unitOverviewForegrounds !== false
						? "unit-page-loading-container unit-page-loading-container-hidden"
						: "unit-page-loading-container"
				}
			>
				<LoadingCircle size='l' />
			</div>
			<div
				className={
					unit && unitPageStyle && unitOverviewBackground && unitOverviewForegrounds !== false
						? "unit-page"
						: "unit-page unit-page-hidden"
				}
			>
				<Primary />
				<div
					className={
						isOnOverviewSection
							? "unit-page-content-container unit-page-content-container-is-on-overview"
							: "unit-page-content-container unit-page-content-container-is-on-subpages"
					}
				>
					<Overview innerRef={unitOverviewContainerRef} />
					<SectionSwitcher />
					<Subpages innerRef={unitSubpagesContainerRef} />
				</div>
			</div>
		</div>
	);
};
