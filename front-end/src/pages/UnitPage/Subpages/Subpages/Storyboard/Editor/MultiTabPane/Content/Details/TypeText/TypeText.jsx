// Packages

// Components
import { MultiLineTextInput } from "../../../../../../../../../../components/MultiLineTextInput/MultiLineTextInput";
import { LabelContainer } from "../../../../../../../../../../components/LabelContainer/LabelContainer";

// Logic
import { TypeTextLogic } from "./TypeTextLogic";

// Context

// Services

// Styles
import "./TypeText.css";

// Assets

export const TypeText = () => {
	const { pieces, openPieceID, onChangeContent } = TypeTextLogic();

	return (
		<div className='unit-page-storyboard-editor-multi-tab-pane-content-details-type-text-container'>
			<LabelContainer label='Content'>
				<MultiLineTextInput
					label='Type here'
					value={pieces?.find((e) => e?.id === openPieceID)?.content}
					onChange={onChangeContent}
					seamless={true}
				/>
			</LabelContainer>
		</div>
	);
};
