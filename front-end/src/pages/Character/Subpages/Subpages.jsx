// Packages

// Components
import { CharacterSubpagesBtns } from "./SubpagesBtns/SubpagesBtns";

// Logic
import { CharacterSubpagesLogic } from "./SubpagesLogic";

// Context

// Services

// Styles
import "./Subpages.css";

// Assets

export const CharacterSubpages = ({ innerRef }) => {
	const { subpageContainerRef, subpage } = CharacterSubpagesLogic();

	return (
		<div className='character-subpages-container'>
			<div ref={innerRef} className='character-subpages'>
				<CharacterSubpagesBtns />
				<div ref={subpageContainerRef} className='character-subpage-container'>
					{subpage}
				</div>
			</div>
		</div>
	);
};