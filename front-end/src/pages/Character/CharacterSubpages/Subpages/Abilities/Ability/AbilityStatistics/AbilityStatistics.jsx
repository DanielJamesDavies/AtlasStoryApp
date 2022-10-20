// Packages

// Components
import { EditableContainer } from "../../../../../../../components/EditableContainer/EditableContainer";
import { ContentItem } from "../../../../../../../components/ContentItem/ContentItem";
import { AbilityStatisticsValues } from "./AbilityStatisticsValues";
import { AbilityStatisticsChart } from "./AbilityStatisticsChart";

// Logic
import { AbilityStatisticsLogic } from "./AbilityStatisticsLogic";

// Context

// Services

// Styles
import "./AbilityStatistics.css";

// Assets

export const AbilityStatistics = ({ ability, changeAbility }) => {
	const {
		isAuthorizedToEdit,
		revertAbilityStatistics,
		saveAbilityStatistics,
		addAbilityStatisticsValue,
		removeAbilityStatisticsValue,
		defaultAbilityStatistics,
		saveDefaultAbilityStatistics,
		isReorderingAbilityStatisticsValues,
		toggleIsReorderingAbilityStatisticsValues,
		reorderAbilityStatisticsValues,
		changeAbilityStatisticsValueLabel,
		changeAbilityStatisticsValueValue,
		changeAbilityStatisticsMaxValue,
	} = AbilityStatisticsLogic({ ability, changeAbility });

	return (
		<EditableContainer
			className='character-subpage-abilities-ability-statistics-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onAdd={addAbilityStatisticsValue}
			onDefault={defaultAbilityStatistics}
			onSaveDefault={saveDefaultAbilityStatistics}
			onReorder={toggleIsReorderingAbilityStatisticsValues}
			onRevert={revertAbilityStatistics}
			onSave={saveAbilityStatistics}
		>
			<div className='character-subpage-abilities-ability-statistics'>
				{ability?.statistics?.values?.length === 0 ? null : (
					<ContentItem>
						<div className='character-subpage-abilities-ability-statistics-title'>Statistics</div>
						<AbilityStatisticsValues
							ability={ability}
							removeAbilityStatisticsValue={removeAbilityStatisticsValue}
							isReorderingAbilityStatisticsValues={isReorderingAbilityStatisticsValues}
							reorderAbilityStatisticsValues={reorderAbilityStatisticsValues}
							changeAbilityStatisticsValueLabel={changeAbilityStatisticsValueLabel}
							changeAbilityStatisticsValueValue={changeAbilityStatisticsValueValue}
							isEditing={false}
						/>
						<AbilityStatisticsChart ability={ability} />
					</ContentItem>
				)}
			</div>
			<div className='character-subpage-abilities-ability-statistics'>
				<ContentItem>
					<div className='character-subpage-abilities-ability-statistics-title'>Statistics</div>
					<AbilityStatisticsValues
						ability={ability}
						removeAbilityStatisticsValue={removeAbilityStatisticsValue}
						isReorderingAbilityStatisticsValues={isReorderingAbilityStatisticsValues}
						reorderAbilityStatisticsValues={reorderAbilityStatisticsValues}
						changeAbilityStatisticsValueLabel={changeAbilityStatisticsValueLabel}
						changeAbilityStatisticsValueValue={changeAbilityStatisticsValueValue}
						changeAbilityStatisticsMaxValue={changeAbilityStatisticsMaxValue}
						isEditing={true}
					/>
					<AbilityStatisticsChart ability={ability} />
				</ContentItem>
			</div>
		</EditableContainer>
	);
};
