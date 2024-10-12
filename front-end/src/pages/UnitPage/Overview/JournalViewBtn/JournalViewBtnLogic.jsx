// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../UnitPageContext";

// Services

// Styles

// Assets

export const JournalViewBtnLogic = () => {
	const { setIsOnJournalView } = useContext(UnitPageContext);

	function onClickJournalViewBtn() {
		setIsOnJournalView(true);
	}

	return { onClickJournalViewBtn };
};
