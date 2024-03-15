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
	const { subpageContainerRef, subpage, unit, allowSubpageScroll, onSubpagesScrollWheel } = SubpagesLogic();

	if (!unit) return null;
	return (
		<div className='unit-page-subpages-container' onWheel={onSubpagesScrollWheel}>
			<div ref={innerRef} className='unit-page-subpages'>
				<SubpagesBtns />
				<div
					ref={subpageContainerRef}
					className='unit-page-subpage-container'
					onScroll={() => (allowSubpageScroll ? null : (subpageContainerRef.current.scrollTop = 0))}
				>
					{subpage}
				</div>
			</div>
		</div>
	);
};
