// Packages

// Components
import { Routes } from "./Routes";

// Logic

// Context
import RoutesProvider from "../../context/RoutesContext";

// Services

// Styles

// Assets

export const RoutesContainer = () => {
	return (
		<RoutesProvider>
			<Routes />
		</RoutesProvider>
	);
};
