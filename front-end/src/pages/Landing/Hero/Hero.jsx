// Packages

// Components
import { Headline } from "./Headline/Headline";
import { ExploreBtn } from "./ExploreBtn/ExploreBtn";
import { RegisterBtn } from "./RegisterBtn/RegisterBtn";
import { PlotPoster } from "./PlotPoster/PlotPoster";
import { CharacterCard } from "./CharacterCard/CharacterCard";

// Logic

// Context

// Services

// Styles
import "./Hero.css";

// Assets
import landingStarClusterImg from "../../../content/landing-star-cluster.png";

export const Hero = () => {
	return (
		<div className='landing-hero'>
			<Headline />
			<div className='landing-hero-backgrounds'>
				<img src={landingStarClusterImg} alt='' />
			</div>
			<div className='landing-hero-plot-poster-container'>
				<PlotPoster />
			</div>
			<div className='landing-hero-plot-character-card-container'>
				<CharacterCard />
			</div>
			<div className='landing-hero-buttons'>
				<ExploreBtn />
				<RegisterBtn />
			</div>
		</div>
	);
};
