// Packages

// Components
import { UnauthorizedNavigationBar } from "../UnauthorizedNavigationBar/UnauthorizedNavigationBar";
import { NavigationBar } from "../NavigationBar/NavigationBar";
import { AIAssistantMenu } from "../AIAssistantMenu/AIAssistantMenu";
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
			<StoryProvider>
				{showUnauthorizedNavigationBar ? <UnauthorizedNavigationBar /> : <NavigationBar />}
				<div
					ref={contentContainerRef}
					className={showUnauthorizedNavigationBar ? "content-container content-container-unauthorized" : "content-container"}
				>
					<RenderComponent renderComponent={renderComponent} />
				</div>
				<AIAssistantMenu />
				<CookiesConsentPopUp />
			</StoryProvider>
		</div>
	);
};

const RenderComponent = ({ renderComponent }) => {
	return renderComponent;
};
