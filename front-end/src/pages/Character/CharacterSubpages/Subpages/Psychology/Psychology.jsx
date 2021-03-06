// Packages

// Components
import { PsychologyItems } from "./PsychologyItems/PsychologyItems";

// Logic

// Context

// Services

// Styles
import "./Psychology.css";

// Assets

export const Psychology = () => {
	return (
		<div className='character-subpage-psychology'>
			<div className='character-subpage-psychology-section-1'>
				<PsychologyItems />
			</div>
		</div>
	);
};
