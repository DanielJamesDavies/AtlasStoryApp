// Packages
import { FaTimes } from "react-icons/fa";

// Components
import { Text } from "../../../../../../components/Text/Text";
import { TextInput } from "../../../../../../components/TextInput/TextInput";
import { MultiLineTextInput } from "../../../../../../components/MultiLineTextInput/MultiLineTextInput";
import { IconBtn } from "../../../../../../components/IconBtn/IconBtn";

// Logic

// Context

// Services

// Styles
import "./PhysicalAttributeItem.css";

// Assets

export const PhysicalAttributeItem = ({
	physicalAttributeItem,
	index,
	isEditing,
	changePhysicalAttributeItemTitle,
	changePhysicalAttributeItemValue,
	removePhysicalAttributeItem,
}) => {
	if (!isEditing)
		return (
			<div className='character-subpage-physical-attribute-item'>
				<div className='character-subpage-physical-attribute-item-title'>{physicalAttributeItem?.title}</div>
				<Text className='character-subpage-physical-attribute-item-value' value={physicalAttributeItem?.value} />
			</div>
		);

	return (
		<div className='character-subpage-physical-attribute-item'>
			<div className='character-subpage-physical-attribute-item-content'>
				<TextInput
					className='character-subpage-physical-attribute-item-title'
					seamless={true}
					label='Physical Attribute Item Title'
					value={physicalAttributeItem?.title}
					onChange={(e) => changePhysicalAttributeItemTitle(e, index)}
				/>
				<MultiLineTextInput
					className='character-subpage-physical-attribute-item-value'
					seamless={true}
					label='Physical Attribute Item Value'
					value={physicalAttributeItem?.value.join("\n")}
					onChange={(e) => changePhysicalAttributeItemValue(e, index)}
				/>
			</div>
			<IconBtn icon={<FaTimes />} iconName='times' seamless={true} size='s' onClick={() => removePhysicalAttributeItem(index)} />
		</div>
	);
};
