// Packages

// Components
import { RoutesContainer } from "../Routes/RoutesContainer";
import { Lightbox } from "../Lightbox/Lightbox";
import { DropdownOptions } from "../DropdownOptions/DropdownOptions";

// Logic
import { PageLogic } from "./PageLogic";

// Context

// Services

// Styles
import "./Page.css";

// Assets

export const Page = () => {
	const { pageClassName, pageStyles } = PageLogic();

	return (
		<div className={pageClassName} style={pageStyles}>
			<RoutesContainer />
			<Lightbox />
			<DropdownOptions />
		</div>
	);
};
