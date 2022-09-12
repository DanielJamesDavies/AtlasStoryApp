// Packages

// Components
import { RoutesContainer } from "../Routes/RoutesContainer";
import { Lightbox } from "../Lightbox/Lightbox";

// Logic
import { PageLogic } from "./PageLogic";

// Context

// Services

// Styles
import "./Page.css";

// Assets

export const Page = () => {
	const { pageStyles } = PageLogic();

	return (
		<div className='page' style={pageStyles}>
			<RoutesContainer />
			<Lightbox />
		</div>
	);
};
