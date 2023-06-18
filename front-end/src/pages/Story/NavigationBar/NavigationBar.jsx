// Packages

// Components

// Logic
import { NavigationBarLogic } from "./NavigationBarLogic";

// Context

// Services

// Styles
import "./NavigationBar.css";

// Assets

export const NavigationBar = () => {
	const { pages, goToPage } = NavigationBarLogic();

	return (
		<div className='story-navigation-bar-container'>
			{pages.map((page, index) => (
				<div
					key={index}
					className='story-navigation-bar-item'
					onClick={(e) => goToPage(e, page.path)}
					onAuxClick={(e) => goToPage(e, page.path)}
				>
					<div className='story-navigation-bar-item-icon'>{page.icon}</div>
					<div className='story-navigation-bar-item-title'>{page.title}</div>
				</div>
			))}
		</div>
	);
};
