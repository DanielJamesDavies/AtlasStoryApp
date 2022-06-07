// Packages

// Components
import { CharacterPrimary } from "./CharacterPrimary/CharacterPrimary";
import { CharacterOverview } from "./CharacterOverview/CharacterOverview";

// Logic
import { CharacterLogic } from "./CharacterLogic";

// Context

// Services

// Styles
import "./Character.css";

// Assets

export const Character = () => {
	const { characterStyle } = CharacterLogic();

	return (
		<div className='character' style={characterStyle}>
			<CharacterPrimary />
			<div className='character-content-container'>
				<CharacterOverview />
			</div>
		</div>
	);
};
