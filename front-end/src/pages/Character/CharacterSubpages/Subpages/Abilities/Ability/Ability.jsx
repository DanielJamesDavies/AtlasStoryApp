// Packages

// Components
import { AbilityName } from "./AbilityName/AbilityName";
import { AbilityItems } from "./AbilityItems/AbilityItems";

// Logic

// Context

// Services

// Styles
import "./Ability.css";

// Assets

export const Ability = ({ ability, changeAbility }) => {
	if (!ability) return null;
	return (
		<div className='character-subpage-abilities-ability'>
			<AbilityName ability={ability} changeAbility={changeAbility} />
			<AbilityItems ability={ability} changeAbility={changeAbility} />
		</div>
	);
};
