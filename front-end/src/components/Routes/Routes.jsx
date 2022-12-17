// Packages

// Components
import { UnauthorizedNavigationBar } from "../UnauthorizedNavigationBar/UnauthorizedNavigationBar";
import { NavigationBar } from "../NavigationBar/NavigationBar";
import { CookiesConsentPopUp } from "../CookiesConsentPopUp/CookiesConsentPopUp";

// Logic
import { RoutesLogic } from "./RoutesLogic";

// Context
import StoryProvider from "../../context/StoryContext";

// Services

// Styles
import "./Routes.css";

// Assets

export const Routes = () => {
	const { contentContainerRef, renderComponent, showUnauthorizedNavigationBar } = RoutesLogic();

	return (
		<div className='routes'>
			{showUnauthorizedNavigationBar ? <UnauthorizedNavigationBar /> : <NavigationBar />}
			<div
				ref={contentContainerRef}
				className={showUnauthorizedNavigationBar ? "content-container content-container-unauthorized" : "content-container"}
			>
				<StoryProvider>
					<RenderComponent renderComponent={renderComponent} />
				</StoryProvider>
			</div>
			<CookiesConsentPopUp />
		</div>
	);
};

const RenderComponent = ({ renderComponent }) => {
	return renderComponent;
};
