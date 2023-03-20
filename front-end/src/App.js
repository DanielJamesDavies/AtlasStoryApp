// Packages

// Components
import { Page } from "./components/Page/Page";

// Logic
import { AppLogic } from "./AppLogic";

// Context

// Services

// Styles
import "./styles.css";

// Assets

function App() {
	AppLogic();

	return (
		<div id='App' className='App'>
			<Page />
			<canvas id='faviconCanvas' style={{ position: "absolute", opacity: "0", userSelect: "none", pointerEvents: "none" }}></canvas>
			<canvas id='isLightBackgroundCanvas' style={{ position: "absolute", opacity: "0", userSelect: "none", pointerEvents: "none" }}></canvas>
		</div>
	);
}

export default App;
