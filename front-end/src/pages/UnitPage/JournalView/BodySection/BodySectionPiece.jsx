// Packages
import { useLayoutEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

// Components

// Logic

// Context

// Services

// Styles
import "./BodySection.css";

// Assets

export const BodySectionPiece = ({ bodySection, setBodySectionRefs, index }) => {
	const pieceRef = useRef();

	useLayoutEffect(() => {
		setTimeout(() => {
			setBodySectionRefs((oldBodySectionRefs) => {
				oldBodySectionRefs[index] = pieceRef;
				return oldBodySectionRefs;
			});
		}, 1);
	}, [setBodySectionRefs, pieceRef, index]);

	return (
		<div ref={pieceRef} className='unit-page-journal-view-body-section-piece' data-is-navigatable={bodySection?.titleStyle !== undefined}>
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
	);
};
