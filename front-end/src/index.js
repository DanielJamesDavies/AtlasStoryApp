// Packages
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Components
import App from "./App";

// Logic

// Context
import AppProvider from "./context/AppContext";
import APIProvider from "./context/APIContext";
import AIProvider from "./context/AIContext";
import LightboxProvider from "./context/LightboxContext";
import RecentDataProvider from "./context/RecentDataContext";
import DropdownProvider from "./context/DropdownContext";

// Services

// Styles

// Assets

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<APIProvider>
			<AIProvider>
				<AppProvider>
					<RecentDataProvider>
						<LightboxProvider>
							<DropdownProvider>
								<App />
							</DropdownProvider>
						</LightboxProvider>
					</RecentDataProvider>
				</AppProvider>
			</AIProvider>
		</APIProvider>
	</BrowserRouter>
);
