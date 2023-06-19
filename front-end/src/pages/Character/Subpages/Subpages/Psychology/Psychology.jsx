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
	const { characterVersion } = PsychologyLogic();

	return (
		<div
			className={
				characterVersion?.psychology?.isBigFiveVisible
					? "character-subpage-psychology character-subpage-psychology-big-five-visible"
					: "character-subpage-psychology"
			}
		>
			<div className='character-subpage-psychology-section-1'>
				<PsychologyItems />
			</div>
			<div className='character-subpage-psychology-section-2'>
				<BigFive />
			</div>
		</div>
	);
};
