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
	const { characterVersion, aspectValueText, getPercentileText, changeBigFiveAspect } = BigFiveAspectLogic({ aspect });

	return (
		<div className='character-subpage-psychology-big-five-aspect-container'>
			<div className='character-subpage-psychology-big-five-aspect-text-container'>
				<div className='character-subpage-psychology-big-five-aspect-name'>{aspect?.name}</div>
				<div className='character-subpage-psychology-big-five-aspect-value-percentile'>
					{getPercentileText(characterVersion.psychology.bigFive[aspect.id])}
				</div>
			</div>
			<SliderInput
				value={parseInt(characterVersion?.psychology?.bigFive[aspect?.id])}
				min={0}
				max={100}
				step={1}
				onChange={changeBigFiveAspect}
				enableSlider={isEditing}
				hasPercentageColours={true}
				flipPercentageColours={trait?.id === "neuroticism"}
			/>
			<div className='character-subpage-psychology-big-five-aspect-value-text'>{aspectValueText}</div>
		</div>
	);
};
