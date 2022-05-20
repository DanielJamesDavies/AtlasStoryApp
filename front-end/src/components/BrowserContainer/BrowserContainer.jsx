// Packages
import { Routes, Route } from "react-router-dom";

// Components
import { Sidebar } from "../Sidebar/Sidebar";
import { BrowserTopBar } from "../BrowserTopBar/BrowserTopBar";
import { Page } from "../Page/Page";
import { Register } from "../../pages/Register/Register";
import { Login } from "../../pages/Login/Login";

// Logic

// Context

// Services

// Styles

// Assets

export const BrowserContainer = () => {
	return (
		<div className='browser-container'>
			<Sidebar />
			<div className='page-container'>
				<BrowserTopBar />
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
