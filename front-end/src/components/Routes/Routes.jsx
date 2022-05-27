// Packages

// Components
import { UnauthorizedNavigationBar } from "../UnauthorizedNavigationBar/UnauthorizedNavigationBar";
import { NavigationBar } from "../NavigationBar/NavigationBar";
import { CookiesConsentPopUp } from "../CookiesConsentPopUp/CookiesConsentPopUp";

// Logic
import { RoutesLogic } from "./RoutesLogic";

// Context

// Services

// Styles
import "./Routes.css";

// Assets

export const Routes = () => {
	const { renderComponent, showUnauthorizedNavigationBar } = RoutesLogic();

	return (
		<div className='routes'>
			{showUnauthorizedNavigationBar ? <UnauthorizedNavigationBar /> : <NavigationBar />}
			<div className={showUnauthorizedNavigationBar ? "content-container content-container-unauthorized" : "content-container"}>
				<RenderComponent renderComponent={renderComponent} />
			</div>
			<CookiesConsentPopUp />
		</div>
	);
};

const RenderComponent = ({ renderComponent }) => {
	return renderComponent;
};
