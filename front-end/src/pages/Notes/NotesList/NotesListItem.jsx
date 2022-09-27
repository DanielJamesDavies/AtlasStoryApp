// Packages
import { FaTimes } from "react-icons/fa";

// Components
import { Text } from "../../../components/Text/Text";
import { TextInput } from "../../../components/TextInput/TextInput";
import { MultiLineTextInput } from "../../../components/MultiLineTextInput/MultiLineTextInput";
import { IconBtn } from "../../../components/IconBtn/IconBtn";

// Logic
import { NotesListItemLogic } from "./NotesListItemLogic";

// Context

// Services

// Styles
import "./NotesListItem.css";

// Assets

export const NotesListItem = ({ item, index, isEditing }) => {
	const { changeItemTitle, changeItemText, removeItem } = NotesListItemLogic({ index });

	if (!isEditing)
		return (
			<div className='notes-list-item'>
				<div className='notes-list-item-title'>{item?.title}</div>
				<Text className='notes-list-item-text' value={item?.text} />
			</div>
		);

	return (
		<div className='notes-list-item'>
			<div className='notes-list-item-content'>
				<TextInput
					className='notes-list-item-title'
					seamless={true}
					label='Note Title'
					value={item?.title}
					onChange={(e) => changeItemTitle(e, index)}
				/>
				<MultiLineTextInput
					className='notes-list-item-text'
					seamless={true}
					label='Note Text'
					value={item?.text?.join("\n")}
					onChange={(e) => changeItemText(e, index)}
				/>
			</div>
			<IconBtn icon={<FaTimes />} iconName='times' seamless={true} size='s' onClick={removeItem} />
		</div>
	);
};
