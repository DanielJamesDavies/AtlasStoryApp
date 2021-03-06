// Packages
import { Radar } from "react-chartjs-2";

// Components

// Logic
import { AbilityStatisticsChartLogic } from "./AbilityStatisticsChartLogic";

// Context

// Services

// Styles
import "./AbilityStatisticsChart.css";

// Assets

export const AbilityStatisticsChart = ({ ability }) => {
	const { graphData, graphOptions } = AbilityStatisticsChartLogic({ ability });

	return (
		<div className='character-subpage-abilities-ability-statistics-chart-container'>
			{!graphData || !graphOptions ? null : (
				<Radar className='character-subpage-abilities-ability-statistics-chart' type='radar' data={graphData} options={graphOptions} />
			)}
		</div>
	);
};
