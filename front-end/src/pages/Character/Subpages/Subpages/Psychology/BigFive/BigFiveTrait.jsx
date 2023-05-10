// Packages

// Components
import { ContentItem } from "../../../../../../components/ContentItem/ContentItem";
import { BigFiveAspect } from "./BigFiveAspect";

// Logic

// Context

// Services

// Styles
import "./BigFiveTrait.css";

// Assets

export const BigFiveTrait = ({ trait, isEditing }) => {
	return (
		<div className='character-subpage-psychology-big-five-trait-container'>
			<ContentItem hasBg={true}>
				<div className='character-subpage-psychology-big-five-trait-name'>{trait?.name}</div>
				<div className='character-subpage-psychology-big-five-trait-aspects-container'>
					{trait?.aspects.map((aspect, index) => (
						<BigFiveAspect key={index} trait={trait} aspect={aspect} isEditing={isEditing} />
					))}
				</div>
			</ContentItem>
		</div>
	);
};
