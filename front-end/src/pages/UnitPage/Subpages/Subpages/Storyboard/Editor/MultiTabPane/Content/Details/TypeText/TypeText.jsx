// Packages
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

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
	const { pieces, openPieceID, onChangeContent, alignPiece } = TypeTextLogic();

	return (
		<div className='unit-page-storyboard-editor-multi-tab-pane-content-details-type-text-container'>
			<LabelContainer label='Content' className='unit-page-storyboard-editor-multi-tab-pane-content-details-type-text-content'>
				<MultiLineTextInput
					label='Type here'
					value={pieces?.find((e) => e?.id === openPieceID)?.content}
					onChange={onChangeContent}
					seamless={true}
				/>
			</LabelContainer>
			<LabelContainer label='Alignment' className='unit-page-storyboard-editor-multi-tab-pane-content-details-type-text-alignment-buttons'>
				<div
					className='unit-page-storyboard-editor-multi-tab-pane-content-details-type-text-alignment-btn'
					onClick={() => alignPiece("horizontal")}
				>
					<FontAwesomeIcon icon={faChevronRight} />
					<FontAwesomeIcon icon={faChevronLeft} />
				</div>
				<div
					className='unit-page-storyboard-editor-multi-tab-pane-content-details-type-text-alignment-btn'
					onClick={() => alignPiece("center")}
				>
					<FontAwesomeIcon icon={faChevronRight} />
					<FontAwesomeIcon icon={faChevronLeft} />
					<FontAwesomeIcon icon={faChevronDown} />
					<FontAwesomeIcon icon={faChevronUp} />
				</div>
				<div
					className='unit-page-storyboard-editor-multi-tab-pane-content-details-type-text-alignment-btn unit-page-storyboard-editor-multi-tab-pane-content-details-type-text-alignment-btn-vertical-center'
					onClick={() => alignPiece("vertical")}
				>
					<FontAwesomeIcon icon={faChevronDown} />
					<FontAwesomeIcon icon={faChevronUp} />
				</div>
			</LabelContainer>
		</div>
	);
};
