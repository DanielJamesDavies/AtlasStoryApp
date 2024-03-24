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
	const { uiTheme, fontSize, accentColour, accentHoverColour, accentHSL_H } = PageLogic();

	return (
		<div
			className={"page" + (uiTheme ? " theme-" + uiTheme : "") + (fontSize ? " font-size-" + fontSize : "")}
			style={{
				"--vh": window.innerHeight + "px",
				"--colour-accent": accentColour,
				"--colour-accent-hover": accentHoverColour,
				"--colour-accent-hsl-h": accentHSL_H,
			}}
		>
			<RoutesContainer />
			<Lightbox />
			<DropdownOptions />
		</div>
	);
};
