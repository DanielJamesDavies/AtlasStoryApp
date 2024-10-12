// Packages
import ReactMarkdown from "react-markdown";

// Components

// Logic
import { BodySectionLogic } from "./BodySectionLogic";

// Context

// Services

// Styles
import "./BodySection.css";

// Assets

export const BodySection = () => {
	const { unit, unitVersion, bodySections } = BodySectionLogic();

	return (
		<div className='unit-page-journal-view-body-section'>
			{console.log(unit, unitVersion)}
			{bodySections?.map((bodySection, index) => (
				<div key={index} className='unit-page-journal-view-body-section-piece'>
					{!bodySection?.title ? null : (
						<div
							className={
								"unit-page-journal-view-body-section-piece-title unit-page-journal-view-body-section-piece-title-style-" +
								bodySection?.titleStyle
							}
						>
							{bodySection?.title}
						</div>
					)}
					{!bodySection?.text ? null : (
						<div className='unit-page-journal-view-body-section-piece-text'>
							<ReactMarkdown children={bodySection?.text} components={{ br: () => <span className='line-break'></span> }} />
						</div>
					)}
				</div>
			))}
		</div>
	);
};
