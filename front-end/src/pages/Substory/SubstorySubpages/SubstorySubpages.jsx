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

export const SubstorySubpages = ({ innerRef, substoryPrimaryTitleRef, setSubstoryPrimaryPaddingTop }) => {
	const { subpageContainerRef, subpagesContainerStyles, subpage } = SubstorySubpagesLogic({
		substoryPrimaryTitleRef,
		setSubstoryPrimaryPaddingTop,
	});

	return (
		<div className='substory-subpages-container' style={subpagesContainerStyles}>
			<div ref={innerRef} className='substory-subpages'>
				<SubstorySubpagesBtns />
				<div ref={subpageContainerRef} className='substory-subpage-container'>
					{subpage}
				</div>
			</div>
		</div>
	);
};
