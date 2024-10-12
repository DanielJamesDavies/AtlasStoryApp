// Packages

// Components
import { TopSection } from "./TopSection/TopSection";
import { BodySection } from "./BodySection/BodySection";

// Logic

// Context

// Services

// Styles
import "./JournalView.css";

// Assets

export const JournalView = () => {
	return (
		<div className='unit-page-journal-view'>
			<TopSection />
			<BodySection />
		</div>
	);
};
