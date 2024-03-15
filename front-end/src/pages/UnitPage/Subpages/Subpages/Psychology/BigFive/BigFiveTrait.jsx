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
		<div className='unit-page-subpage-psychology-big-five-trait-container'>
			<div className='unit-page-subpage-psychology-big-five-trait-name'>{trait?.name}</div>
			<div className='unit-page-subpage-psychology-big-five-trait-aspects-container'>
				{trait?.aspects.map((aspect, index) => (
					<BigFiveAspect key={index} trait={trait} aspect={aspect} isEditing={isEditing} />
				))}
			</div>
		</div>
	);
};
