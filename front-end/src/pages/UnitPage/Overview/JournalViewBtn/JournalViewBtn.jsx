// Packages
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileSignature } from "@fortawesome/free-solid-svg-icons";

// Components

// Logic
import { JournalViewBtnLogic } from "./JournalViewBtnLogic";

// Context

// Services

// Styles
import "./JournalViewBtn.css";

// Assets

export const JournalViewBtn = () => {
	const { onClickJournalViewBtn } = JournalViewBtnLogic();

	return (
		<div className='unit-page-overview-journal-view-btn-container'>
			<button className='unit-page-overview-journal-view-btn' onClick={onClickJournalViewBtn}>
				<FontAwesomeIcon icon={faFileSignature} />
				<span>Journal View</span>
			</button>
		</div>
	);
};
