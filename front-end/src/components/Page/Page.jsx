// Packages

// Components
import { RoutesContainer } from "../Routes/RoutesContainer";

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
		</div>
	);
};
