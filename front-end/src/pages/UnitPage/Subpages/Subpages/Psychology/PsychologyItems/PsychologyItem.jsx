// Packages
import { FaTimes } from "react-icons/fa";

// Components
import { ContentItem } from "../../../../../../components/ContentItem/ContentItem";
import { Text } from "../../../../../../components/Text/Text";
import { TextInput } from "../../../../../../components/TextInput/TextInput";
import { MultiLineTextInput } from "../../../../../../components/MultiLineTextInput/MultiLineTextInput";
import { IconBtn } from "../../../../../../components/IconBtn/IconBtn";

// Logic

// Context

// Services

// Styles
import "./PsychologyItem.css";

// Assets

export const PsychologyItem = ({ psychologyItem, index, isEditing, changePsychologyItemTitle, changePsychologyItemText, removePsychologyItem }) => {
	if (!isEditing)
		return (
			<div className='unit-page-subpage-psychology-item'>
				<ContentItem hasBg={true}>
					<div className='unit-page-subpage-psychology-item-title'>{psychologyItem?.title}</div>
					<Text className='unit-page-subpage-psychology-item-text' value={psychologyItem?.text} />
				</ContentItem>
			</div>
		);

	return (
		<div className='unit-page-subpage-psychology-item'>
			<ContentItem hasBg={true}>
				<div className='unit-page-subpage-psychology-item-content'>
					<TextInput
						className='unit-page-subpage-psychology-item-title'
						seamless={true}
						label='Title'
						value={psychologyItem?.title}
						onChange={(e) => changePsychologyItemTitle(e, index)}
						aiTools={false}
					/>
					<MultiLineTextInput
						className='unit-page-subpage-psychology-item-text'
						seamless={true}
						label='Content'
						value={psychologyItem?.text?.join("\n")}
						onChange={(e) => changePsychologyItemText(e, index)}
						aiTools={true}
					/>
				</div>
				<IconBtn icon={<FaTimes />} iconName='times' seamless={true} size='s' onClick={() => removePsychologyItem(index)} />
			</ContentItem>
		</div>
	);
};
