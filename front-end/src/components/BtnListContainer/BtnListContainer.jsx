// Packages

// Components

// Logic

// Context
import BtnListContainerContext from "./BtnListContainerContext";

// Services

// Styles
import "./BtnListContainer.css";

// Assets

export const BtnListContainer = ({ children }) => {
	return <BtnListContainerContext>{children}</BtnListContainerContext>;
};
