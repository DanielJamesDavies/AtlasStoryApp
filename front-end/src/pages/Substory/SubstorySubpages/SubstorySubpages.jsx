// Packages

// Components
import { SubstorySubpagesBtns } from "./SubstorySubpagesBtns/SubstorySubpagesBtns";

// Logic
import { SubstorySubpagesLogic } from "./SubstorySubpagesLogic";

// Context

// Services

// Styles
import "./SubstorySubpages.css";

// Assets

export const SubstorySubpages = ({ innerRef }) => {
	const { subpage } = SubstorySubpagesLogic();

	return (
		<div className='character-subpages-container'>
			<div ref={innerRef} className='character-subpages'>
				<SubstorySubpagesBtns />
				<div className='character-subpage-container'>{subpage}</div>
			</div>
		</div>
	);
};
