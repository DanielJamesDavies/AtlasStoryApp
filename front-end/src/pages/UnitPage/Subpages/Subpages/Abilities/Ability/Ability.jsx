// Packages

// Components
import { AbilityName } from "./AbilityName/AbilityName";
import { AbilityPrimaryStatistic } from "./AbilityPrimaryStatistic/AbilityPrimaryStatistic";
import { AbilityItems } from "./AbilityItems/AbilityItems";
import { AbilityStatistics } from "./AbilityStatistics/AbilityStatistics";

// Logic
import { AbilityLogic } from "./AbilityLogic";

// Context

// Services

// Styles
import "./Ability.css";

// Assets

export const Ability = ({ ability, changeAbility }) => {
	const { abilityRef } = AbilityLogic();

	if (!ability) return null;
	return (
		<div ref={abilityRef} className='unit-page-subpage-abilities-ability'>
			<AbilityName ability={ability} changeAbility={changeAbility} />
			<AbilityPrimaryStatistic ability={ability} changeAbility={changeAbility} />
			<AbilityItems ability={ability} changeAbility={changeAbility} />
			<AbilityStatistics ability={ability} changeAbility={changeAbility} />
		</div>
	);
};
