// Packages

// Components
import { EditableContainer } from "../../../../components/EditableContainer/EditableContainer";
import { TextInput } from "../../../../components/TextInput/TextInput";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { NameLogic } from "./NameLogic";

// Context

// Services

// Styles
import "./Name.css";

// Assets

export const Name = ({ primaryStoryStyles }) => {
	const { unit_type, isAuthorizedToEdit, story, unit, changeName, revertName, saveName, errors } = NameLogic();

	return (
		<EditableContainer
			className='unit-page-primary-name-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertName}
			onSave={saveName}
			absolutePositionEditBtns={true}
			isLight={primaryStoryStyles["--text-colour-primary"] === "#fff"}
		>
			<>
				{["plot"].includes(unit_type) ? (
					!unit?.data?.isStoryTitleInTitle ? (
						<div className='unit-page-primary-title'>{unit?.data?.title}</div>
					) : (
						<div className='unit-page-primary-title'>{story?.data?.title + ": " + unit?.data?.title}</div>
					)
				) : (
					<div className='unit-page-primary-name'>{["plot"].includes(unit_type) ? unit?.data?.title : unit?.data?.name}</div>
				)}
			</>
			<div>
				<TextInput
					className='unit-page-primary-name'
					seamless={true}
					value={["plot"].includes(unit_type) ? unit?.data?.title : unit?.data?.name}
					onChange={changeName}
					autoResize={true}
				/>
				<ErrorMessage errors={errors} />
			</div>
		</EditableContainer>
	);
};
