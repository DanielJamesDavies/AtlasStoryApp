// Packages
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

// Components

// Logic

// Context

// Services

// Styles
import "./NavigationSection.css";
import { useEffect, useState } from "react";

// Assets

export const NavigationSection = ({ bodySections, bodySectionRefs, journalViewContainerRef, setIsOnJournalView }) => {
	const [journalViewContainerRefScrollTop, setJournalViewContainerRefScrollTop] = useState(0);

	useEffect(() => {
		setInterval(() => {
			setJournalViewContainerRefScrollTop(journalViewContainerRef?.current?.scrollTop || 0);
		}, 100);
	}, [setJournalViewContainerRefScrollTop, journalViewContainerRef]);

	const onClick = (index) => {
		if (journalViewContainerRef?.current?.scrollTop !== undefined)
			journalViewContainerRef.current.scrollTop = bodySectionRefs[index]?.current?.offsetTop - 16;
	};

	const onClickBackBtn = () => {
		setIsOnJournalView(false);
	};

	return (
		<div className='unit-page-journal-view-navigation-section'>
			<button className='unit-page-journal-view-navigation-section-back-btn' onClick={onClickBackBtn}>
				<FontAwesomeIcon icon={faChevronLeft} />
				<span>Exit Journal View</span>
			</button>
			<div className='unit-page-journal-view-navigation-section-title'>Contents</div>
			<button
				className={
					"unit-page-journal-view-navigation-section-btn unit-page-journal-view-navigation-section-btn-style-h1" +
					(journalViewContainerRefScrollTop <= bodySectionRefs[0]?.current?.offsetTop - 18
						? " unit-page-journal-view-navigation-section-btn-active"
						: "")
				}
				onClick={() => onClick(-1)}
			>
				Title
			</button>
			{bodySections
				?.filter((e) => e?.title !== undefined && e?.titleStyle !== undefined)
				?.map((bodySection, index) => (
					<button
						key={index}
						className={
							"unit-page-journal-view-navigation-section-btn unit-page-journal-view-navigation-section-btn-style-" +
							bodySection?.titleStyle +
							(journalViewContainerRefScrollTop > bodySectionRefs[bodySection?.index]?.current?.offsetTop - 18 &&
							journalViewContainerRefScrollTop <=
								bodySectionRefs[
									bodySections?.filter((e) => e?.title !== undefined && e?.titleStyle !== undefined)?.[index + 1]?.index
								]?.current?.offsetTop -
									18
								? " unit-page-journal-view-navigation-section-btn-active"
								: "")
						}
						onClick={() => onClick(bodySection?.index)}
					>
						{bodySection?.title}
					</button>
				))}
		</div>
	);
};
