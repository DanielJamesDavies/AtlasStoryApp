// Packages

// Components
import { EditableContainer } from "../../../../../../../components/EditableContainer/EditableContainer";
import { ContentItem } from "../../../../../../../components/ContentItem/ContentItem";
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
		primaryStatisticValueClassName,
		changeAbilityPrimaryStatisticLabel,
		changeAbilityPrimaryStatisticValue,
		revertAbilityPrimaryStatistic,
		saveAbilityPrimaryStatistic,
	} = AbilityPrimaryStatisticLogic({ ability, changeAbility });

	return (
		<EditableContainer
			className={
				ability?.primaryStatistic?.label.split(" ").join("").length === 0 &&
				ability?.primaryStatistic?.value.split(" ").join("").length === 0
					? "unit-page-subpage-abilities-ability-primary-statistic-container unit-page-subpage-abilities-ability-primary-statistic-container-empty"
					: "unit-page-subpage-abilities-ability-primary-statistic-container"
			}
			absolutePositionEditBtns={true}
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertAbilityPrimaryStatistic}
			onSave={saveAbilityPrimaryStatistic}
		>
			<ContentItem
				hasBg={
					ability?.primaryStatistic?.label.split(" ").join("").length !== 0 ||
					ability?.primaryStatistic?.value.split(" ").join("").length !== 0
				}
				size='m'
				margin='none'
			>
				<div className='unit-page-subpage-abilities-ability-primary-statistic'>
					{ability?.primaryStatistic?.label.split(" ").join("").length === 0 ? null : (
						<div className='unit-page-subpage-abilities-ability-primary-statistic-label'>{ability?.primaryStatistic?.label}</div>
					)}
					{ability?.primaryStatistic?.value.split(" ").join("").length === 0 ? null : (
						<div className={primaryStatisticValueClassName}>{ability?.primaryStatistic?.value}</div>
					)}
				</div>
			</ContentItem>
			<ContentItem hasBg={true} size='m' margin='none'>
				<div className='unit-page-subpage-abilities-ability-primary-statistic'>
					<TextInput
						className='unit-page-subpage-abilities-ability-primary-statistic-label'
						label='Ability Primary Statistic Label'
						seamless={true}
						autoResize={true}
						value={ability?.primaryStatistic?.label}
						onChange={changeAbilityPrimaryStatisticLabel}
					/>
					<TextInput
						className={primaryStatisticValueClassName}
						label='Ability Primary Statistic Value'
						seamless={true}
						autoResize={true}
						value={ability?.primaryStatistic?.value}
						onChange={changeAbilityPrimaryStatisticValue}
					/>
				</div>
			</ContentItem>
		</EditableContainer>
	);
};
