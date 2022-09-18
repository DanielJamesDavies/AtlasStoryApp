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
import "./PhysicalOutfitItem.css";

// Assets

export const PhysicalOutfitItem = ({
	physicalOutfitItem,
	index,
	isEditing,
	changePhysicalOutfitItemTitle,
	changePhysicalOutfitItemValue,
	removePhysicalOutfitItem,
}) => {
	if (!isEditing)
		return (
			<div className='character-subpage-physical-outfit-item'>
				<div className='character-subpage-physical-outfit-item-title'>{physicalOutfitItem?.title}</div>
				<Text className='character-subpage-physical-outfit-item-value' value={physicalOutfitItem?.value} />
			</div>
		);

	return (
		<div className='character-subpage-physical-outfit-item'>
			<div className='character-subpage-physical-outfit-item-content'>
				<TextInput
					className='character-subpage-physical-outfit-item-title'
					seamless={true}
					label='Physical Outfit Item Title'
					value={physicalOutfitItem?.title}
					onChange={(e) => changePhysicalOutfitItemTitle(e, index)}
				/>
				<MultiLineTextInput
					className='character-subpage-physical-outfit-item-value'
					seamless={true}
					label='Physical Outfit Item Value'
					value={physicalOutfitItem?.value.join("\n")}
					onChange={(e) => changePhysicalOutfitItemValue(e, index)}
				/>
			</div>
			<IconBtn icon={<FaTimes />} iconName='times' seamless={true} size='s' onClick={() => removePhysicalOutfitItem(index)} />
		</div>
	);
};
