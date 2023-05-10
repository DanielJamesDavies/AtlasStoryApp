// Packages
import { FaTimes } from "react-icons/fa";

// Components
import { ContentItem } from "../../../../../../../../components/ContentItem/ContentItem";
import { Text } from "../../../../../../../../components/Text/Text";
import { TextInput } from "../../../../../../../../components/TextInput/TextInput";
import { MultiLineTextInput } from "../../../../../../../../components/MultiLineTextInput/MultiLineTextInput";
import { IconBtn } from "../../../../../../../../components/IconBtn/IconBtn";

// Logic

// Context

// Services

// Styles
import "./Item.css";

// Assets

export const Item = ({ item, index, changeItemTitle, changeItemDescription, removeItem, isEditing }) => {
	if (!isEditing)
		return (
			<ContentItem className='character-subpage-relationships-relationship-item' hasBg={true} size='s' backgroundColour='grey3'>
				<div className='character-subpage-relationships-relationship-item-content'>
					<div className='character-subpage-relationships-relationship-item-title'>{item?.title}</div>
					<Text className='character-subpage-relationships-relationship-item-text' value={item?.text} />
				</div>
			</ContentItem>
		);

	if (isEditing)
		return (
			<ContentItem className='character-subpage-relationships-relationship-item' hasBg={true} size='s' backgroundColour='grey3'>
				<div className='character-subpage-relationships-relationship-item-content'>
					<TextInput
						className='character-subpage-relationships-relationship-item-title'
						label='Relationship Item Title'
						value={item?.title}
						onChange={(e) => changeItemTitle(e, index)}
						seamless={true}
						aiTools={true}
					/>
					<MultiLineTextInput
						className='character-subpage-relationships-relationship-item-text'
						seamless={true}
						label='Relationship Item Text'
						value={item?.text?.join("\n")}
						onChange={(e) => changeItemDescription(e, index)}
						aiTools={true}
					/>
				</div>
				<IconBtn icon={<FaTimes />} iconName='times' seamless={true} size='s' onClick={() => removeItem(index)} />
			</ContentItem>
		);
};
