// Packages
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faChevronUp, faChevronDown, faExpand } from "@fortawesome/free-solid-svg-icons";

// Components
import { LabelContainer } from "../../../../../../../../../../components/LabelContainer/LabelContainer";

// Logic
import { TypeImageLogic } from "./TypeImageLogic";

// Context

// Services

// Styles
import "./TypeImage.css";

// Assets

export const TypeImage = () => {
	const { alignPiece, resizePiece } = TypeImageLogic();

	return (
		<div className='unit-page-storyboard-editor-multi-tab-pane-content-details-type-image-container'>
			<LabelContainer label='Alignment' className='unit-page-storyboard-editor-multi-tab-pane-content-details-type-image-alignment-buttons'>
				<div
					className='unit-page-storyboard-editor-multi-tab-pane-content-details-type-image-alignment-btn'
					onClick={() => alignPiece("horizontal")}
				>
					<FontAwesomeIcon icon={faChevronRight} />
					<FontAwesomeIcon icon={faChevronLeft} />
				</div>
				<div
					className='unit-page-storyboard-editor-multi-tab-pane-content-details-type-image-alignment-btn'
					onClick={() => alignPiece("center")}
				>
					<FontAwesomeIcon icon={faChevronRight} />
					<FontAwesomeIcon icon={faChevronLeft} />
					<FontAwesomeIcon icon={faChevronDown} />
					<FontAwesomeIcon icon={faChevronUp} />
				</div>
				<div
					className='unit-page-storyboard-editor-multi-tab-pane-content-details-type-image-alignment-btn unit-page-storyboard-editor-multi-tab-pane-content-details-type-image-alignment-btn-vertical-center'
					onClick={() => alignPiece("vertical")}
				>
					<FontAwesomeIcon icon={faChevronDown} />
					<FontAwesomeIcon icon={faChevronUp} />
				</div>
			</LabelContainer>
			<LabelContainer label='Resize' className='unit-page-storyboard-editor-multi-tab-pane-content-details-type-image-resize-buttons'>
				<div
					className='unit-page-storyboard-editor-multi-tab-pane-content-details-type-image-resize-btn'
					onClick={() => resizePiece("horizontal")}
				>
					<FontAwesomeIcon icon={faChevronLeft} />
					<FontAwesomeIcon icon={faChevronRight} />
				</div>
				<div
					className='unit-page-storyboard-editor-multi-tab-pane-content-details-type-image-resize-btn unit-page-storyboard-editor-multi-tab-pane-content-details-type-image-resize-btn-center'
					onClick={() => resizePiece("center")}
				>
					<FontAwesomeIcon icon={faExpand} />
				</div>
				<div
					className='unit-page-storyboard-editor-multi-tab-pane-content-details-type-image-resize-btn unit-page-storyboard-editor-multi-tab-pane-content-details-type-image-resize-btn-vertical'
					onClick={() => resizePiece("vertical")}
				>
					<FontAwesomeIcon icon={faChevronUp} />
					<FontAwesomeIcon icon={faChevronDown} />
				</div>
			</LabelContainer>
		</div>
	);
};
