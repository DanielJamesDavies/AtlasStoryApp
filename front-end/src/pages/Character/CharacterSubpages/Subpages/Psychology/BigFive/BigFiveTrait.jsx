// Packages

// Components
import { BigFiveAspect } from "./BigFiveAspect";

// Logic

// Context

// Services

// Styles
import "./BigFiveTrait.css";

// Assets

export const BigFiveTrait = ({ trait, isEditing }) => {
	return (
		<div className='character-subpage-big-five-trait-container'>
			<div className='character-subpage-big-five-trait-name'>{trait?.name}</div>
			<div className='character-subpage-big-five-trait-aspects-container'>
				{trait?.aspects.map((aspect, index) => (
					<BigFiveAspect key={index} trait={trait} aspect={aspect} isEditing={isEditing} />
				))}
			</div>
		</div>
	);
};
