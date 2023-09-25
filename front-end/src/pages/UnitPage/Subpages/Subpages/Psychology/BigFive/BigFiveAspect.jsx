// Packages

// Components
import { SliderInput } from "../../../../../../components/SliderInput/SliderInput";

// Logic
import { BigFiveAspectLogic } from "./BigFiveAspectLogic";

// Context

// Services

// Styles
import "./BigFiveAspect.css";

// Assets

export const BigFiveAspect = ({ trait, aspect, isEditing }) => {
	const { unitVersion, aspectValueText, getPercentileText, changeBigFiveAspect } = BigFiveAspectLogic({ aspect });

	return (
		<div className='unit-page-subpage-psychology-big-five-aspect-container'>
			<div className='unit-page-subpage-psychology-big-five-aspect-text-container'>
				<div className='unit-page-subpage-psychology-big-five-aspect-name'>{aspect?.name}</div>
				<div className='unit-page-subpage-psychology-big-five-aspect-value-percentile'>
					{getPercentileText(unitVersion.psychology.bigFive[aspect.id])}
				</div>
			</div>
			<SliderInput
				value={parseInt(unitVersion?.psychology?.bigFive[aspect?.id])}
				min={0}
				max={100}
				step={1}
				onChange={changeBigFiveAspect}
				enableSlider={isEditing}
				hasPercentageColours={true}
				flipPercentageColours={trait?.id === "neuroticism"}
			/>
			<div className='unit-page-subpage-psychology-big-five-aspect-value-text'>{aspectValueText}</div>
		</div>
	);
};
