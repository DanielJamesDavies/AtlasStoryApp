// Packages

// Components
import { AbilitiesList } from "./AbilitiesList/AbilitiesList";
import { Ability } from "./Ability/Ability";

// Logic
import { AbilitiesLogic } from "./AbilitiesLogic";

// Context

// Services

// Styles

// Assets

export const Abilities = () => {
	const { ability, changeAbility, switchAbility } = AbilitiesLogic();

	return (
		<div className='character-subpage-abilities'>
			<AbilitiesList currAbility={ability} switchAbility={switchAbility} />
			<Ability ability={ability} changeAbility={changeAbility} />
		</div>
	);
};
