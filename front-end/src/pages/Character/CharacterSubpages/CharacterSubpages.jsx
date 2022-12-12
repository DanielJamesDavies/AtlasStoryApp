// Packages

// Components
import { CharacterSubpagesBtns } from "./CharacterSubpagesBtns/CharacterSubpagesBtns";

// Logic
import { CharacterSubpagesLogic } from "./CharacterSubpagesLogic";

// Context

// Services

// Styles
import "./CharacterSubpages.css";

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
