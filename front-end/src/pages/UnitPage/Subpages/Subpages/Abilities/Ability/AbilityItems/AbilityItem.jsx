// Packages
import { FaTimes } from "react-icons/fa";

// Components
import { ContentItem } from "../../../../../../../components/ContentItem/ContentItem";
import { TextInput } from "../../../../../../../components/TextInput/TextInput";
import { Text } from "../../../../../../../components/Text/Text";
import { MultiLineTextInput } from "../../../../../../../components/MultiLineTextInput/MultiLineTextInput";
import { IconBtn } from "../../../../../../../components/IconBtn/IconBtn";

// Logic
import { AbilityItemLogic } from "./AbilityItemLogic";

// Context

// Services

// Styles
import "./AbilityItem.css";

// Assets

export const AbilityItem = ({ ability, changeAbility, abilityItem, index, isEditing }) => {
	const { changeAbilityItemTitle, changeAbilityItemText, removeAbilityItem } = AbilityItemLogic({ ability, changeAbility, index });

	return (
		<div className='unit-page-subpage-abilities-ability-item'>
			<ContentItem hasBg={true}>
				<div className='unit-page-subpage-abilities-ability-item-content'>
					{/* Title */}
					{!isEditing ? (
						<div className='unit-page-subpage-abilities-ability-item-title'>{abilityItem?.title}</div>
					) : (
						<TextInput
							className='unit-page-subpage-abilities-ability-item-title'
							seamless={true}
							label='Title'
							value={abilityItem?.title}
							onChange={changeAbilityItemTitle}
							aiTools={false}
						/>
					)}

					{/* Text */}
					{!isEditing ? (
						<Text className='unit-page-subpage-abilities-ability-item-text' value={abilityItem?.text} />
					) : (
						<MultiLineTextInput
							className='unit-page-subpage-abilities-ability-item-text'
							seamless={true}
							label='Content'
							value={abilityItem?.text.join("\n")}
							onChange={changeAbilityItemText}
							aiTools={true}
						/>
					)}

					{/* Statistics */}
					{!isEditing ? (
						<div className='unit-page-subpage-abilities-ability-item-statistics'>
							{abilityItem?.statistics?.values?.map((statistic, index) => (
								<div key={index} className='unit-page-subpage-abilities-ability-item-statistic'>
									<div className='unit-page-subpage-abilities-ability-item-statistic-label'>{statistic?.label}</div>
									<div className='unit-page-subpage-abilities-ability-item-statistic-value'>{statistic?.value}</div>
								</div>
							))}
						</div>
					) : (
						<div className='unit-page-subpage-abilities-ability-item-statistics'>
							{abilityItem?.statistics?.values?.map((statistic, index) => (
								<div key={index} className='unit-page-subpage-abilities-ability-item-statistic'>
									<div className='unit-page-subpage-abilities-ability-item-statistic-label'>{statistic?.label}</div>
									<div className='unit-page-subpage-abilities-ability-item-statistic-value'>{statistic?.value}</div>
								</div>
							))}
						</div>
					)}
				</div>
				{!isEditing ? null : (
					<IconBtn className='' seamless={true} icon={<FaTimes />} iconName='times' size='s' onClick={removeAbilityItem} />
				)}
			</ContentItem>
		</div>
	);
};
