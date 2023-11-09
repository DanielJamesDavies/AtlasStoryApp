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
		<div className='unit-page-subpage-abilities'>
			<AbilitiesList currAbility={ability} changeAbility={changeAbility} switchAbility={switchAbility} />
			<Ability ability={ability} changeAbility={changeAbility} />
		</div>
	);
};
