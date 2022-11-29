// Packages
import { FaBars, FaTimes } from "react-icons/fa";

// Components
import { CharactersRelationshipChart } from "./Chart/CharactersRelationshipChart";
import { CharactersRelationshipsInfo } from "./Info/CharactersRelationshipsInfo";
import { IconBtn } from "../../../components/IconBtn/IconBtn";

// Logic
import { CharactersRelationshipsLogic } from "./CharactersRelationshipsLogic";

// Context

// Services

// Styles
import "./CharactersRelationships.css";

// Assets

export const CharactersRelationships = () => {
	const {
		groups,
		characters,
		charactersFaceImages,
		charactersRelationshipChartRef,
		charactersRelationshipChartWidth,
		charactersRelationshipChartItemWidth,
		isDisplayingInfo,
		toggleIsDisplayingInfo,
	} = CharactersRelationshipsLogic();

	if (!groups || !characters || !charactersFaceImages) return null;
	return (
		<div
			className='characters-relationship-container'
			style={{
				"--charactersRelationshipChartWidth": charactersRelationshipChartWidth + "px",
				"--charactersRelationshipChartItemWidth": charactersRelationshipChartItemWidth + "px",
			}}
		>
			<div className='characters-relationship-primary'>
				<div className='characters-relationship-primary-title'>Character Relationships</div>
				<div className='characters-relationship-primary-buttons-container'>
					<IconBtn
						icon={<FaBars />}
						iconName='bars'
						iconSmall={!isDisplayingInfo ? undefined : <FaTimes />}
						onClick={toggleIsDisplayingInfo}
						seamless={true}
					/>
				</div>
			</div>
			<div className='characters-relationship-content'>
				<CharactersRelationshipChart
					charactersRelationshipChartRef={charactersRelationshipChartRef}
					charactersRelationshipChartWidth={charactersRelationshipChartWidth}
					charactersRelationshipChartItemWidth={charactersRelationshipChartItemWidth}
				/>
				<CharactersRelationshipsInfo isDisplayingInfo={isDisplayingInfo} />
			</div>
		</div>
	);
};
