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
	changePhysicalOutfitItemText,
	removePhysicalOutfitItem,
}) => {
	if (!isEditing)
		return (
			<div className='character-subpage-physical-outfit-item'>
				<div className='character-subpage-physical-outfit-item-title'>{physicalOutfitItem?.title}</div>
				<Text className='character-subpage-physical-outfit-item-text' value={physicalOutfitItem?.text} />
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
					className='character-subpage-physical-outfit-item-text'
					seamless={true}
					label='Physical Outfit Item Text'
					value={physicalOutfitItem?.text.join("\n")}
					onChange={(e) => changePhysicalOutfitItemText(e, index)}
				/>
			</div>
			<IconBtn icon={<FaTimes />} iconName='times' seamless={true} size='s' onClick={() => removePhysicalOutfitItem(index)} />
		</div>
	);
};
