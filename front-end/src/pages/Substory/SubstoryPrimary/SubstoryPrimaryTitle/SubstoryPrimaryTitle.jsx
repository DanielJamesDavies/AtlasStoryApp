// Packages

// Components
import { EditableContainer } from "../../../../components/EditableContainer/EditableContainer";
import { TextInput } from "../../../../components/TextInput/TextInput";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { SubstoryPrimaryTitleLogic } from "./SubstoryPrimaryTitleLogic";

// Context

// Services

// Styles
import "./SubstoryPrimaryTitle.css";

// Assets

export const SubstoryPrimaryTitle = () => {
	const { isAuthorizedToEdit, story, substory, primaryTitleStyles, changeTitle, revertTitle, saveTitle, errors } = SubstoryPrimaryTitleLogic();

	return (
		<EditableContainer
			className='substory-primary-title-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertTitle}
			onSave={saveTitle}
			absolutePositionEditBtns={true}
			isLight={primaryTitleStyles?.color === "#fff"}
		>
			<div className='substory-primary-title' style={primaryTitleStyles}>
				{!substory?.data?.isStoryTitleInTitle ? null : <>{story?.data?.title}:&nbsp;</>}
				{substory?.data?.title}
			</div>
			<div>
				<TextInput
					className='substory-primary-title'
					seamless={true}
					value={substory?.data?.title}
					onChange={changeTitle}
					autoResize={true}
					innerStyle={primaryTitleStyles}
				/>
				<ErrorMessage errors={errors} />
			</div>
		</EditableContainer>
	);
};
