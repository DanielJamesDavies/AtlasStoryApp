// Packages

// Components
import { SpotifyContainer } from "./SpotifyContainer";

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
				<SpotifyContainer />
			</SpofityProvider>
		</RoutesProvider>
	);
};
