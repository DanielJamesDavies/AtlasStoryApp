// Packages
import React from "react";
import ReactDOM from "react-dom/client";

// Components
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Logic

// Context
import AppProvider from "./context/AppContext";

// Styles

// Assets

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<AppProvider>
			<App />
		</AppProvider>
	</React.StrictMode>
);

reportWebVitals();
