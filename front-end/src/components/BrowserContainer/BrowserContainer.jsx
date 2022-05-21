// Packages
import { Routes, Route } from "react-router-dom";

// Components
import { NavigationBar } from "../NavigationBar/NavigationBar";
import { UnauthorizedNavigationBar } from "../UnauthorizedNavigationBar/UnauthorizedNavigationBar";
import { StoryTopBar } from "../StoryTopBar/StoryTopBar";
import { Page } from "../Page/Page";
import { Register } from "../../pages/Register/Register";
import { Login } from "../../pages/Login/Login";

// Logic
import { BrowserContainerLogic } from "./BrowserContainerLogic";

// Context

// Services

// Styles
import "./BrowserContainer.css";

// Assets

export const BrowserContainer = () => {
	const { token } = BrowserContainerLogic();

	return (
		<div className='browser-container'>
			{!token ? <UnauthorizedNavigationBar /> : <NavigationBar />}
			<div className={!token ? "page-container page-container-unauthorized" : "page-container"}>
				<StoryTopBar />
				<Routes>
					<Route path='*' />
					<Route path='/' />
					<Route path='/register' element={<Page child={<Register />} />} />
					<Route path='/login' element={<Page child={<Login />} />} />
				</Routes>
			</div>
		</div>
	);
};
