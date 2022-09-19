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
	changePhysicalAttributeItemText,
	removePhysicalAttributeItem,
}) => {
	if (!isEditing)
		return (
			<div className='character-subpage-physical-attribute-item'>
				<div className='character-subpage-physical-attribute-item-title'>{physicalAttributeItem?.title}</div>
				<Text className='character-subpage-physical-attribute-item-text' value={physicalAttributeItem?.text} />
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
					className='character-subpage-physical-attribute-item-text'
					seamless={true}
					label='Physical Attribute Item Text'
					value={physicalAttributeItem?.text.join("\n")}
					onChange={(e) => changePhysicalAttributeItemText(e, index)}
				/>
			</div>
			<IconBtn icon={<FaTimes />} iconName='times' seamless={true} size='s' onClick={() => removePhysicalAttributeItem(index)} />
		</div>
	);
};
