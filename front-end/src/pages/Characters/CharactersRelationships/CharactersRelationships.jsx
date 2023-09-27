// Packages
import { FaBars, FaTimes } from "react-icons/fa";

// Components
import { CharactersRelationshipChart } from "./Chart/CharactersRelationshipChart";
import { CharactersRelationshipsInfo } from "./Info/CharactersRelationshipsInfo";
import { IconBtn } from "../../../components/IconBtn/IconBtn";
import { LoadingCircle } from "../../../components/LoadingCircle/LoadingCircle";

// Logic
import { CharactersRelationshipsLogic } from "./CharactersRelationshipsLogic";

// Context

// Services

// Styles
import "./CharactersRelationships.css";

// Assets

export const CharactersRelationships = () => {
	const {
		isAuthorizedToEdit,
		storyGroups,
		storyCharacters,
		characterRelationshipsCharacters,
		charactersRelationshipChartRef,
		charactersRelationshipChartWidth,
		charactersRelationshipChartItemWidth,
		isDisplayingInfo,
		toggleIsDisplayingInfo,
	} = CharactersRelationshipsLogic();

	if (!isAuthorizedToEdit && characterRelationshipsCharacters.length === 0) return null;
	if (storyCharacters.length === 0) return null;
	return (
		<div
			className='characters-relationship-container'
			style={{
				"--charactersRelationshipChartWidth": charactersRelationshipChartWidth + "px",
				"--charactersrelationshipchartitem-width": charactersRelationshipChartItemWidth + "px",
			}}
		>
			<div className='characters-relationship-primary'>
				<div className='characters-relationship-primary-title'>Character Relationships</div>
				{!storyGroups || !storyCharacters ? null : (
					<div className='characters-relationship-primary-buttons-container'>
						<IconBtn
							icon={<FaBars />}
							iconName='bars'
							iconSmall={!isDisplayingInfo ? undefined : <FaTimes />}
							onClick={toggleIsDisplayingInfo}
							seamless={true}
						/>
					</div>
				)}
			</div>
			{!storyGroups || !storyCharacters ? (
				<div className='characters-relationship-content'>
					<LoadingCircle center={true} />
				</div>
			) : (
				<div className='characters-relationship-content'>
					<CharactersRelationshipChart
						charactersRelationshipChartRef={charactersRelationshipChartRef}
						charactersRelationshipChartWidth={charactersRelationshipChartWidth}
						charactersRelationshipChartItemWidth={charactersRelationshipChartItemWidth}
					/>
					<CharactersRelationshipsInfo isDisplayingInfo={isDisplayingInfo} />
				</div>
			)}
		</div>
	);
};
