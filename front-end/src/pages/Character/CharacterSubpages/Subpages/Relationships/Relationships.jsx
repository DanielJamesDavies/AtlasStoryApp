// Packages
import { FaBars, FaTimes } from "react-icons/fa";

// Components
import { CharacterRelationshipChart } from "./Chart/CharacterRelationshipChart";
import { CharacterRelationshipsInfo } from "./Info/CharacterRelationshipsInfo";
import { IconBtn } from "../../../../../components/IconBtn/IconBtn";
import { LoadingCircle } from "../../../../../components/LoadingCircle/LoadingCircle";

// Logic
import { RelationshipsLogic } from "./RelationshipsLogic";

// Context

// Services

// Styles
import "./Relationship.css";

// Assets

export const Relationships = () => {
	const {
		groups,
		characters,
		characterRelationships,
		characterRelationshipsCharacters,
		characterRelationshipsChartRef,
		characterRelationshipsChartWidth,
		characterRelationshipsChartItemWidth,
		isDisplayingInfo,
		toggleIsDisplayingInfo,
		characterSubpageRelationshipsRef,
	} = RelationshipsLogic();

	return (
		<div
			ref={characterSubpageRelationshipsRef}
			className='character-subpage-relationships'
			style={{
				"--characterRelationshipsChartWidth": characterRelationshipsChartWidth + "px",
				"--characterRelationshipsChartItemWidth": characterRelationshipsChartItemWidth + "px",
			}}
		>
			{!groups || !characters ? null : (
				<div className='character-subpage-relationships-primary-buttons-container'>
					<IconBtn
						className='character-subpage-relationships-primary-btn-toggle-is-displaying-info'
						icon={<FaBars />}
						iconName='bars'
						iconSmall={!isDisplayingInfo ? undefined : <FaTimes />}
						onClick={toggleIsDisplayingInfo}
						seamless={true}
					/>
				</div>
			)}
			{!groups || !characters || !characterRelationships || !characterRelationshipsCharacters ? (
				<div className='character-subpage-relationships-content'>
					<LoadingCircle center={true} />
				</div>
			) : (
				<div className='character-subpage-relationships-content'>
					<CharacterRelationshipChart
						characterRelationshipsChartRef={characterRelationshipsChartRef}
						characterRelationshipsChartWidth={characterRelationshipsChartWidth}
						characterRelationshipsChartItemWidth={characterRelationshipsChartItemWidth}
					/>
					<CharacterRelationshipsInfo isDisplayingInfo={isDisplayingInfo} />
				</div>
			)}
		</div>
	);
};
