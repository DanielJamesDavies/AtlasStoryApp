// Packages

// Components

// Logic

// Context

// Services

// Styles
import "./PlotPoster.css";

// Assets
import plotPosterImage from "../../../../content/genesis-poster.png";
import shineSvg from "../../../../content/shine.svg";

export const PlotPoster = () => {
	const story_title = "Nova Cosmos";
	const plot_title = "Genesis";

	return (
		<div className='landing-plot-poster-container'>
			<div className='landing-plot-poster'>
				<div className='landing-plot-poster-content'>
					<div className='landing-plot-poster-content-title-container landing-plot-poster-content-title-container-with-story-title'>
						<div className='landing-plot-poster-content-title-story'>{story_title}</div>
						<div className='landing-plot-poster-content-title-substory'>{plot_title}</div>
					</div>
				</div>
				<div className='landing-plot-poster-background-container'>
					<img className='landing-plot-poster-background' src={plotPosterImage} alt='' />
				</div>
			</div>
			<div className='landing-plot-poster-number-container'>
				<div className='landing-plot-poster-number'>1</div>
				<div className='landing-plot-poster-number-background'>
					<img src={shineSvg} alt='' />
				</div>
			</div>
			<div className='landing-plot-poster-title-container'>
				<div className='landing-plot-poster-title'>
					{story_title}: {plot_title}
				</div>
			</div>
		</div>
	);
};
