// Packages

// Components
import { AbilityName } from "./AbilityName/AbilityName";
import { AbilityPrimaryStatistic } from "./AbilityPrimaryStatistic/AbilityPrimaryStatistic";
import { AbilityItems } from "./AbilityItems/AbilityItems";
import { AbilityStatistics } from "./AbilityStatistics/AbilityStatistics";

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
			<AbilityPrimaryStatistic ability={ability} changeAbility={changeAbility} />
			<AbilityItems ability={ability} changeAbility={changeAbility} />
			<AbilityStatistics ability={ability} changeAbility={changeAbility} />
		</div>
	);
};
