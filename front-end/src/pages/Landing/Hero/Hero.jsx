// Packages

// Components
import { Headline } from "./Headline/Headline";
import { Subheadline } from "./Subheadline/Subheadline";
import { ExploreBtn } from "./ExploreBtn/ExploreBtn";
import { RegisterBtn } from "./RegisterBtn/RegisterBtn";

// Logic

// Context

// Services

// Styles
import "./Hero.css";

// Assets

export const Hero = () => {
	return (
		<div className='landing-hero'>
			<Headline />
			<Subheadline />
			<div className='landing-hero-buttons'>
				<ExploreBtn />
				<RegisterBtn />
			</div>
		</div>
	);
};
