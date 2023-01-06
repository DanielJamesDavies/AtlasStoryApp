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
import LightboxProvider from "./context/LightboxContext";
import RecentDataProvider from "./context/RecentDataContext";
import DropdownProvider from "./context/DropdownContext";

// Services

// Styles

// Assets

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<APIProvider>
			<AppProvider>
				<RecentDataProvider>
					<LightboxProvider>
						<DropdownProvider>
							<App />
						</DropdownProvider>
					</LightboxProvider>
				</RecentDataProvider>
			</AppProvider>
		</APIProvider>
	</BrowserRouter>
);

reportWebVitals();
