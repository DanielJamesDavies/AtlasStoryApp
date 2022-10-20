// Packages

// Components
import { Routes } from "./Routes";

// Logic

// Context
import RoutesProvider from "../../context/RoutesContext";
import SpofityProvider from "../../context/SpotifyContext";

// Services

// Styles

// Assets

export const RoutesContainer = () => {
	return (
		<RoutesProvider>
			<SpofityProvider>
				<Routes />
			</SpofityProvider>
		</RoutesProvider>
	);
};
