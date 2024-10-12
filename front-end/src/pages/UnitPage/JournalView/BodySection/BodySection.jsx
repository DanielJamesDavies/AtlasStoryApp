// Packages

// Components
import { BodySectionPiece } from "./BodySectionPiece";

// Logic

// Context

// Services

// Styles
import "./BodySection.css";

// Assets

export const BodySection = ({ bodySections, setBodySectionRefs }) => {
	return (
		<div className='unit-page-journal-view-body-section'>
			{bodySections?.map((bodySection, index) => (
				<BodySectionPiece key={index} index={index} bodySection={bodySection} setBodySectionRefs={setBodySectionRefs} />
			))}
		</div>
	);
};
