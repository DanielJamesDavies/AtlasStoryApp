// Packages

// Components
import { GroupSubpagesBtns } from "./SubpagesBtns/SubpagesBtns";

// Logic
import { GroupSubpagesLogic } from "./SubpagesLogic";

// Context

// Services

// Styles
import "./Subpages.css";

// Assets

export const GroupSubpages = ({ innerRef }) => {
	const { subpageContainerRef, subpage } = GroupSubpagesLogic();

	return (
		<div className='group-subpages-container'>
			<div ref={innerRef} className='group-subpages'>
				<GroupSubpagesBtns />
				<div ref={subpageContainerRef} className='group-subpage-container'>
					{subpage}
				</div>
			</div>
		</div>
	);
};
