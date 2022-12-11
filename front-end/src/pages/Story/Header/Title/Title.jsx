// Packages

// Components
import { EditableContainer } from "../../../../components/EditableContainer/EditableContainer";
import { TextInput } from "../../../../components/TextInput/TextInput";

// Logic
import { TitleLogic } from "./TitleLogic";

// Context

// Services

// Styles
import "./Title.css";

// Assets

export const Title = () => {
	const { isAuthorizedToEdit, story, changeStoryTitle, revertStoryTitle, saveStoryTitle } = TitleLogic();

	return (
		<EditableContainer
			className='story-header-main-info-title-container'
			absolutePositionEditBtns={true}
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertStoryTitle}
			onSave={saveStoryTitle}
		>
			<div className='story-header-main-info-title'>{story?.data?.title}</div>
			<TextInput
				className='story-header-main-info-title'
				seamless={true}
				value={story?.data?.title}
				onChange={changeStoryTitle}
				autoResize={true}
			/>
		</EditableContainer>
	);
};
