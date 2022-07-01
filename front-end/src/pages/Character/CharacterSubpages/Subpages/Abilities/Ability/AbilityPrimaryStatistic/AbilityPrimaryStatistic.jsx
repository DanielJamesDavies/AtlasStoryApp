// Packages

// Components
import { EditableContainer } from "../../../../../../../components/EditableContainer/EditableContainer";
import { TextInput } from "../../../../../../../components/TextInput/TextInput";

// Logic
import { AbilityPrimaryStatisticLogic } from "./AbilityPrimaryStatisticLogic";

// Context

// Services

// Styles
import "./AbilityPrimaryStatistic.css";

// Assets

export const AbilityPrimaryStatistic = ({ ability, changeAbility }) => {
	const {
		isAuthorizedToEdit,
		changeAbilityPrimaryStatisticLabel,
		changeAbilityPrimaryStatisticValue,
		revertAbilityPrimaryStatistic,
		saveAbilityPrimaryStatistic,
	} = AbilityPrimaryStatisticLogic({ ability, changeAbility });

	return (
		<EditableContainer
			className='character-subpage-abilities-ability-primary-statistic-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertAbilityPrimaryStatistic}
			onSave={saveAbilityPrimaryStatistic}
		>
			<div className='character-subpage-abilities-ability-primary-statistic'>
				{ability?.primaryStatistic?.label.split(" ").join("").length === 0 ? null : (
					<div className='character-subpage-abilities-ability-primary-statistic-label'>{ability?.primaryStatistic?.label}</div>
				)}
				{ability?.primaryStatistic?.value.split(" ").join("").length === 0 ? null : (
					<div className='character-subpage-abilities-ability-primary-statistic-value'>{ability?.primaryStatistic?.value}</div>
				)}
			</div>
			<div className='character-subpage-abilities-ability-primary-statistic'>
				<TextInput
					className='character-subpage-abilities-ability-primary-statistic-label'
					label='Ability Primary Statistic Label'
					seamless={true}
					autoResize={true}
					value={ability?.primaryStatistic?.label}
					onChange={changeAbilityPrimaryStatisticLabel}
				/>
				<TextInput
					className='character-subpage-abilities-ability-primary-statistic-value'
					label='Ability Primary Statistic Value'
					seamless={true}
					autoResize={true}
					value={ability?.primaryStatistic?.value}
					onChange={changeAbilityPrimaryStatisticValue}
				/>
			</div>
		</EditableContainer>
	);
};
