// Packages
import { FaTimes } from "react-icons/fa";

// Components
import { DragDropContainer } from "../../../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../../../components/DragDropItem/DragDropItem";
import { IconBtn } from "../../../../../../../components/IconBtn/IconBtn";
import { TextInput } from "../../../../../../../components/TextInput/TextInput";

// Logic

// Context

// Services

// Styles
import "./AbilityStatisticsValues.css";

// Assets

export const AbilityStatisticsValues = ({
	ability,
	removeAbilityStatisticsValue,
	isReorderingAbilityStatisticsValues,
	reorderAbilityStatisticsValues,
	changeAbilityStatisticsValueLabel,
	changeAbilityStatisticsValueValue,
	changeAbilityStatisticsMaxValue,
	isEditing,
}) => {
	return (
		<div className='character-subpage-abilities-ability-statistics-values-container'>
			<DragDropContainer
				className='character-subpage-abilities-ability-statistics-values'
				enableDragDrop={isReorderingAbilityStatisticsValues}
				onDropItem={reorderAbilityStatisticsValues}
			>
				{ability?.statistics?.values?.map((value, index) => (
					<DragDropItem key={index} index={index} className='character-subpage-abilities-ability-statistics-value-container'>
						<div className='character-subpage-abilities-ability-statistics-value'>
							{!isEditing ? (
								<div className='character-subpage-abilities-ability-statistics-value-label'>{value?.label}</div>
							) : (
								<TextInput
									className='character-subpage-abilities-ability-statistics-value-label'
									value={value?.label}
									onChange={(e) => changeAbilityStatisticsValueLabel(e, index)}
									seamless={true}
								/>
							)}
							{!isEditing ? (
								<div className='character-subpage-abilities-ability-statistics-value-value'>{value?.value}</div>
							) : (
								<TextInput
									className='character-subpage-abilities-ability-statistics-value-value'
									value={value?.value}
									onChange={(e) => changeAbilityStatisticsValueValue(e, index)}
									seamless={true}
								/>
							)}
						</div>
						{!isEditing ? null : (
							<div className='character-subpage-abilities-ability-statistics-value-btn-container'>
								<IconBtn
									icon={<FaTimes />}
									iconName='times'
									seamless={true}
									onClick={() => removeAbilityStatisticsValue(index)}
									size='s'
								/>
							</div>
						)}
					</DragDropItem>
				))}
			</DragDropContainer>
			{!isEditing ? null : (
				<div className='character-subpage-abilities-ability-statistics-max-value-container'>
					<div className='character-subpage-abilities-ability-statistics-max-value-label'>Maximum Value</div>
					<TextInput
						className='character-subpage-abilities-ability-statistics-max-value-value'
						value={ability.statistics.maxValue}
						onChange={changeAbilityStatisticsMaxValue}
						seamless={true}
					/>
				</div>
			)}
		</div>
	);
};
