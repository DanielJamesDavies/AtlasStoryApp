// Packages
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Components
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Logic

// Context
import AppProvider from "./context/AppContext";
import APIProvider from "./context/APIContext";

// Services

// Styles

// Assets

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<AppProvider>
			<APIProvider>
				<App />
			</APIProvider>
		</AppProvider>
	</BrowserRouter>
);

reportWebVitals();
