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
		<div className='App'>
			<Page />
			<canvas id='isLightBackgroundCanvas'></canvas>
		</div>
	);
}

export default App;
