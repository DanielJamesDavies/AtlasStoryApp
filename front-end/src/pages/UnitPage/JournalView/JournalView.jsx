// Packages

// Components
import { TopSection } from "./TopSection/TopSection";
import { BodySection } from "./BodySection/BodySection";
import { NavigationSection } from "./NavigationSection/NavigationSection";

// Logic
import { JournalViewLogic } from "./JournalViewLogic";

// Context

// Services

// Styles
import "./JournalView.css";

// Assets

export const JournalView = ({ journalViewContainerRef }) => {
	const { bodySections, bodySectionRefs, setBodySectionRefs, setIsOnJournalView } = JournalViewLogic({ journalViewContainerRef });

	return (
		<div className='unit-page-journal-view'>
			<TopSection />
			<BodySection bodySections={bodySections} setBodySectionRefs={setBodySectionRefs} />
			<NavigationSection
				bodySections={bodySections}
				bodySectionRefs={bodySectionRefs}
				journalViewContainerRef={journalViewContainerRef}
				setIsOnJournalView={setIsOnJournalView}
			/>
		</div>
	);
};
