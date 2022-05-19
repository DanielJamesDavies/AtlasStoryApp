// Packages
import { Routes, Route } from "react-router-dom";

// Components
import { Sidebar } from "../Sidebar/Sidebar";
import { BrowserTopBar } from "../BrowserTopBar/BrowserTopBar";

// Logic

// Context

// Styles

// Assets

export const BrowserContainer = () => {
	return (
		<div className=''>
			<Sidebar />
			<BrowserTopBar />
			<Routes>
				<Route path='*' />
				<Route path='/' />
			</Routes>
		</div>
	);
};
