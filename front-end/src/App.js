// Packages
import { useContext } from "react";

// Components
import { ElectronContainer } from "./components/ElectronContainer/ElectronContainer";
import { BrowserContainer } from "./components/BrowserContainer/BrowserContainer";

// Logic

// Context
import { AppContext } from "./context/AppContext";

// Services

// Styles
import "./styles.css";

// Assets

function App() {
	const { isOnElectron } = useContext(AppContext);

	return <div className='App'>{isOnElectron ? <ElectronContainer /> : <BrowserContainer />}</div>;
}

export default App;
