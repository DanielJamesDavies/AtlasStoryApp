// Packages

// Components
import { PsychologyItems } from "./PsychologyItems/PsychologyItems";
import { BigFive } from "./BigFive/BigFive";

// Logic
import { PsychologyLogic } from "./PsychologyLogic";

// Context

// Services

// Styles
import "./Psychology.css";

// Assets

export const Psychology = () => {
	const { unitVersion } = PsychologyLogic();

	return (
		<div
			className={
				unitVersion?.psychology?.isBigFiveVisible
					? "unit-page-subpage unit-page-subpage-psychology unit-page-subpage-psychology-big-five-visible"
					: "unit-page-subpage unit-page-subpage-psychology"
			}
		>
			<div className='unit-page-subpage-psychology-section-1'>
				<BigFive />
			</div>
			<div className='unit-page-subpage-psychology-section-2'>
				<PsychologyItems />
			</div>
		</div>
	);
};
