// Packages
import { useContext } from "react";

// Components
import { NavigationBar } from "../NavigationBar/NavigationBar";
import { UnauthorizedNavigationBar } from "../UnauthorizedNavigationBar/UnauthorizedNavigationBar";
import { StoryTopBar } from "../StoryTopBar/StoryTopBar";
import { Routes } from "./Routes";

// Logic

// Context
import { APIContext } from "../../context/APIContext";
import RoutesProvider from "../../context/RoutesContext";

// Services

// Styles
import "./RoutesContainer.css";

// Assets

export const RoutesContainer = () => {
	const { authorized } = useContext(APIContext);

	return (
		<RoutesProvider>
			<div className='routes-container'>
				{!authorized ? <UnauthorizedNavigationBar /> : <NavigationBar />}
				<div className={!authorized ? "page-container page-container-unauthorized" : "page-container"}>
					<StoryTopBar />
					<Routes />
				</div>
			</div>
		</RoutesProvider>
	);
};
