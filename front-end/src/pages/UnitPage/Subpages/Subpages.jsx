// Packages

// Components
import { SubpagesBtns } from "./SubpagesBtns/SubpagesBtns";

// Logic
import { SubpagesLogic } from "./SubpagesLogic";

// Context

// Services

// Styles
import "./Subpages.css";

// Assets

export const Subpages = ({ innerRef }) => {
	const { subpageContainerRef, subpage } = SubpagesLogic();

	return (
		<div className='unit-page-subpages-container'>
			<div ref={innerRef} className='unit-page-subpages'>
				<SubpagesBtns />
				<div ref={subpageContainerRef} className='unit-page-subpage-container'>
					{subpage}
				</div>
			</div>
		</div>
	);
};
