// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { EventsContext } from "../EventsContext";

// Services

// Styles

// Assets

export const EventsPrimaryLogic = () => {
	const { isAuthorizedToEdit, setIsDisplayingCreateEventForm } = useContext(EventsContext);

	const romanNumeralHours = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

	function openCreateEventForm() {
		setIsDisplayingCreateEventForm(true);
	}

	return { isAuthorizedToEdit, romanNumeralHours, openCreateEventForm };
};
