// Packages

// Components
import { LoadingCircle } from "../../components/LoadingCircle/LoadingCircle";

// Logic

// Context

// Services

// Styles

// Assets

export const Spotify = () => {
	return (
		<div className='spotify-loading-container'>
			<LoadingCircle center={true} label='Connecting to Spotify...' />
		</div>
	);
};
